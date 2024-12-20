from rest_framework import serializers
from .models import Table1

class Table1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Table1
        fields = ['id', 'nom_tache', 'date_creation', 'date_echeance', 'priorite', 'etat', 'id_user']
