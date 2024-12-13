from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=255)  # Nom de la tâche
    created_at = models.DateTimeField(auto_now_add=True)  # Date d'ajout
    step = models.IntegerField(default=1)  # Étape de progression (ex. 1/2, 2/2)

    def __str__(self):
        return self.title

