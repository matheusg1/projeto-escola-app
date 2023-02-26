import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAlunos } from "../../services/getAlunos";
import guidGenerator from "../../services/guidGenerator";
import api from "../../services/api";
import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    getAlunos(setAlunos);
    guidGenerator();

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

  return (
    <div className="aluno-container">
      <header>
        <img src={logoImage} alt="logo" />
        <span>
          Bem vindo, <strong>Matheus</strong>!
        </span>
        <Link className="button" to="/aluno/new">
          Criar nova aluno
        </Link>
        <button type="button">Logoff</button>
      </header>
      <h1>Alunos registrados</h1>
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
            <button type="button">Editar</button>
            <button type="button" onClick={() => deleteAluno(a.alunoId)} >Apagar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
