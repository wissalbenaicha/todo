from django.urls import path
from . import views

urlpatterns = [
    path('calendar/', views.calendar_page, name='calendar_page'),
    path('tasks/create/', views.create_task, name='create_task'),
    path('tasks/<int:user_id>/', views.list_tasks, name='list_tasks'),
    path('tasks/delete/<int:task_id>/', views.delete_task, name='delete_task'),
]
