from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt  # Pour désactiver la protection CSRF (si nécessaire)
import json
from .models import Task

# Vue pour gérer les tâches
@csrf_exempt  # Si vous désactivez temporairement CSRF (par exemple pour le test), sinon retirez cette ligne.
def task_create(request):
    if request.method == 'POST':
        try:
            # Charger le corps de la requête en JSON
            data = json.loads(request.body)

            title = data.get('title')  # Récupérer le nom de la tâche depuis le JSON

            if title:
                task = Task.objects.create(title=title)
                return JsonResponse({"message": "Task added successfully!", "task_id": task.id}, status=201)
            return JsonResponse({"error": "Task name is required!"}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format!"}, status=400)

    # Pour les requêtes GET, récupérer les tâches existantes
    elif request.method == 'GET':
        tasks = Task.objects.all().values()
        return JsonResponse({"tasks": list(tasks)}, safe=False)

    return JsonResponse({"error": "Invalid request method!"}, status=405)
