from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from rest_framework_simplejwt.tokens import AccessToken
from useraccount.models import User

@database_sync_to_async
def get_user(token_key):
    """
    Asynchronously retrieves the user associated with the provided token key.
    Returns an AnonymousUser if the token is invalid or if any exception occurs.
    """
    try:
        # Decode the token to get the user_id
        token = AccessToken(token_key)
        user_id = token.payload['user_id']
        # Retrieve and return the user object
        return User.objects.get(pk=user_id)
    except Exception:
        # Return AnonymousUser if token is invalid or user not found
        return AnonymousUser

class TokenAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        """
        Initializes the middleware with the inner application.
        """
        super().__init__(inner)

    async def __call__(self, scope, receive, send):
        """
        Processes the incoming connection and attaches the user to the scope based on the token.
        """
        # Decode the query string and parse query parameters
        query_string = scope['query_string'].decode()
        query_params = dict(param.split('=') for param in query_string.split('&') if '=' in param)
        # Get the token from the query parameters
        token_key = query_params.get('token')
        # Attach the user to the scope
        scope['user'] = await get_user(token_key)
        # Call the next middleware or application
        return await super().__call__(scope, receive, send)
