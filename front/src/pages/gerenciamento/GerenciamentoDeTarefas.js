import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const GerenciamentoDeTarefas = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [tasks, setTasks] = useState({
        a_fazer: [],
        fazendo: [],
        pronto: []
    });

    const statusOptions = [
        { value: 'a_fazer', label: 'A Fazer' },
        { value: 'fazendo', label: 'Fazendo' },
        { value: 'pronto', label: 'Pronto' }
    ];

    // Função para buscar os usuários
    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    // Função para buscar as tarefas
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/tasks/');
            const organizedTasks = {
                a_fazer: response.data.filter(task => task.status === 'a_fazer'),
                fazendo: response.data.filter(task => task.status === 'fazendo'),
                pronto: response.data.filter(task => task.status === 'pronto')
            };
            setTasks(organizedTasks);
        } catch (error) {
            console.error("Erro ao buscar as tarefas:", error);
        }
    };

    // Chama as funções quando o componente é montado
    useEffect(() => {
        fetchUsuarios();
        fetchTasks();
    }, []);

    // Função para buscar o nome do usuário pelo ID
    const getUsernameById = (userId) => {
        const user = usuarios.find(u => u.id === userId);
        return user ? user.username : "Não atribuído";
    };

    // Função para atualizar o status da tarefa
    const handleStatusChange = async (taskId, newStatus) => {
        const taskToUpdate = Object.values(tasks).flat().find(task => task.id === taskId);

        if (!taskToUpdate) {
            console.error("Tarefa não encontrada!");
            return;
        }

        try {
            const updatedTask = {
                ...taskToUpdate,
                status: newStatus
            };

            await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}/`, updatedTask);

            fetchTasks();
            alert("Status da tarefa atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o status da tarefa:", error);
            alert("Erro ao atualizar o status. Verifique os dados e tente novamente.");
        }
    };

    // Função para excluir a tarefa
    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/tasks/del/${taskId}/`);
            fetchTasks();
            alert("Tarefa excluída com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir a tarefa:", error);
            alert("Erro ao excluir a tarefa. Tente novamente.");
        }
    };

    return (
        <div>
            <header className='header'>
                <h1>Gerenciamento de Tarefas</h1>
                <nav className="nav">
                    <Link className="Link" to="/cadastro-usuarios">Cadastro de Usuários</Link>
                    <Link className="Link" to="/cadastrar-tarefas">Cadastro de Tarefas</Link>
                    <Link className="Link" to="/gerenciar-tarefas">Gerenciar Tarefas</Link>
                </nav>
            </header>

            <div className="kanban-container">
                {Object.keys(tasks).map(status => (
                    <div key={status} className="kanban-column">
                        <h2>{statusOptions.find(option => option.value === status).label}</h2>
                        {tasks[status].map(task => (
                            <div key={task.id} className="kanban-card">
                                <h3>{task.descricao}</h3>
                                <p><strong>Setor:</strong> {task.setor}</p>
                                <p><strong>Prioridade:</strong> {task.prioridade}</p>
                                <p>
                                <strong>Usuário:</strong> {usuarios.find(user => user.id === task.usuario).username}
                                </p>
                                <p><strong>Data de Cadastro:</strong> {new Date(task.data_cadastro).toLocaleDateString()}</p>
                                <button
                                    onClick={() => navigate(`/editar-tarefa/${task.id}`)}
                                    className="update-button"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="delete-button"
                                >
                                    Excluir
                                </button>
                                <div className="status-container">
                                    <label><strong>Status:</strong></label>
                                    <select
                                        value={task.status}
                                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                    >
                                        {statusOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GerenciamentoDeTarefas;
