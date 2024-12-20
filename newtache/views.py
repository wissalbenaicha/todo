from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from newtache.models import TaskEntry
from newtache.serializers import TaskEntrySerializer

class TaskEntryListCreateView(APIView):
    def get(self, request):
        tasks = TaskEntry.objects.all()  # Obtenir toutes les tâches
        serializer = TaskEntrySerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
