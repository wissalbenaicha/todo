from django.db import models

class User(models.Model):
    nomuser = models.CharField(max_length=100)  # Le nom
    passworduser = models.CharField(max_length=100)  # Le mot de passe
    emailuser = models.EmailField(unique=True)  # L'email, unique

    def __str__(self):
        return self.nomuser  # Affiche le nom de l'utilisateur
