
# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse
from .models import Task
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json

@method_decorator(csrf_exempt, name='dispatch')
class TaskView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            nom_task = data['nom_task']
            date_echeance = data.get('date_echeance')
            priorite = data.get('priorite', 'Normal')  # Default priority
            etat = data.get('etat', False)
            catégorie = data.get('catégorie')


            task = Task.objects.create(
                nom_task=nom_task,
                date_echeance=date_echeance,
                priorite=priorite,
                etat=etat,
                catégorie=catégorie,
            )
            task.save()

            return JsonResponse({'message': 'Task created successfully!'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    def get(self, request):
        tasks = Task.objects.all().values()
        return JsonResponse(list(tasks), safe=False)
