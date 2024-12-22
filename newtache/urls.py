from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TimeLogViewSet, TaskListCreateView, TaskCategoryListView

# Création du routeur pour TimeLogViewSet
router = DefaultRouter()
router.register(r'timelogs', TimeLogViewSet)

# Définition des routes pour l'application newtache
urlpatterns = [
    path('api/', include(router.urls)),  # Inclus les routes pour les timelogs via le routeur
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),  # Register APIView for tasks
    path('task-category/', TaskCategoryListView.as_view(), name='task-category-list'),  # API view for task categories
    path('categories/', TaskCategoryListView.as_view(), name='task-category-list'),  # Optionnel : Redondance avec la route ci-dessus
]
