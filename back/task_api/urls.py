# urls.py

from django.urls import path
from .views import user_view, task_view, TaskRetrieveUpdateAPIView, TaskDeleteAPIView

urlpatterns = [
    path('users/', user_view, name='user_list_create'),
    path('tasks/', task_view, name='task_list_create'),
    path('tasks/<int:pk>/', TaskRetrieveUpdateAPIView.as_view(), name='task-retrieve-update'),  # Endpoint para atualizar tarefa específica
    path('tasks/del/<int:pk>/', TaskDeleteAPIView.as_view(), name='task-delete'),
]


