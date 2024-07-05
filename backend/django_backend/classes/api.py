import os 
import uuid
from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Class
from .forms import ClassForm
from .serializers import ClassDetailSerializer, ClassListSerializer 
from django.conf import settings




@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def class_list(request):
    # Authentication
    try:
        token = request.META['HTTP_AUTHORIZATION'].split('Bearer ')[1]
        token = AccessToken(token)
        user_id = token.payload['user_id']
        user = User.objects.get(pk=user_id)
    except Exception as e:
        user = None

    favorites = []
    classes = Class.objects.all()

    # Filtering
    is_favorites = request.GET.get('is_favorites', '')
    professor_id = request.GET.get('professor_id', '')
    subject = request.GET.get('subject', '')
    price = request.GET.get('price', '')

    if professor_id:
        classes = classes.filter(professor_id=professor_id)

    if is_favorites:
        classes = classes.filter(favorited__in=[user])

    if subject:
        classes = classes.filter(subject=subject)

    if price:
        classes = classes.filter(price_per_session__lte=price)

    # Favorites
    if user:
        for class_instance in classes:
            if user in class_instance.favorited.all():
                favorites.append(class_instance.id)

    serializer = ClassListSerializer(classes, many=True)

    return JsonResponse({
        'data': serializer.data,
        'favorites': favorites
    })


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def class_detail(request, pk):
    try:
        class_instance = Class.objects.get(pk=pk)
    except Class.DoesNotExist:
        return JsonResponse({'error': 'Class not found'}, status=404)

    serializer = ClassDetailSerializer(class_instance, many=False, context={'request': request})
    return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_class(request):
    form = ClassForm(request.POST, request.FILES)

    if form.is_valid():
        class_instance = form.save(commit=False)
        class_instance.professor = request.user
        class_instance.save()

        # Handle subtitle files
        subtitle_files = request.FILES.getlist('subtitles')
        subtitles = []
        for index, subtitle_file in enumerate(subtitle_files):
            subtitle_dir = os.path.join(settings.MEDIA_ROOT, 'uploads', 'classes', 'subtitles')
            if not os.path.exists(subtitle_dir):
                os.makedirs(subtitle_dir, exist_ok=True)  # Ensure the directory exists
            subtitle_path = os.path.join(subtitle_dir, f'{uuid.uuid4()}_{subtitle_file.name}')
            with open(subtitle_path, 'wb+') as destination:
                for chunk in subtitle_file.chunks():
                    destination.write(chunk)
            subtitles.append({
                'src': f'{settings.WEBSITE_URL}/media/uploads/classes/subtitles/{os.path.basename(subtitle_path)}',
                'lang': subtitle_file.name.split('.')[0],
                'label': subtitle_file.name.split('.')[0],
                'default': index == 0  # Set the first subtitle as default
            })
        class_instance.subtitles = subtitles
        class_instance.save()

        return JsonResponse({'success': True, 'data': ClassDetailSerializer(class_instance, context={'request': request}).data})
    else:
        print('Form Errors:', form.errors)
        return JsonResponse({'success': False, 'errors': form.errors})



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def class_video(request, pk):
    try:
        class_instance = Class.objects.get(pk=pk)
    except Class.DoesNotExist:
        return JsonResponse({'error': 'Class not found'}, status=404)

    video_qualities = [
        {"label": "360p", "src": class_instance.get_video_url('360p')},
        {"label": "480p", "src": class_instance.get_video_url('480p')},
        {"label": "720p", "src": class_instance.get_video_url('720p')},
        {"label": "1080p", "src": class_instance.get_video_url('1080p')}
    ]
    
    subtitles = [{
        "kind": "subtitles",
        "src": subtitle["src"],
        "srcLang": subtitle["lang"],
        "label": subtitle["label"].split('-')[1].strip()  # Extracts "English" or "Spanish" from the filename
    } for subtitle in (class_instance.subtitles if class_instance.subtitles else [])]
    
    data = {
        'id': class_instance.id,
        'title': class_instance.title,
        'video_url': class_instance.get_video_url('360p'),
        'video_qualities': video_qualities,
        'subtitles': subtitles,
    }
    return JsonResponse(data)



@api_view(['POST'])
def toggle_favorite_class(request, pk):
    try:
        class_instance = Class.objects.get(pk=pk)
    except Class.DoesNotExist:
        return JsonResponse({'error': 'Class not found'}, status=404)

    if request.user in class_instance.favorited.all():
        class_instance.favorited.remove(request.user)
        return JsonResponse({'is_favorite': False})
    else:
        class_instance.favorited.add(request.user)
        return JsonResponse({'is_favorite': True})