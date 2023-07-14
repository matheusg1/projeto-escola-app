import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/Login'
import Escolas from './pages/Escolas'
import Turmas from './pages/Turmas'
import Materias from './pages/Materias'
import Alunos from './pages/Alunos'

import NewEscola from './pages/NewEscola'
import NewTurma from './pages/NewTurma'
import NewMateria from './pages/NewMateria'
import NewAluno from './pages/NewAluno'
import Inicio from './pages/Inicio';

export default function AppRoutes() {
    return (
        <Routes>
            
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/" element={<Escolas />} />
            <Route path="/escolas" element={<Escolas />} />
            <Route path="/turmas" element={<Turmas />} />
            <Route path="/materias" element={<Materias />} />
            <Route path="/alunos" element={<Alunos />} />

            <Route path="/escola/new/:escolaId" element={<NewEscola />} />
            <Route path="/turma/new/:turmaId" element={<NewTurma />} />
            <Route path="/materia/new/:materiaId" element={<NewMateria />} />
            <Route path="/aluno/new/:alunoId" element={<NewAluno />} />
        </Routes>
    );
}