from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TodoSerializer

@api_view(["GET", "POST"])
def todo_list(request):
    if request.method == "GET":
        tasks = Task.objects.all() 
        serializer = TodoSerializer(tasks, many=True) 
        return Response(serializer.data)

    if request.method == "POST":
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH", "DELETE"])
def todo_detail(request, pk):
    try:
        task = Task.objects.get(pk=pk) 
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PATCH":
        serializer = TodoSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        task.delete() 
        return Response({"message": "Task successfully deleted."}, status=status.HTTP_204_NO_CONTENT)
