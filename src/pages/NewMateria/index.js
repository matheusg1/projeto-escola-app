import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getEscolas, getTurmasByEscola } from "../../services/getEscolas";
import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function NewMateria() {
  const [turmas, setTurmas] = useState();
  const [escolas, setEscolas] = useState([]);

  const [nome, setNome] = useState("");
  const [professor, setProfessor] = useState("");
  const [turmaId, setTurmaId] = useState("");
  const [escolaId, setEscolaId] = useState("");

  useEffect(() => {
    getEscolas(setEscolas);
  }, []);

  const navigator = useNavigate();

  async function createMateria(e) {
    e.preventDefault();

    const data = {
      nome,
      professor,
      turmaId,
    };

    try {
      await api.post("/Materia/create", data);
    } catch (error) {
      alert("Erro ao cadastrar matéria");
    }
    navigator("/materias");
  }
  //<select onChange={(e) => setEscolaId(e.target.value)}>

  return (
    <div className="new-materia-container">
      <div className="content">
        <section className="form">
          <img src={logoImage} alt="logo" />
          <h1>Cadastrar matéria</h1>
          <p>Coloque as informações da matéria e clique em 'Cadastrar'</p>
          <Link className="back-link" to="/materias"></Link>
        </section>
        <form onSubmit={createMateria}>
          <select
            onChange={(e) => getTurmasByEscola(setTurmas, e.target.value)}
          >
            <option defaultValue hidden isdisabled="true">
              Escolas
            </option>
            {escolas.map((e) => (
              <option key={e.escolaId} value={e.escolaId}>
                {e.nome}
              </option>
            ))}
          </select>

          <select onChange={(e) => setTurmaId(e.target.value)}>
            <option defaultValue hidden>
              Turmas
            </option>
            {turmas && (
              <>
                {turmas.map((t) => (
                  <option key={t.turmaId} value={t.turmaId}>
                    {t.codigo}
                  </option>
                ))}
              </>
            )}
          </select>
          <input
            placeholder="Nome da matéria"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            placeholder="Professor"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}