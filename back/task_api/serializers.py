# serializers.py

from rest_framework import serializers
from .models import User, Task

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class TaskSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='usuario.username', read_only=True)
    
    class Meta:
        model = Task
        fields =  '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__' 