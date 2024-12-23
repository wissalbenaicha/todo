from rest_framework import serializers
from .models import TaskCategory, TaskEntry

class TaskCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskCategory
        fields = ['id', 'name']

class TaskEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskEntry
        fields = ['id', 'nom_tache', 'date_creation', 'date_echeance', 'priorite', 'etat', 'category', 'id_user']
