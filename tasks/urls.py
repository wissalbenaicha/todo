from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.task_create, name='task_create'),
]
