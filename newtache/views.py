from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import TaskCategory, TaskEntry
from .serializers import TaskCategorySerializer, TaskEntrySerializer

# Vue pour gérer la liste et la création de catégories de tâches
class TaskCategoryListCreateView(generics.ListCreateAPIView):
    queryset = TaskCategory.objects.all()
    serializer_class = TaskCategorySerializer

    def get(self, request, *args, **kwargs):
        """Obtenir la liste des catégories"""
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """Ajouter une nouvelle catégorie"""
        return super().post(request, *args, **kwargs)# Vue pour la gestion des tâches (TaskEntry)
class TaskEntryListCreateView(APIView):
    def get(self, request):
        # Obtenir toutes les tâches
        tasks = TaskEntry.objects.all()  
        serializer = TaskEntrySerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Créer une nouvelle tâche
        serializer = TaskEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
