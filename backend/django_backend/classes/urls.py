from django.urls import path
from . import api

urlpatterns = [
    path('', api.class_list, name='api_class_list'),  
    path('create/', api.create_class, name='api_create_class'),
    path('<uuid:pk>/', api.class_detail, name='api_class_detail'),
    path('update/<uuid:pk>/', api.update_class, name='update_class'),
    path('<uuid:pk>/video/', api.class_video, name='api_class_video'),
    path('<uuid:pk>/toggle_favorite/', api.toggle_favorite_class, name='api_toggle_favorite_class'),  
]
