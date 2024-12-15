# calendar/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('calendar/', views.calendar_page, name='calendar_page'),
]
