from django.urls import path
from . import api


urlpatterns = [
    path('', api.class_list, name='api_class_list'),  # List all classes or filter based on query parameters
    path('create/', api.create_class, name='api_create_class'),  # Create a new class
    path('categories/', api.get_categories, name='get_categories'),  # List all categories
    path('by-category/', api.get_classes_by_category, name='get_classes_by_category'),  # List classes by category
    path('<uuid:pk>/', api.class_detail, name='api_class_detail'),  # Retrieve class details by ID
    path('update/<uuid:pk>/', api.update_class, name='update_class'),  # Update an existing class
    path('<uuid:pk>/video/', api.class_video, name='api_class_video'),  # Retrieve class video details
    path('<uuid:pk>/toggle_favorite/', api.toggle_favorite_class, name='api_toggle_favorite_class'),  # Toggle favorite status for a class (on progress)
]
