import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function Escolas() {
  return (
    <div className="escola-container">
      <header>
        <img src={logoImage} alt='logo'/>
        <span>
          Bem vindo, <strong>Matheus</strong>!
        </span>
        <Link className="button" to="/escola/new">
          Criar nova escola
        </Link>
        <button type="button">Logoff</button>
      </header>
      <h1>Livros registrados</h1>
      <ul>
        <li>
        <strong>Nome</strong>
          <p>Endereco</p>

          <button type="button">Editar</button>

          <button type="button">Apagar</button>
        </li>
        <li>
        <strong>Nome</strong>
          <p>Endereco</p>

          <button type="button">Editar</button>

          <button type="button">Apagar</button>
        </li>
        <li>
          <strong>Nome</strong>
          <p>Endereco</p>

          <button type="button">Editar</button>

          <button type="button">Apagar</button>
        </li>
      </ul>
    </div>
  );
}
