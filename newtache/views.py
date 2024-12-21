from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from newtache.models import TaskEntry, TaskCategory
from newtache.serializers import TaskEntrySerializer, TaskCategorySerializer

# Vue pour la gestion des tâches
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

# Vue pour la gestion des catégories de tâches
class TaskCategoryListView(APIView):
    def get(self, request):
        # Récupère toutes les catégories de tâches
        categories = TaskCategory.objects.all()
        
        # Sérialise les données
        serializer = TaskCategorySerializer(categories, many=True)
        
        # Retourne les données sérialisées sous forme de réponse JSON
        return Response(serializer.data, status=status.HTTP_200_OK)
