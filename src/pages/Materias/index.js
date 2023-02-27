import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMaterias } from "../../services/getMaterias";
import api from "../../services/api";
import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function Materias() {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    getMaterias(setMaterias);
  }, []);

  async function deleteMateria(id) {
    try {
      await api.delete(`materia/delete/`, {
        params: { Id: id },
      });
      setMaterias(materias.filter((m) => m.materiaId !== id));
    } catch (error) {
      alert("Erro ao excluir matéria");
    }
  }

  return (
    <div className="materia-container">
      <header>
        <img src={logoImage} alt="logo" />
        <span>
          Bem vindo, <strong>Matheus</strong>!
        </span>
        <Link className="button" to="/materia/new/0">
          Criar nova matéria
        </Link>
        <button type="button">Logoff</button>
      </header>
      <h1>Matérias</h1>
      <ul>
        {materias.map((m) => (
          <li key={m.materiaId}>
            <strong>Nome</strong>
            <p>{m.nome}</p>
            <strong>Professor</strong>
            <p>{m.professor}</p>
            <button type="button" onClick={() => deleteMateria(m.materiaId)}>
              Apagar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
