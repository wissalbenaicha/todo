from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import TimeLog, TaskCategory, User
from .serializers import TimeLogSerializer
from newtache.models import TaskEntry, TaskCategory
from newtache.serializers import TaskEntrySerializer, TaskCategorySerializer

# Vue pour la gestion des tâches
class TaskEntryListCreateView(APIView):
    def get(self, request):
        tasks = TaskEntry.objects.all()  # Récupère toutes les tâches
        serializer = TaskEntrySerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vue pour la gestion des catégories de tâches
class TaskCategoryListView(APIView):
    def get(self, request):
        categories = TaskCategory.objects.all()  # Récupère toutes les catégories de tâches
        serializer = TaskCategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Vue pour la création d'une nouvelle catégorie de tâche
class TaskCategoryListCreateView(APIView):
    def post(self, request):
        # Créer une nouvelle catégorie de tâche
        serializer = TaskCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
