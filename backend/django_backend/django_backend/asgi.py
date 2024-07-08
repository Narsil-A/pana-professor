import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

# Set the default settings module for the Django application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_backend.settings')

# Initialize Django ASGI application to serve HTTP requests
application = get_asgi_application()

# Import the routing configuration from the chat app
from chat import routing

# Import custom token authentication middleware
from chat.token_auth import TokenAuthMiddleware

# Define the ASGI application protocol type router
application = ProtocolTypeRouter({
    # Route HTTP requests to the default Django ASGI application
    'http': get_asgi_application(),
    
    # Route WebSocket connections using custom token authentication middleware
    'websocket': TokenAuthMiddleware(
        # URL router to route WebSocket connections based on the routing configuration
        URLRouter(
            routing.websocket_urlpatterns
        )
    )
})
