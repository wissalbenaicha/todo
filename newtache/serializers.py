
from rest_framework import serializers
from newtache.models import TaskEntry  # Import du modèle TaskEntry

class TaskEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskEntry
        fields = ['id', 'nom_tache', 'date_creation', 'date_echeance', 'priorite', 'etat', 'category', 'id_user']
