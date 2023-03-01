import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getEscolas, getTurmasByEscola } from "../../services/getEscolas";
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
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col">
          <img src={logoImage} className="h-50" alt="logo" />
          <h1>Cadastrar matéria</h1>
          <p>Coloque as informações da matéria e clique em 'Cadastrar'</p>
          <Link className="back-link" to="/materias">
            <button className="btn btn-dark btn-lg" type="button">Voltar</button>
          </Link>
        </div>
        <div className="col">
          <form onSubmit={createMateria} className="mt-3">
            <select className="form-select form-select-lg mb-3"
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

            <select className="form-select form-select-lg mb-3"
              onChange={(e) => setTurmaId(e.target.value)}>
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
            <input className="form-control form-control-lg mb-3"
              placeholder="Nome da matéria"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input className="form-control form-control-lg mb-3"
              placeholder="Professor"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
            />
            <button className="btn btn-dark btn-lg w-100" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}