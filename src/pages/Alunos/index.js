import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAlunosByTurma } from "../../services/getTurmas";
import { getEscolas, getTurmasByEscola } from "../../services/getEscolas";
import api from "../../services/api";

import Button from 'react-bootstrap/Button';
import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);

  const [escolas, setEscolas] = useState([]);
  const [escolaId, setEscolaId] = useState("");
  const [turmaId, setTurmaId] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getEscolas(setEscolas, escolas);
  }, []);

  async function deleteAluno(id) {
    try {
      await api.delete(`aluno/delete/`, {
        params: { Id: id },
      });
      setAlunos(alunos.filter((a) => a.alunoId != id));
    } catch (error) {
      alert("Erro ao excluir aluno");
    }
  }

  async function editAluno(id) {
    try {
      navigator(`/aluno/new/${id}`);
    } catch (error) {
      console.log(error);
      alert("Erro ao editar informações do aluno");
    }
  }

  return (
    <div className="aluno-container">
      <header>
        <img src={logoImage} alt="logo" />
        <span>
          Bem vindo, <strong>Matheus</strong>!
        </span>
        <Link className="button" to="/aluno/new/0">
          Cadastrar novo aluno
        </Link>
        <button type="button">Logoff</button>
      </header>
      <h1>Alunos registrados</h1>
      <select onChange={(e) => {
        getTurmasByEscola(setTurmas, e.target.value);
        setAlunos([])
      }}>
        <option defaultValue hidden>
          Escolas
        </option>
        {escolas.map((e) => (
          <option key={e.escolaId} value={e.escolaId}>
            {e.nome}
          </option>
        ))}
        )
      </select>

      <select onChange={(e) => getAlunosByTurma(setAlunos, e.target.value)}>
        <option defaultValue hidden>
          Turmas
        </option>
        {turmas &&
          turmas.map((t) => (
            <option key={t.turmaId} value={t.turmaId}>
              {t.codigo}
            </option>
          ))}
        )
      </select>
      <ul>
        {alunos.map((a) => (
          <li key={a.alunoId}>
            <strong>Matrícula</strong>
            <p>{a.matricula}</p>
            <strong>Nome</strong>
            <p>{a.nome}</p>
            <strong>Sobrenome</strong>
            <p>{a.sobrenome}</p>
            <strong>CPF</strong>
            <p>{a.cpf}</p>
            <strong>Data de nascimento</strong>
            <p>
              {Intl.DateTimeFormat("pt-BR").format(new Date(a.dataNascimento))}
            </p>
            <Button variant="outline-primary" onClick={() => editAluno(a.alunoId)}>Editar</Button>{' '}
            <Button variant="outline-danger" onClick={() => deleteAluno(a.alunoId)}>Apagar</Button>{' '}
          </li>
        ))}
      </ul>
    </div>
  );
}