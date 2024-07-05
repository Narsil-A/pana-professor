from rest_framework import serializers

from .models import Conversation, ConversationMessage

from useraccount.serializers import UserDetailSerializer

class ConversationListSerializer(serializers.ModelSerializer):
    users = UserDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ('id', 'users', 'modified_at',)



class ConversationDetailSerializer(serializers.ModelSerializer):
    users = UserDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ('id', 'users', 'modified_at',)

        

class ConversationMessageSerializer(serializers.ModelSerializer):
    send_to = UserDetailSerializer(many=False, read_only=True)
    created_by = UserDetailSerializer(many=False, read_only=True)

    class Meta:
        model = ConversationMessage
        fields = ('id', 'body', 'send_to', 'created_by',)