import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login'
import Escolas from './pages/Escolas'
import Turmas from './pages/Turmas'
import Alunos from './pages/Alunos'

import NewEscola from './pages/NewEscola'
import NewTurma from './pages/NewTurma'
import NewMateria from './pages/NewMateria'
import NewAluno from './pages/NewAluno'

export default function Routes1(){
  return(
    <Router>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/escolas" element={<Escolas/>}/>
            <Route path="/turmas" element={<Turmas/>}/>
            <Route path="/alunos" element={<Alunos/>}/>

            <Route path="/escola/new/:escolaId" element={<NewEscola/>}/>        
            <Route path="/turma/new/:turmaId/" element={<NewTurma/>}/>
            <Route path="/materia/new" element={<NewMateria/>}/>
            <Route path="/aluno/new" element={<NewAluno/>}/>
        </Routes>
    </Router>
  );
}