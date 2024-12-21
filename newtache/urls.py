from django.urls import path
from .views import TaskListCreateView  # Import your TaskListCreateView
from newtache.views import TaskCategoryListView  # Importer la vue qui renvoie les catégories


urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),  # Register APIView here
     path('task-category/', TaskCategoryListView.as_view(), name='task-category-list'),
]

# newtache/urls.py
from django.urls import path
from .views import TaskCategoryListView  # Importation correcte

urlpatterns = [
    path('categories/', TaskCategoryListView.as_view(), name='task-category-list'),
    # Ajoute d'autres URLs ici si nécessaire
]

from django.urls import path
from .views import (
    TaskListCreateView,
    TaskCategoryListView,
    TaskProgressView,
    DailyTasksView,
    ProductivityView,
    UserProgressView
)

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('task-category/', TaskCategoryListView.as_view(), name='task-category-list'),
    path('tasks/progress', TaskProgressView.as_view(), name='task-progress'),
    path('tasks/daily', DailyTasksView.as_view(), name='daily-tasks'),
    path('tasks/productivity', ProductivityView.as_view(), name='productivity'),
    path('tasks/user-progress', UserProgressView.as_view(), name='user-progress'),
]

