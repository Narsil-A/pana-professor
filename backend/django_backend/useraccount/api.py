from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import User
from .serializers import UserDetailSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def professor_detail(request, pk):
    """
    Retrieve detailed information about a professor (user) based on their primary key (pk).
    
    This view is exposed via a GET request and does not require authentication or permissions.
    """
    # Fetch the user object based on the provided primary key (pk)
    user = User.objects.get(pk=pk)

    # Serialize the user object to JSON format
    serializer = UserDetailSerializer(user, many=False)

    # Return the serialized user data as a JSON response
    return JsonResponse(serializer.data, safe=False)
