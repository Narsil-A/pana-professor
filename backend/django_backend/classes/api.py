import os

import uuid
from django.conf import settings
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Class
from .forms import ClassForm
from .serializers import ClassDetailSerializer, ClassListSerializer 


# List all classes or filter based on query parameters
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def class_list(request):
    # Extract query parameters
    is_favorites = request.GET.get('is_favorites', '')
    professor_id = request.GET.get('professor_id', '')
    subject = request.GET.get('subject', '')
    price = request.GET.get('price', '')
    
    # Filter classes based on query parameters
    classes = Class.objects.all()
    if professor_id:
        classes = classes.filter(professor_id=professor_id)
    if is_favorites and request.user.is_authenticated:
        classes = classes.filter(favorited__in=[request.user])
    if subject:
        classes = classes.filter(subject=subject)
    if price:
        classes = classes.filter(price_per_session__lte=price)
    
    # Get list of favorite class IDs for the authenticated user
    favorites = []
    if request.user.is_authenticated:
        favorites = [class_instance.id for class_instance in classes if request.user in class_instance.favorited.all()]

    # Serialize and return the class data and favorites
    serializer = ClassListSerializer(classes, many=True)
    return JsonResponse({'data': serializer.data, 'favorites': favorites})


# List all categories
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_categories(request):
    categories = [
        {'key': '', 'title': 'All', 'image': '/excuela.png', 'description': 'All available courses'},
        {'key': 'math', 'title': 'Math', 'image': '/math.jpg', 'description': 'Learn about Math'},
        {'key': 'science', 'title': 'Science', 'image': '/science.jpg', 'description': 'Explore Science topics'},
        {'key': 'arts', 'title': 'Arts', 'image': '/arts.jpg', 'description': 'Dive into Arts'},
        {'key': 'languages', 'title': 'Languages', 'image': '/languages.jpg', 'description': 'Learn new languages'},
        {'key': 'technology', 'title': 'Technology', 'image': '/technology.jpg', 'description': 'Discover Technology'}
    ]
    return Response(categories)



# List classes by category
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_classes_by_category(request):
    category = request.query_params.get('category', '')
    classes = Class.objects.filter(category=category) if category else Class.objects.all()
    serializer = ClassListSerializer(classes, many=True)
    return Response(serializer.data)



# Retrieve class details by ID
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def class_detail(request, pk):
    try:
        class_instance = Class.objects.get(pk=pk)
    except Class.DoesNotExist:
        return JsonResponse({'error': 'Class not found'}, status=404)
    serializer = ClassDetailSerializer(class_instance, context={'request': request})
    return JsonResponse(serializer.data, safe=False)



# Create a new class
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
            os.makedirs(subtitle_dir, exist_ok=True)
            subtitle_path = os.path.join(subtitle_dir, f'{uuid.uuid4()}_{subtitle_file.name}')
            with open(subtitle_path, 'wb+') as destination:
                for chunk in subtitle_file.chunks():
                    destination.write(chunk)
            subtitles.append({
                'src': f'{settings.WEBSITE_URL}/media/uploads/classes/subtitles/{os.path.basename(subtitle_path)}',
                'lang': subtitle_file.name.split('.')[0],
                'label': subtitle_file.name.split('.')[0],
                'default': index == 0  
            })
        class_instance.subtitles = subtitles
        class_instance.save()
        return JsonResponse({'success': True, 'data': ClassDetailSerializer(class_instance, context={'request': request}).data})
    return JsonResponse({'success': False, 'errors': form.errors})



# Update an existing class
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_class(request, pk):
    try:
        class_instance = Class.objects.get(pk=pk, professor=request.user)
    except Class.DoesNotExist:
        return Response({'success': False, 'error': 'Class not found or you do not have permission to edit this class'}, status=404)
    
    form = ClassForm(request.POST, request.FILES, instance=class_instance)
    if form.is_valid():
        class_instance = form.save(commit=False)
        class_instance.professor = request.user
        class_instance.save()
        
        # Handle subtitle files
        subtitle_files = request.FILES.getlist('subtitles')
        subtitles = []
        for index, subtitle_file in enumerate(subtitle_files):
            subtitle_dir = os.path.join(settings.MEDIA_ROOT, 'uploads', 'classes', 'subtitles')
            os.makedirs(subtitle_dir, exist_ok=True)
            subtitle_path = os.path.join(subtitle_dir, f'{uuid.uuid4()}_{subtitle_file.name}')
            with open(subtitle_path, 'wb+') as destination:
                for chunk in subtitle_file.chunks():
                    destination.write(chunk)
            subtitles.append({
                'src': f'{settings.WEBSITE_URL}/media/uploads/classes/subtitles/{os.path.basename(subtitle_path)}',
                'lang': subtitle_file.name.split('.')[0],
                'label': subtitle_file.name.split('.')[0],
                'default': index == 0  
            })
        class_instance.subtitles = subtitles
        class_instance.save()
        return JsonResponse({'success': True, 'data': ClassDetailSerializer(class_instance, context={'request': request}).data})
    return JsonResponse({'success': False, 'errors': form.errors})


# Retrieve class video details
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
        "label": subtitle["label"].split('-')[1].strip()
    } for subtitle in (class_instance.subtitles if class_instance.subtitles else [])]
    
    data = {
        'id': class_instance.id,
        'title': class_instance.title,
        'video_url': class_instance.get_video_url('360p'),
        'video_qualities': video_qualities,
        'subtitles': subtitles,
    }
    return JsonResponse(data)



# Toggle favorite status for a class
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def toggle_favorite_class(request, pk):
    try:
        class_instance = Class.objects.get(pk=pk)
    except Class.DoesNotExist:
        return JsonResponse({'error': 'Class not found'}, status=404)

    if request.user in class_instance.favorited.all():
        class_instance.favorited.remove(request.user)
        return JsonResponse({'is_favorite': False})
    class_instance.favorited.add(request.user)
    return JsonResponse({'is_favorite': True})
