# views.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Task
from .serializers import UserSerializer, TaskSerializer
from rest_framework.generics import RetrieveUpdateAPIView, DestroyAPIView
from rest_framework import permissions

@api_view(['GET', 'POST'])
def user_view(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def task_view(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer




class TaskDeleteAPIView(DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    # A view usa o id da tarefa para localizá-la e excluí-la
