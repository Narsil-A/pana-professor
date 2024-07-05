from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import UserDetailsView

from .models import User
from .serializers import UserDetailSerializer


class CustomUserDetailsView(UserDetailsView):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        print('User details response data:', response.data)  
        return response


class UserUpdateView(generics.UpdateAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        data = request.data

        user.username = data.get('username', user.username)
        user.name = data.get('name', user.name)
        user.email = data.get('email', user.email)

        user.save()

        serializer = self.get_serializer(user)
        return Response(serializer.data)


class UserDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        return self.request.user

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response({'detail': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
