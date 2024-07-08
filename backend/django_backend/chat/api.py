from django.http import JsonResponse

from rest_framework.decorators import api_view

from .models import Conversation, ConversationMessage

from .serializers import (
    ConversationListSerializer,
    ConversationDetailSerializer,
    ConversationMessageSerializer
)

from useraccount.models import User

@api_view(['GET'])
def conversations_list(request):
    """
    Retrieve a list of all conversations for the authenticated user.
    """
    conversations = request.user.conversations.all()
    serializer = ConversationListSerializer(conversations, many=True)
    return JsonResponse(serializer.data, safe=False)



@api_view(['GET'])
def conversations_detail(request, pk):
    """
    Retrieve details of a specific conversation including messages.
    """
    try:
        conversation = request.user.conversations.get(pk=pk)
    except Conversation.DoesNotExist:
        return JsonResponse({'error': 'Conversation not found'}, status=404)

    conversation_serializer = ConversationDetailSerializer(conversation, many=False)
    messages_serializer = ConversationMessageSerializer(conversation.messages.all(), many=True)

    return JsonResponse({
        'conversation': conversation_serializer.data,
        'messages': messages_serializer.data
    }, safe=False)
    


@api_view(['GET'])
def conversations_start(request, user_id):
    """
    Start a new conversation with a specified user or return an existing one.
    """
    conversations = Conversation.objects.filter(users__in=[user_id]).filter(users__in=[request.user.id])

    if conversations.exists():
        conversation = conversations.first()
    else:
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        
        conversation = Conversation.objects.create()
        conversation.users.add(request.user, user)
    
    return JsonResponse({'success': True, 'conversation_id': conversation.id})
