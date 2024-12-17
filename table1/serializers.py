
from rest_framework import serializers
from accounts.serializers import UserSerializer  # Import du UserSerializer
from .models import Table1

class Table1Serializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Inclure les détails de l'utilisateur

    class Meta:
        model = Table1
        fields = ['id', 'nom_tache', 'date_creation', 'date_echeance', 'priorite', 'etat', 'user']
        read_only_fields = ['date_creation', 'user']  # Champs non modifiables par l'utilisateur