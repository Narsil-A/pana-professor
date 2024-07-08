from django.urls import path

from . import api

# Define URL patterns for the chat API
urlpatterns = [
    # Route to get the list of conversations
    path('', api.conversations_list, name='api_conversations_list'),
    # Route to start a conversation with a specific user
    path('start/<uuid:user_id>/', api.conversations_start, name='api_conversations_start'),
    # Route to get the details of a specific conversation
    path('<uuid:pk>/', api.conversations_detail, name='api_conversations_detail'),
]
