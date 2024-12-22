from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TimeLogViewSet, TaskListCreateView, TaskCategoryListView

# Création du routeur pour TimeLogViewSet
router = DefaultRouter()
router.register(r'timelogs', TimeLogViewSet)

# Définition des routes pour l'application newtache
urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),  # Register APIView here
     path('task-category/', TaskCategoryListView.as_view(), name='task-category-list'),
]
