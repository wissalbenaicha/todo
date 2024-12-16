
# Create your models here.
from django.db import models

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

    def __str__(self):
        return self.nom_tache
