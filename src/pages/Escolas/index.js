import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEscolas } from "../../services/getEscolas";
import api from "../../services/api";

import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function Escolas() {
  const [escolas, setEscolas] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getEscolas(setEscolas);
  }, []);

  async function deleteEscola(id) {
    try {
      await api.delete(`escola/delete/`, {
        params: { Id: id },
      });
      setEscolas(escolas.filter((e) => e.escolaId != id));
    } catch (error) {
      alert("Erro ao excluir escola");
    }
  }
  async function editEscola(id){
    try {
        navigator(`/escola/new/${id}`)
      } catch (error) {
        alert("Erro ao editar escola");
      }
  }

  return (
    <div className="escola-container">
      <header>
        <img src={logoImage} alt="logo" />
        <span>
          Bem vindo, <strong>Matheus</strong>!
        </span>
        <Link className="button" to="/escola/new/0">
          Criar nova escola
        </Link>
        <button type="button">Logoff</button>
      </header>
      <h1>Escolas registradas</h1>
      <ul>
        {escolas.map((e) => (
          <li key={e.escolaId}>
            <strong>{e.nome}</strong>
            <p>{e.endereco}</p>
            <button type="button" onClick={() => editEscola(e.escolaId)}>Editar</button>
            <button type="button" onClick={() => deleteEscola(e.escolaId)}>Apagar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
//
