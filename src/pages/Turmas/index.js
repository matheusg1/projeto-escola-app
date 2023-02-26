import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEscolas, getTurmasByEscola } from "../../services/getEscolas";
import api from "../../services/api";

import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function Turmas() {
  const [turmas, setTurmas] = useState([]);
  const [escolas, setEscolas] = useState([]);
  const [escola, setEscola] = useState("");
  const [escolaId, setEscolaId] = useState();

  const navigator = useNavigate();

  useEffect(() => {
    getEscolas(setEscolas);
  }, []);

  async function deleteTurma(id) {
    try {
      await api.delete(`turma/delete/`, {
        params: { Id: id },
      });
      setTurmas(turmas.filter((t) => t.turmaId != id));
    } catch (error) {
      alert("Erro ao excluir turma");
    }
  }

  async function editTurma(id) {
    try {
      navigator(`/turma/new/${id}`);
    } catch (error) {
      console.log(error);
      alert("Erro ao editar turma");
    }
  }
  
  return (
    <div className="turma-container">
      <header>
        <img src={logoImage} alt="logo" />
        <span>
          Bem vindo, <strong>Matheus</strong>!
        </span>
        <Link className="button" to="/turma/new/0">
          Criar nova turma
        </Link>
        <button type="button">Logoff</button>
      </header>
      <h1>Turmas registradas</h1>
      <select
        onChange={(e) => {
            getTurmasByEscola(setTurmas, e.target.value);
        }}
      >
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

      <ul>
        {turmas &&
          turmas.map((t) => (
            <li key={t.turmaId}>
              <strong>Código</strong>
              <p>{t.codigo}</p>

              <button type="button" onClick={() => editTurma(t.turmaId)}>
                Editar
              </button>
              <button type="button" onClick={() => deleteTurma(t.turmaId)}>
                Apagar
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
