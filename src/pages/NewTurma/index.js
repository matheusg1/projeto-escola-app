import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { getEscolas } from "../../services/getEscolas";
import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function NewTurma() {
  const [escolas, setEscolas] = useState([]);

  const [id, setId] = useState();
  const [codigo, setCodigo] = useState("");
  const navigator = useNavigate();
  const [escolaId, setEscolaId] = useState();
  const { turmaId } = useParams();
  //const { escolaId } = useParams();

  useEffect(() => {
    if (turmaId == 0) {
      return;
    } else {
      loadTurma(turmaId);
    }
  }, [turmaId]);

  useEffect(() => {
    getEscolas(setEscolas);
  });

  async function loadTurma(id) {
    try {
      const response = await api.get(`turma/findByID`, {
        params: { Id: id },
      });
      setId(response.data.turmaId);
      setCodigo(response.data.codigo);
    } catch (err) {
      alert("Erro ao receber informações de turma");
      navigator("/turmas");
    }
  }

  async function saveOrUpdate(e) {
    e.preventDefault();

    const data = {
      codigo,
    };

    try {
      if (turmaId == 0) {
        await api.post("/turma/create/", data);
      } else {
        data.turmaId = id;
        data.escolaId = escolaId;
        await api.put("/turma/update/", data);
      }
    } catch (error) {
      alert("Erro ao cadastrar turma");
    }
    navigator("/turmas");
  }

  return (
    <div className="new-turma-container">
      <div className="content">
        <section className="form">
          <img src={logoImage} alt="logo" />
          <h1>Cadastrar turma</h1>
          <p>Coloque as informações da turma e clique em 'Cadastrar'</p>
          <Link className="back-link" to="/turmas"></Link>
        </section>
        <form onSubmit={saveOrUpdate}>
          <select onChange={(e) => setEscolaId(e.target.value)}>
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
