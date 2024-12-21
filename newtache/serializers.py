from rest_framework import serializers
from .models import TaskEntry, TaskCategory

class TaskCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskCategory
        fields = ['id', 'name']  # Expose les champs que vous souhaitez

class TaskEntrySerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=TaskCategory.objects.all()
    )  # Utilisé pour POST
    
    # Optionnel : Affiche le nom de la catégorie dans les réponses GET
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = TaskEntry
        fields = [
            'id', 'nom_tache', 'date_creation', 'date_echeance', 
            'priorite', 'etat', 'category', 'category_name', 'id_user'
        ]
