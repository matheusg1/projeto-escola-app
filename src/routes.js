import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login'
import Escolas from './pages/Escolas'
import NewEscola from './pages/NewEscola'

//import Alunos from './pages/Alunos'
import NewAluno from './pages/NewAluno'

export default function Routes1(){
  return(
    <Router>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/escolas" element={<Escolas/>}/>
            <Route path="/escola/new" element={<NewEscola/>}/>            
            <Route path="/aluno/new" element={<NewAluno/>}/>
        </Routes>
    </Router>
  );
}