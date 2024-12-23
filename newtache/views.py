from rest_framework import generics, status
from rest_framework.response import Response
from newtache.models import TaskEntry, TaskCategory
from newtache.serializers import TaskEntrySerializer
from rest_framework.views import APIView




class TaskEntryListCreateView(APIView):
    def get(self, request):
        tasks = TaskEntry.objects.all()  # Récupère toutes les tâches
        serializer = TaskEntrySerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        category_name = request.data.get('category')  # Nom de la catégorie
        task_data = request.data.copy()  # Copie des données de la tâche
        
        # Cherche si la catégorie existe déjà
        category, created = TaskCategory.objects.get_or_create(name=category_name)

        # Ajoute l'ID de la catégorie au dictionnaire des données de tâche
        task_data['category'] = category.id

        # Sérialise les données de la tâche
        serializer = TaskEntrySerializer(data=task_data)
        
        if serializer.is_valid():
            serializer.save()  # Sauvegarde la tâche
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# newtache/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from newtache.models import TaskCategory
from newtache.serializers import TaskCategorySerializer

class TaskCategoryListView(APIView):
    def get(self, request):
        # Récupère toutes les catégories de tâches
        categories = TaskCategory.objects.all()
        # Sérialise les données
        serializer = TaskCategorySerializer(categories, many=True)
        # Retourne les données sérialisées sous forme de réponse JSON
        return Response(serializer.data)
