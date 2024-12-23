from rest_framework import serializers
from .models import TaskCategory, TaskEntry, TimeLog, UserProgress
from .models import TaskCategory
from .models import TaskCategory, TaskEntry

# Serializer pour TaskCategory
class TaskCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskCategory
        fields = ['id', 'name']  # Expose les champs spécifiques (id et name)

# Serializer pour TaskEntry
class TaskEntrySerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)  # Nom de la catégorie dans les réponses GET
    category = serializers.CharField(write_only=True)  # Accepte un nom ou un ID de catégorie pour les requêtes POST

    class Meta:
        model = TaskEntry
        fields = [
            'id', 'nom_tache', 'date_creation', 'date_echeance', 
            'priorite', 'etat', 'category', 'category_name', 'id_user'
        ]

    def validate_category(self, value):
        """
        Valide et gère le champ `category`. Si un nom est donné, il tente de trouver ou de créer la catégorie.
        """
        try:
            # Si `value` est un ID numérique, récupérer directement la catégorie
            if value.isdigit():
                category = TaskCategory.objects.get(id=value)
            else:
                # Sinon, traiter `value` comme un nom et chercher ou créer la catégorie
                category, _ = TaskCategory.objects.get_or_create(name=value)
            return category
        except TaskCategory.DoesNotExist:
            raise serializers.ValidationError("La catégorie spécifiée est invalide.")
    
    def create(self, validated_data):
        """
        Personnalisation de la méthode `create` pour gérer le champ `category`.
        """
        category = validated_data.pop('category')
        task_entry = TaskEntry.objects.create(category=category, **validated_data)
        return task_entry

# Serializer pour TimeLog
class TimeLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeLog
        fields = '__all__'

# Serializer pour UserProgress
class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = '__all__'

class TaskEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskEntry
        fields = ['id', 'nom_tache', 'date_creation', 'date_echeance', 'priorite', 'etat', 'category', 'id_user']
