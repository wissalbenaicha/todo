import secrets
from django.db import models

class User(models.Model):
    nomuser = models.CharField(max_length=100)  # Le nom
    passworduser = models.CharField(max_length=100)  # Le mot de passe
    emailuser = models.EmailField(unique=True)  # L'email, unique
    email_verified = models.BooleanField(default=False)  # Si l'email est vérifié
    verification_token = models.CharField(max_length=255, blank=True)  # Token de vérification aléatoire (sans contrainte unique)

    def generate_verification_token(self):
        """Générer un token de vérification aléatoire"""
        self.verification_token = secrets.token_urlsafe()  # Génère un token sécurisé
        self.save()

    def __str__(self):
        return self.nomuser  # Affiche le nom de l'utilisateur
