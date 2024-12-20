
# Create your models here.
from django.db import models

from accounts.models import User  # Importer le modèle User

class Table1(models.Model):
    PRIORITY_CHOICES = [
        ('High', 'High'),
        ('Medium', 'Medium'),
        ('Low', 'Low'),
    ]

    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]

    nom_tache = models.CharField(max_length=255)
    date_creation = models.DateTimeField(auto_now_add=True)
    date_echeance = models.DateField()
    priorite = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    etat = models.CharField(max_length=20, choices=STATUS_CHOICES)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='taches', null=True, blank=True)

    def __str__(self):
        return self.nom_tache
