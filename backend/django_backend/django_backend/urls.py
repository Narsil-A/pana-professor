from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Admin URL for accessing the Django admin interface
    path('admin/', admin.site.urls),

    # URL for authentication-related endpoints, included from the useraccount app
    path('api/auth/', include('useraccount.urls')),

    # URL for chat-related endpoints, included from the chat app
    path('api/chat/', include('chat.urls')),

    # URL for class-related endpoints, included from the classes app
    path('api/classes/', include('classes.urls')),  
] 

# Static URL configuration for serving media files during development
# settings.MEDIA_URL is the base URL for media files
# settings.MEDIA_ROOT is the directory where media files are stored
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
