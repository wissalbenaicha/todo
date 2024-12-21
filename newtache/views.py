from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import TaskEntry, TaskCategory, TimeLog, UserProgress
from .serializers import TaskEntrySerializer, TaskCategorySerializer, TimeLogSerializer, UserProgressSerializer
from django.db import models  # Import models to fix the error
from datetime import datetime, timedelta

# TaskEntry views
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

# TaskCategory views
class TaskCategoryListView(APIView):
    def get(self, request):
        categories = TaskCategory.objects.all()  # Récupère toutes les catégories de tâches
        serializer = TaskCategorySerializer(categories, many=True)
        return Response(serializer.data)

# TaskProgress views
class TaskProgressView(APIView):
    def get(self, request):
        task_entries = TaskEntry.objects.all()
        
        # Statistiques générales
        completed_tasks = task_entries.filter(etat='Completed').count()
        total_tasks = task_entries.count()
        progress = (completed_tasks / total_tasks) * 100 if total_tasks else 0
        
        # Progression par catégorie
        category_progress = {}
        for category in TaskCategory.objects.all():
            category_tasks = task_entries.filter(category=category)
            category_completed = category_tasks.filter(etat='Completed').count()
            category_progress[category.name] = {
                'completed': category_completed,
                'total': category_tasks.count(),
                'progress': (category_completed / category_tasks.count()) * 100 if category_tasks.count() else 0
            }
        
        return Response({
            'progress': progress,
            'category_progress': category_progress
        })

# DailyTasks views
class DailyTasksView(APIView):
    def get(self, request):
        date_str = request.query_params.get('date', datetime.today().strftime('%Y-%m-%d'))  # Date par défaut au jour actuel
        daily_tasks = TaskEntry.objects.filter(date_creation__date=date_str)
        serializer = TaskEntrySerializer(daily_tasks, many=True)
        return Response(serializer.data)

# Productivity views
class ProductivityView(APIView):
    def get(self, request):
        time_logs = TimeLog.objects.all()
        # Calcul de la productivité par utilisateur et catégorie
        productivity_data = time_logs.values('user', 'category').annotate(total_hours=models.Sum('hours_spent'))
        return Response({'productivity': productivity_data})

# UserProgress views
class UserProgressView(APIView):
    def get(self, request):
        timeframe = request.query_params.get('timeframe', 'year')  # 'month', 'week', etc.
        current_time = datetime.now()
        
        if timeframe == 'year':
            start_date = datetime(current_time.year, 1, 1)
            end_date = datetime(current_time.year, 12, 31)
        elif timeframe == 'month':
            start_date = datetime(current_time.year, current_time.month, 1)
            end_date = datetime(current_time.year, current_time.month + 1, 1)
        elif timeframe == 'week':
            start_date = current_time - timedelta(days=current_time.weekday())  # Début de la semaine
            end_date = start_date + timedelta(days=7)  # Fin de la semaine
        else:
            start_date = current_time  # Par défaut, la journée actuelle
            end_date = current_time
        
        user_progress = UserProgress.objects.filter(timeframe=timeframe, user=request.user, date__range=[start_date, end_date])
        serializer = UserProgressSerializer(user_progress, many=True)
        return Response(serializer.data)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TaskEntry, TaskCategory
from .serializers import TaskEntrySerializer
from django.db import models

class TaskProgressView(APIView):
    def get(self, request):
        task_entries = TaskEntry.objects.all()
        
        # Statistiques générales
        completed_tasks = task_entries.filter(etat='Completed').count()
        total_tasks = task_entries.count()
        progress = (completed_tasks / total_tasks) * 100 if total_tasks else 0
        
        # Progression par catégorie
        category_progress = {}
        for category in TaskCategory.objects.all():
            category_tasks = task_entries.filter(category=category)
            category_completed = category_tasks.filter(etat='Completed').count()
            category_progress[category.name] = {
                'completed': category_completed,
                'total': category_tasks.count(),
                'progress': (category_completed / category_tasks.count()) * 100 if category_tasks.count() else 0
            }
        
        return Response({
            'progress': progress,
            'category_progress': category_progress
        })
