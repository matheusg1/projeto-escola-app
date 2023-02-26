import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTurmas } from "../../services/getTurmas";

import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function Turmas() {
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    getTurmas(setTurmas);
  }, []);

  return (
    <div className="turma-container">
      <header>
        <img src={logoImage} alt="logo" />
        <span>
          Bem vindo, <strong>Matheus</strong>!
        </span>
        <Link className="button" to="/turma/new">
          Criar nova turma
        </Link>
        <button type="button">Logoff</button>
      </header>
      <h1>Turmas registradas</h1>
      <ul>
        {turmas.map((e) => (
          <li>
            <strong>{e.codigo}</strong>
            <button type="button">Editar</button>
            <button type="button">Apagar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
