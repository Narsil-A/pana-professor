from django.urls import path
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.views import LoginView, LogoutView
from dj_rest_auth.registration.views import RegisterView
from rest_framework_simplejwt.views import TokenVerifyView
from .views import CustomUserDetailsView, UserUpdateView, UserDeleteView
from . import api

urlpatterns = [
    path('register/', RegisterView.as_view(), name='rest_register'),
    path('login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
    path('', CustomUserDetailsView.as_view(), name='user_details'),
    path('update/', UserUpdateView.as_view(), name='user_update'),
    path('delete/', UserDeleteView.as_view(), name='user_delete'),
    path('<uuid:pk>/', api.professor_detail, name='api_professor_detail'),
]