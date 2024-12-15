# Create your models here.
from django.db import models
from django.contrib.auth.models import User  # Pour relier les tâches à un utilisateur

class Task(models.Model):
    title = models.CharField(max_length=255)  # Titre de la tâche
    description = models.TextField(blank=True, null=True)  # Description (optionnelle)
    date = models.DateField()  # Date de la tâche
    start_time = models.TimeField()  # Heure de début
    end_time = models.TimeField()  # Heure de fin
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Utilisateur propriétaire de la tâche

    def __str__(self):
        return self.title
