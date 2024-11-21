// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GerenciamentoDeTarefas from './pages/gerenciamento/GerenciamentoDeTarefas.js';
import CadastroDeTarefas from './pages/cadastro/task.js';
import CadastroDeUsuario from './pages/home'
import EditarTarefa from './pages/editar/task.js'
import Home from './pages/home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/gerenciar-tarefas" element={<GerenciamentoDeTarefas />} />
                <Route path="/cadastrar-tarefas" element={<CadastroDeTarefas />} />
                <Route path="/cadastro-usuarios" element={<CadastroDeUsuario />} />
                <Route path="/editar-tarefa/:id" element={<EditarTarefa />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
