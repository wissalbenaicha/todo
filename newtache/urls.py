from django.urls import path
from .views import TaskListCreateView  # Import your TaskListCreateView
from newtache.views import TaskCategoryListView  # Importer la vue qui renvoie les catégories
from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),  # Register APIView here
     path('task-category/', TaskCategoryListView.as_view(), name='task-category-list'),
    path('api/tasks/progress', views.task_progress, name='task_progress'),
    path('api/tasks/daily', views.daily_tasks, name='daily_tasks'),
    path('api/tasks/productivity', views.productivity_data, name='productivity_data'),
    path('api/task-category', views.task_categories, name='task_categories'),
    path('api/tasks/user-progress', views.user_progress, name='user_progress'),
]
