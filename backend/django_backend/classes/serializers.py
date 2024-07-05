from rest_framework import serializers
from .models import Class
from useraccount.serializers import UserDetailSerializer

class ClassListSerializer(serializers.ModelSerializer):
    category = serializers.ChoiceField(choices=Class.CATEGORY_CHOICES, read_only=True)

    class Meta:
        model = Class
        fields = (
            'id',
            'title',
            'category',
            'price_per_session',
            'image_url',
        )
class ClassDetailSerializer(serializers.ModelSerializer):
    professor = UserDetailSerializer(read_only=True)
    video_url = serializers.SerializerMethodField()
    subtitles = serializers.SerializerMethodField()

    class Meta:
        model = Class
        fields = [
            'id',
            'title',
            'category',
            'description',
            'price_per_session',
            'image_url',
            'duration_in_minutes',
            'max_students',
            'subject',
            'professor',
            'video_url',
            'subtitles',
        ]

    def get_video_url(self, obj):
        request = self.context.get('request', None)
        quality = request.query_params.get('quality', '360p') if request else '360p'
        return obj.get_video_url(quality)
    
    def get_subtitles(self, obj):
        return obj.subtitles if obj.subtitles else []


class ClassSerializer(serializers.ModelSerializer):
    professor = UserDetailSerializer(read_only=True)

    class Meta:
        model = Class
        fields = [
            'id', 
            'title', 
            'category', 
            'description', 
            'price_per_session', 
            'duration_in_minutes', 
            'max_students', 
            'subject', 
            'professor', 
            'image',  # Ensure image is included here
            'video',  # Ensure video is included here
            'external_video_url',
        ]