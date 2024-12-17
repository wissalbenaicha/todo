from django.db import models
from accounts.models import User  # Importez le modèle User depuis l'application accounts

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

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
    nom_tache = models.CharField(max_length=255)
    date_creation = models.DateTimeField(auto_now_add=True)
    date_echeance = models.DateField()
    priorite = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    etat = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def str(self):
        return f"{self.nom_tache} ({self.user.nomuser})"