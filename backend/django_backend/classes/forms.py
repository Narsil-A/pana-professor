from django import forms
from .models import Class



class ClassForm(forms.ModelForm):
    subtitles = forms.FileField(widget=forms.ClearableFileInput(), required=False)

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
            'video_480p',
            'video_720p', 
            'video_1080p', 
            'external_video_url', 
        ]