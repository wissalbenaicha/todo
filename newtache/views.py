from datetime import date
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import TimeLog, TaskCategory, User
from .serializers import TimeLogSerializer
from newtache.models import TaskEntry, TaskCategory
from newtache.serializers import TaskEntrySerializer, TaskCategorySerializer


# ViewSet pour TimeLog
class TimeLogViewSet(viewsets.ModelViewSet):
    queryset = TimeLog.objects.all()
    serializer_class = TimeLogSerializer


# View pour lister et créer des entrées de tâches
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


# View pour lister toutes les catégories de tâches
class TaskCategoryListView(APIView):
    def get(self, request):
        # Récupère toutes les catégories de tâches
        categories = TaskCategory.objects.all()
        # Sérialise les données
        serializer = TaskCategorySerializer(categories, many=True)
        # Retourne les données sérialisées sous forme de réponse JSON
        return Response(serializer.data)


# View pour lister et créer des entrées de TimeLog
class TimeLogCreateView(APIView):
    def post(self, request):
        # Extraction des données nécessaires du corps de la requête
        user_id = request.data.get('user')  # ID de l'utilisateur
        category_id = request.data.get('category')  # ID de la catégorie
        hours_spent = request.data.get('hours_spent')  # Nombre d'heures passées

        try:
            # Récupère l'utilisateur et la catégorie en utilisant les IDs
            user = User.objects.get(id=user_id)
            category = TaskCategory.objects.get(id=category_id)
            
            # Crée un nouveau TimeLog
            log = TimeLog.objects.create(
                user=user,
                category=category,
                date=date.today(),  # Utilise la date d'aujourd'hui
                hours_spent=hours_spent
            )
            
            # Sérialise et retourne la réponse
            serializer = TimeLogSerializer(log)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        except TaskCategory.DoesNotExist:
            return Response({"error": "TaskCategory not found"}, status=status.HTTP_400_BAD_REQUEST)
        