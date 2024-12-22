from django.db import models
from accounts.models import User  # Import du modèle User

# Modèle pour les catégories de tâches
class TaskCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

# Modèle pour les entrées de tâches
class TaskEntry(models.Model):
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
    category = models.ForeignKey(
        TaskCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='task_entries'
    )
    id_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='task_entries_user_alt',  # Nom unique pour la deuxième relation
        null=True,
        blank=True
    )

    def __str__(self):
        return self.nom_tache

# Modèle pour le suivi du temps passé par l'utilisateur sur les catégories de tâches
class TimeLog(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='time_logs'
    )
    category = models.ForeignKey(
        TaskCategory,
        on_delete=models.CASCADE,
        default=1,
        related_name='time_logs'
    )
    date = models.DateField()
    hours_spent = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('user', 'category', 'date')

    def __str__(self):
        return f"{self.user.nomuser} - {self.category.name} - {self.date} - {self.hours_spent}h"

# Modèle pour enregistrer la progression des utilisateurs
class UserProgress(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='progress_records'
    )
    timeframe = models.CharField(max_length=10)  # "week", "month", "year"
    value = models.FloatField()

    def __str__(self):
        return f"UserProgress ({self.timeframe}): {self.value} for {self.user.nomuser}"

