import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEscolas } from "../../services/getEscolas";
import api from "../../services/api";

import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function Escolas() {
  const [escolas, setEscolas] = useState([]);

  useEffect(() => {
    getEscolas(setEscolas);
  }, []);

  return (
    <div className="escola-container">
      <header>
        <img src={logoImage} alt="logo" />
        <span>
          Bem vindo, <strong>Matheus</strong>!
        </span>
        <Link className="button" to="/escola/new">
          Criar nova escola
        </Link>
        <button type="button">Logoff</button>
      </header>
      <h1>Escolas registradas</h1>
      <ul>
        {escolas.map((e) => (
          <li>
            <strong>{e.nome}</strong>
            <p>{e.endereco}</p>
            <button type="button">Editar</button>
            <button type="button">Apagar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
