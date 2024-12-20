from django.urls import path
from .views import TaskListCreateView  # Import your TaskListCreateView

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),  # Register APIView here
]
