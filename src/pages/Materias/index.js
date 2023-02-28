import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMaterias } from "../../services/getMaterias";
import { getTurmas, getMateriasByTurma } from "../../services/getTurmas";
import api from "../../services/api";

import Button from 'react-bootstrap/Button';
import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function Materias() {
  const [materias, setMaterias] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [turma, setTurma] = useState([]);

  useEffect(() => {
    //getMaterias(setMaterias);
    getTurmas(setTurmas);
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

  const handleSelect = (e) => {
    let turmaInfo = e.split(",")
    setTurma(turmaInfo[1])
    getMateriasByTurma(setMaterias, turmaInfo[0]);
  }

  return (
    <div className="mt-3 mx-5">
      <header className="d-flex flex-row align-items-center justify-content-between">
        <img src={logoImage} style={{ height: "70px" }} alt="logo" />
        <h2 className="px-4">
          Bem vindo!
        </h2>
        <Link className="btn btn-dark btn-lg" to="/materia/new/0">
          Cadastrar nova matéria
        </Link>
      </header>
      <h1 className="mt-5">Matérias</h1>
      <ul>
        {materias.map((m) => (
          <li key={m.materiaId}>
            <strong>Nome</strong>
            <p>{m.nome}</p>
            <strong>Professor</strong>
            <p>{m.professor}</p>
            <Button variant="outline-danger" onClick={() => deleteMateria(m.materiaId)}>Apagar</Button>{' '}
          </li>
        ))}
      </ul>
    </div>
  );
}
