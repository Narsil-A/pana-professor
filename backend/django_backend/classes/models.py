from django.db import models
import uuid
from django.conf import settings
from useraccount.models import User

class Class(models.Model):
    CATEGORY_CHOICES = [
        ('math', 'Math'),
        ('language', 'Language'),
        ('tecnology', 'Tecnology'),
        ('arts', 'Arts'),
        ('science', 'Science'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField(null=True, blank=True)
    price_per_session = models.IntegerField(null=True, blank=True)
    duration_in_minutes = models.IntegerField(null=True, blank=True)
    max_students = models.IntegerField(null=True, blank=True)
    subject = models.CharField(max_length=255)
    favorited = models.ManyToManyField(User, related_name='favorite_classes', blank=True)
    image = models.ImageField(upload_to='uploads/classes', null=True, blank=True)
    video_360p = models.FileField(upload_to='uploads/classes', null=True, blank=True)
    video_480p = models.FileField(upload_to='uploads/classes', null=True, blank=True)
    video_720p = models.FileField(upload_to='uploads/classes', null=True, blank=True)
    video_1080p = models.FileField(upload_to='uploads/classes', null=True, blank=True)
    external_video_url = models.URLField(null=True, blank=True)
    professor = models.ForeignKey(User, related_name='classes', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    subtitles = models.JSONField(null=True, blank=True)

    def image_url(self):
        if self.image:
            return f'{settings.WEBSITE_URL}{self.image.url}'
        return None

    def get_video_url(self, quality):
        if quality == '360p' and self.video_360p:
            return f'{settings.WEBSITE_URL}{self.video_360p.url}'
        elif quality == '480p' and self.video_480p:
            return f'{settings.WEBSITE_URL}{self.video_480p.url}'
        elif quality == '720p' and self.video_720p:
            return f'{settings.WEBSITE_URL}{self.video_720p.url}'
        elif quality == '1080p' and self.video_1080p:
            return f'{settings.WEBSITE_URL}{self.video_1080p.url}'
        return self.external_video_url