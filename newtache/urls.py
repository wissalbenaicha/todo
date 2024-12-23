from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TimeLogViewSet, TaskListCreateView, TaskCategoryListView, TaskCategoryListCreateView

# Création du routeur pour TimeLogViewSet
router = DefaultRouter()
router.register(r'timelogs', TimeLogViewSet)

# Définition des routes pour l'application newtache
urlpatterns = [
    # Tâches
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),  # Vue pour afficher et créer des tâches
    
    # Catégories de tâches
    path('task-category/', TaskCategoryListView.as_view(), name='task-category-list'),  # Liste des catégories
    path('task-category/create/', TaskCategoryListCreateView.as_view(), name='task-category-create'),  # Création d'une nouvelle catégorie
    
    # Inclure les routes créées par le routeur pour TimeLogViewSet
    path('api/', include(router.urls)),  # Cela inclut les routes pour 'timelogs' via le routeur
]

