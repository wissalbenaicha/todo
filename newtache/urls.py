from django.urls import path
from .views import TaskListCreateView  # Import your TaskListCreateView
from newtache.views import TaskCategoryListView  # Importer la vue qui renvoie les catégories


urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),  # Register APIView here
     path('task-category/', TaskCategoryListView.as_view(), name='task-category-list'),
]
