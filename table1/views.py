from rest_framework import viewsets
from .models import Table1
from .serializers import Table1Serializer
from rest_framework.permissions import IsAuthenticated

class Table1ViewSet(viewsets.ModelViewSet):
    queryset = Table1.objects.all()
    serializer_class = Table1Serializer
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        user = self.request.user  # Utilisateur connecté
        serializer.save(id_user=user)
