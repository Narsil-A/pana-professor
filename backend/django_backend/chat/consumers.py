import json

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from .models import ConversationMessage

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """
        Handles the connection of a websocket client.
        """
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

      
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, code):
        """
        Handles the disconnection of a websocket client.
        """
      
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        """
        Handles incoming messages from the websocket client.
        """
        data = json.loads(text_data)
        conversation_id = data['data']['conversation_id']
        sent_to_id = data['data']['sent_to_id']
        name = data['data']['name']
        body = data['data']['body']

     
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'body': body,
                'name': name
            }
        )
        
        await self.save_message(conversation_id, body, sent_to_id)

    async def chat_message(self, event):
        """
        Handles messages sent to the room group.
        """
        body = event['body']
        name = event['name']

     
        await self.send(text_data=json.dumps({
            'body': body,
            'name': name
        }))

    @sync_to_async
    def save_message(self, conversation_id, body, sent_to_id):
        """
        Saves a message to the database.
        """
        user = self.scope['user']
        ConversationMessage.objects.create(
            conversation_id=conversation_id,
            body=body,
            sent_to_id=sent_to_id,
            created_by=user
        )
