from django.urls import path
from .views import (
    TaskEntryListCreateView,
    TaskCategoryListView,
    TaskCategoryListCreateView,
    CreateTaskView  # Vue pour créer une tâche avec catégorie
)

urlpatterns = [
    path('task-entry/', TaskEntryListCreateView.as_view(), name='task-entry-list-create'),
    path('task-category/', TaskCategoryListView.as_view(), name='task-category-list'),
    path('task-category/create/', TaskCategoryListCreateView.as_view(), name='task-category-create'),
    path('task/create-with-category/', CreateTaskView.as_view(), name='task-create-with-category'),
    
]
from django.urls import path
from .views import task_category_view

urlpatterns = [
    path('api/task-category/', task_category_view, name='task-category'),
]

from django.urls import path
from . import views

urlpatterns = [
    path('api/daily-tasks/', views.get_daily_tasks, name='daily-tasks'),
]
