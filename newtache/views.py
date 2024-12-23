from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TaskCategory, TaskEntry
from .serializers import TaskCategorySerializer, TaskEntrySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TaskCategory, TaskEntry
from datetime import datetime
# views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import TaskEntry, TaskCategory
from .serializers import TaskEntrySerializer
from django.contrib.auth.models import User

class CreateTaskView(APIView):
    """
    Cette vue permet de créer une tâche et, si nécessaire, de créer une catégorie.
    """
    
    def post(self, request, *args, **kwargs):
        # Récupérer les données envoyées par le frontend
        title = request.data.get('nom_tache')
        due_date = request.data.get('date_echeance')
        priority = request.data.get('priorite')
        status = request.data.get('etat')
        category_name = request.data.get('category_name')  # Nom de la catégorie
        user_id = request.data.get('id_user')  # ID de l'utilisateur (peut être null)

        # Vérifier si tous les champs obligatoires sont présents
        if not title or not due_date or not priority or not status:
            return Response({"detail": "Veuillez remplir tous les champs obligatoires."}, status=status.HTTP_400_BAD_REQUEST)

        # Gérer la catégorie
        category = None
        if category_name:
            # Vérifier si la catégorie existe déjà
            category = TaskCategory.objects.filter(name=category_name.strip()).first()

            if not category:
                # Si la catégorie n'existe pas, la créer
                category = TaskCategory.objects.create(name=category_name.strip())

        # Gérer l'utilisateur (peut être null)
        user = None
        if user_id:
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return Response({"detail": "L'utilisateur spécifié n'existe pas."}, status=status.HTTP_400_BAD_REQUEST)

        # Créer la tâche
        task_data = {
            'nom_tache': title,
            'date_echeance': due_date,
            'priorite': priority,
            'etat': status,
            'category': category.id if category else None,
            'id_user': user.id if user else None
        }

        # Sérialiser et sauvegarder la tâche
        task_serializer = TaskEntrySerializer(data=task_data)
        if task_serializer.is_valid():
            task_serializer.save()
            return Response(task_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(task_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.generics import ListCreateAPIView
from .models import TaskEntry
from .serializers import TaskEntrySerializer

class TaskEntryListCreateView(ListCreateAPIView):
    queryset = TaskEntry.objects.all()
    serializer_class = TaskEntrySerializer


from rest_framework.generics import ListAPIView
from .models import TaskCategory
from .serializers import TaskCategorySerializer

class TaskCategoryListView(ListAPIView):
    queryset = TaskCategory.objects.all()
    serializer_class = TaskCategorySerializer


from rest_framework.generics import ListCreateAPIView
from .models import TaskCategory
from .serializers import TaskCategorySerializer

class TaskCategoryListCreateView(ListCreateAPIView):
    queryset = TaskCategory.objects.all()
    serializer_class = TaskCategorySerializer


#dashboard 
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import TaskEntry
from rest_framework import status

class TaskDashboardView(APIView):
    def get(self, request):
        # Récupérer le nombre total de tâches
        total_tasks = TaskEntry.objects.count()

        # Récupérer le nombre de tâches complètes
        tasks_completed = TaskEntry.objects.filter(etat='Completed').count()

        # Récupérer le nombre de tâches restantes (en cours et en attente)
        tasks_remaining = TaskEntry.objects.filter(etat__in=['Pending', 'In Progress']).count()

        # Calculer le pourcentage de tâches complètes et restantes
        tasks_completed_percentage = (tasks_completed / total_tasks) * 100 if total_tasks > 0 else 0
        tasks_remaining_percentage = (tasks_remaining / total_tasks) * 100 if total_tasks > 0 else 0

        # Retourner ces données sous forme de réponse JSON
        data = {
            'tasks_completed': tasks_completed,
            'tasks_remaining': tasks_remaining,
            'total_tasks': total_tasks,
            'tasks_completed_percentage': tasks_completed_percentage,
            'tasks_remaining_percentage': tasks_remaining_percentage,
        }

        return Response(data, status=status.HTTP_200_OK)


from django.http import JsonResponse
from django.db.models import Count
from .models import TaskEntry  # Import du modèle TaskEntry

def task_category_view(request):
    # Récupérer les catégories avec le décompte des tâches associées
    categories = TaskEntry.objects.values('category__name').annotate(count=Count('id'))
    data = [
        {
            "name": category['category__name'],
            "count": category['count']
        }
        for category in categories
    ]
    return JsonResponse(data, safe=False)

# views.py
from datetime import timedelta, date
from django.utils import timezone
from django.http import JsonResponse
from .models import TaskEntry

def daily_tasks(request):
    # Calculer les 5 derniers jours
    today = timezone.localdate()
    days = [today - timedelta(days=i) for i in range(4, -1, -1)]  # 4 jours avant jusqu'à aujourd'hui

    task_counts = {}
    
    for i, day in enumerate(days, start=1):
        task_counts[f"day_{i}"] = TaskEntry.objects.filter(date_echeance=day).count()

    return JsonResponse(task_counts)
