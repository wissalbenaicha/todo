from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
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

from django.http import JsonResponse
from django.db.models import Count, Sum
from .models import TaskCategory, TaskEntry, TimeLog, UserProgress
from django.utils import timezone
from datetime import timedelta


# Helper function to calculate task completion status
def calculate_task_progress(user):
    completed_tasks = TaskEntry.objects.filter(id_user=user, etat='Completed')
    pending_tasks = TaskEntry.objects.filter(id_user=user, etat='Pending')
    in_progress_tasks = TaskEntry.objects.filter(id_user=user, etat='In Progress')

    return {
        'tasks_completed': completed_tasks.count(),
        'tasks_remaining': pending_tasks.count() + in_progress_tasks.count(),
        'category_progress': {
            category.name: {
                'progress': (completed_tasks.filter(category=category).count() / TaskEntry.objects.filter(category=category).count()) * 100 if TaskEntry.objects.filter(category=category).count() > 0 else 0
            }
            for category in TaskCategory.objects.all()
        }
    }


# View for fetching task progress data (per user)
def task_progress(request):
    user = request.user  # Assuming the user is authenticated
    data = calculate_task_progress(user)
    return JsonResponse(data)


# View for fetching daily task count (assuming the task's date_creation is the key)
def daily_tasks(request):
    user = request.user
    today = timezone.now().date()

    tasks_today = TaskEntry.objects.filter(id_user=user, date_creation__date=today).values('date_creation').annotate(count=Count('id'))
    data = list(tasks_today)

    return JsonResponse(data, safe=False)


# View for fetching productivity data (grouped by category and user)
def productivity_data(request):
    user = request.user
    time_logs = TimeLog.objects.filter(user=user).values('category__name', 'date').annotate(total_hours=Sum('hours_spent'))

    data = list(time_logs)

    return JsonResponse({'productivity': data}, safe=False)


# View for fetching task categories
def task_categories(request):
    categories = TaskCategory.objects.all().values('name', 'task_entries__id')
    data = list(categories)

    return JsonResponse(data, safe=False)


# View for fetching user progress data over a timeframe (e.g., month, week, year)
def user_progress(request):
    user = request.user
    timeframe = request.GET.get('timeframe', 'year')  # Default to 'year'
    now = timezone.now()

    if timeframe == 'month':
        start_date = now.replace(day=1)
    elif timeframe == 'week':
        start_date = now - timedelta(days=now.weekday())  # Start of the current week
    else:  # Default to 'year'
        start_date = now.replace(month=1, day=1)  # Start of the current year

    progress_data = UserProgress.objects.filter(user=user, timeframe=timeframe, value__gte=0)

    data = list(progress_data.values('value', 'timeframe', 'user__nomuser', 'timeframe'))
    return JsonResponse(data, safe=False)

