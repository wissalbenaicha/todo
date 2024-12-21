from rest_framework import serializers
from .models import TaskCategory, TaskEntry  # Import des modèles nécessaires

# Serializer pour TaskCategory
class TaskCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskCategory
        fields = ['id', 'name']  # Inclut les champs que vous souhaitez exposer dans l'API

# Serializer pour TaskEntry
class TaskEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskEntry
        fields = ['id', 'nom_tache', 'date_creation', 'date_echeance', 'priorite', 'etat', 'category', 'id_user']  # Champs à exposer dans l'API
