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

from rest_framework import serializers
from .models import TaskCategory, TaskEntry, TimeLog, UserProgress

class TaskCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskCategory
        fields = '__all__'

class TaskEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskEntry
        fields = '__all__'

class TimeLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeLog
        fields = '__all__'

class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = '__all__'
