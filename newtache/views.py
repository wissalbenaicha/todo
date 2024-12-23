from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import TaskEntry, TaskCategory
from .serializers import TaskEntrySerializer, TaskCategorySerializer
from rest_framework.permissions import IsAuthenticated

# Vue pour la gestion des tâches
class TaskEntryListCreateView(APIView):
    permission_classes = [IsAuthenticated]  # Permission pour les utilisateurs authentifiés

    def get(self, request):
        tasks = TaskEntry.objects.all()  # Récupère toutes les tâches
        serializer = TaskEntrySerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Récupérer l'utilisateur authentifié
        user = request.user
        
        # Récupérer le nom de la catégorie depuis les données de la requête
        category_name = request.data.get("category", None)
        if category_name:
            try:
                # Recherche de la catégorie par son nom
                category = TaskCategory.objects.get(name=category_name)
                # Si la catégorie existe, on remplace le nom de la catégorie par l'ID
                request.data["category"] = category.id
            except TaskCategory.DoesNotExist:
                # Si la catégorie n'existe pas, renvoyer une erreur
                return Response({"error": "La catégorie spécifiée n'existe pas."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Le nom de la catégorie est requis."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Ajouter l'utilisateur à la tâche
        request.data["id_user"] = user.id  # Associer l'utilisateur authentifié à la tâche

        # Sérialisation des données de la tâche
        serializer = TaskEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Sauvegarder la tâche avec l'utilisateur associé
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Si les données ne sont pas valides
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vue pour la gestion des catégories de tâches
class TaskCategoryListView(APIView):
    def get(self, request):
        categories = TaskCategory.objects.all()  # Récupère toutes les catégories de tâches
        serializer = TaskCategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Vue pour la création d'une nouvelle catégorie de tâche
class TaskCategoryListCreateView(APIView):
    permission_classes = [IsAuthenticated]  # Ajout de la permission pour les utilisateurs authentifiés

    def post(self, request):
        # Vérifier si la catégorie existe déjà
        category_name = request.data.get('name')
        if TaskCategory.objects.filter(name=category_name).exists():
            return Response({"error": "La catégorie existe déjà."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Créer une nouvelle catégorie de tâche
        serializer = TaskCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
