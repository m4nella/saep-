# models.py

from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username

class Task(models.Model):
    STATUS_CHOICES = [
        ('a_fazer', 'A Fazer'),
        ('fazendo', 'Fazendo'),
        ('pronto', 'Pronto'),
    ]

    PRIORITY_CHOICES = [
        ('baixa', 'Baixa'),
        ('media', 'Média'),
        ('alta', 'Alta'),
    ]

    id = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(User, related_name='tasks', on_delete=models.CASCADE)
    descricao = models.TextField()
    setor = models.CharField(max_length=100)
    prioridade = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    data_cadastro = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='a_fazer')

    def __str__(self):
        return f"{self.descricao} - {self.usuario.username}"

