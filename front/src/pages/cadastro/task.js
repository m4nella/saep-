// Task.js

import React, { useState, useEffect } from "react";
import './styles.css'
import axios from "axios";
import { Link } from 'react-router-dom'; 

const TaskForm = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    usuario: "",
    descricao: "",
    setor: "",
    prioridade: "baixa",
    status: "a_fazer",
  });

  // Carrega a lista de usuários da API quando o componente é montado
  useEffect(() => {
    axios.get("http://localhost:8000/api/users/")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Erro ao carregar usuários:", error));
  }, []);

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };

  // Função para enviar os dados do formulário para a API
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData)
    axios.post("http://localhost:8000/api/tasks/", formData)
      .then(response => {
        alert("Tarefa cadastrada com sucesso!");
        setFormData({
          usuario: "",
          descricao: "",
          setor: "",
          prioridade: "baixa",
          status: "a_fazer",
        });
      })
      .catch(error => console.error("Erro ao cadastrar tarefa:", error));
  };

  return (
    <div>
        <header className="header">
        <h1 className="title">Gerenciador de Tarefas</h1>
        <nav className="nav">
          <Link className="Link" to="/cadastro-usuarios">Cadastro de Usuários</Link>
          <Link className="Link" to="/cadastrar-tarefas">Cadastro de Tarefas</Link>
          <Link className="Link" to="/gerenciar-tarefas">Gerenciar Tarefas</Link>
        </nav>
      </header>

      <h2>Cadastrar Nova Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <select name="usuario" value={formData.usuario} onChange={handleChange} required>
            <option value="">Selecione um usuário</option>
            {usuarios.map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Descrição da Tarefa:</label>
          <textarea name="descricao" value={formData.descricao} onChange={handleChange} required />
        </div>
        <div>
          <label>Setor:</label>
          <input type="text" name="setor" value={formData.setor} onChange={handleChange} required />
        </div>
        <div>
          <label>Prioridade:</label>
          <select name="prioridade" value={formData.prioridade} onChange={handleChange} required>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="a_fazer">A Fazer</option>
            <option value="fazendo">Fazendo</option>
            <option value="pronto">Pronto</option>
          </select>
        </div>
        <button type="submit">Cadastrar Tarefa</button>
      </form>
    </div>
  );
};

export default TaskForm;
