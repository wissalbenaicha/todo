from django.db import models
from django.contrib.auth.models import User  # Pour associer les données à un utilisateur
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

    nom_tache = models.CharField(max_length=255)
    date_creation = models.DateTimeField(auto_now_add=True)
    date_echeance = models.DateField()
    priorite = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    etat = models.CharField(max_length=20, choices=STATUS_CHOICES)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True)  # Relation vers Category
    iduser = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')  # Référence au modèle User dans l'application accounts


    def __str__(self):
        return self.nom_tache

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Productivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)  # Utilise un ForeignKey ici
    date = models.DateField()
    hours_spent = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('user', 'category', 'date')

    def __str__(self):
        return f"{self.user.username} - {self.category.name} - {self.date} - {self.hours_spent}h"

class Progress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Associer à un utilisateur
    timeframe = models.CharField(max_length=10)  # "week", "month", "year"
    value = models.FloatField()

    def __str__(self):
        return f"Progress ({self.timeframe}): {self.value} for {self.user.username}"
