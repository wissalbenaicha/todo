
# Create your models here.
from django.db import models

class Task(models.Model):
    nom_task = models.CharField(max_length=200)
    date_create = models.DateTimeField(auto_now_add=True)
    date_echeance = models.DateField(null=True, blank=True)
    priorite = models.CharField(max_length=50)  # Adjust max_length as needed
    etat = models.CharField(max_length=50)  # True if task is done, False otherwise
    catégorie = models.CharField(max_length=100, default='null')
    
    def __str__(self):
        return self.nom_task
