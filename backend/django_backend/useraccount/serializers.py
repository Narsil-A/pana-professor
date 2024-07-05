from rest_framework import serializers
from .models import User

import logging

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'name', 'email',]

