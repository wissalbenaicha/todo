from rest_framework import viewsets
from .models import Table1
from .serializers import Table1Serializer




class Table1ViewSet(viewsets.ModelViewSet):
    queryset = Table1.objects.all()
    serializer_class = Table1Serializer




#class Table1Serializer(serializers.ModelSerializer):
   # class Meta:
      #  model = Table1
       # fields = ['id', 'name', 'date_creation', 'due_date', 'priority', 'status']