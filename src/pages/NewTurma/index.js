import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getEscolas } from "../../services/getEscolas";
import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function NewTurma() {
  const [escolas, setEscolas] = useState([]);
  
  const [codigo, setCodigo] = useState("");
  const [escolaId, setEscolaId] = useState("");

  useEffect(() => {
    getEscolas(setEscolas);
  });

  const navigator = useNavigate();

  async function createTurma(e) {
    e.preventDefault();

    const data = {
      codigo,
      escolaId,
    };

    try {
      await api.post("/Turma/create", data);
    } catch (error) {
      alert("Erro ao cadastrar turma");
    }
    navigator("/turmas");
  }
//            <option selected disabled hidden>

  return (
    <div className="new-turma-container">
      <div className="content">
        <section className="form">
          <img src={logoImage} alt="logo" />
          <h1>Cadastrar turma</h1>
          <p>Coloque as informações da turma e clique em 'Cadastrar'</p>
          <Link className="back-link" to="/turmas"></Link>
        </section>
        <form onSubmit={createTurma}>
          <select onChange={(e) => setEscolaId(e.target.value)}>
            <option defaultValue hidden>
            Escolas
            </option>
            {escolas.map((e) => (
              <option key={e.escolaId} value={e.escolaId}>
                {e.nome}
              </option>
            ))}
          </select>
          <input
            placeholder="Código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
