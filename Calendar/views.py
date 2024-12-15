

# Create your views here.
# calendar/views.py
from django.shortcuts import render

def calendar_page(request):
    return render(request, 'index.html')
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Task
import json
from datetime import datetime

@csrf_exempt
def create_task(request):
    """ Créer une nouvelle tâche """
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data.get('title')
        description = data.get('description', '')
        date = data.get('date')
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        user_id = data.get('user_id')

        task = Task.objects.create(
            title=title,
            description=description,
            date=datetime.strptime(date, '%Y-%m-%d').date(),
            start_time=datetime.strptime(start_time, '%H:%M').time(),
            end_time=datetime.strptime(end_time, '%H:%M').time(),
            user_id=user_id
        )
        return JsonResponse({"success": True, "task_id": task.id})

def list_tasks(request, user_id):
    """ Lister les tâches pour un utilisateur spécifique """
    tasks = Task.objects.filter(user_id=user_id).values()
    return JsonResponse({"tasks": list(tasks)})

@csrf_exempt
def delete_task(request, task_id):
    """ Supprimer une tâche """
    if request.method == 'DELETE':
        Task.objects.filter(id=task_id).delete()
        return JsonResponse({"success": True})
