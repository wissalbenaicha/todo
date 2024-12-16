from rest_framework import serializers
from .models import Table1

class Table1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Table1
        fields = '__all__'
