from django import forms
from .models import Class

class ClassForm(forms.ModelForm):
    class Meta:
        model = Class
        fields = [
            'title', 
            'category', 
            'description', 
            'price_per_session', 
            'duration_in_minutes', 
            'max_students', 
            'subject', 
            'image', 
            'video_360p',
            'video_480p',
            'video_720p', 
            'video_1080p', 
            'external_video_url',
            'subtitles',
        ]