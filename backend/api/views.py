from rest_framework import viewsets, permissions
from .models import Todo
from .serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(author=user)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)  
