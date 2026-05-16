from rest_framework import viewsets, permissions
from .models import MediaItem
from .serializers import MediaItemSerializer

class MediaItemViewSet(viewsets.ModelViewSet):
   
    queryset = MediaItem.objects.all()
    
    serializer_class = MediaItemSerializer

    permission_classes = [permissions.IsAuthenticated] 

    def get_queryset(self):
        return MediaItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    