import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";
import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function NewEscola() {
  const [id, setId] = useState();
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const { escolaId } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if (escolaId == 0) {
      return;
    } else {
      loadEscola(escolaId);
    }
  }, [escolaId]);

  async function loadEscola(id) {
    try {
      const response = await api.get(`escola/findByID`, {
        params: { Id: id },
      });
      setId(response.data.escolaId);
      setNome(response.data.nome);
      setEndereco(response.data.endereco);
    } catch (err) {
      alert("Erro ao receber informações de escola");
      navigator("/escolas");
    }
  }

  async function saveOrUpdate(e) {
    e.preventDefault();

    const data = {    
      nome,
      endereco,
    };

    try {
      if (escolaId == 0) {
        await api.post("/escola/create/", data);
      } else {
        data.escolaId = id;
        await api.put("/escola/update/", data);
      }
    } catch (error) {
      alert("Erro ao cadastrar escola");
    }
    navigator("/escolas");
  }

  return (
    <div className="new-escola-container">
      <div className="content">
        <section className="form">
          <img src={logoImage} alt="logo" />
          <h1>Cadastrar Escola</h1>
          <p>Coloque as informações da escola e clique em 'Cadastrar'</p>
          <Link className="back-link" to="/escolas">
            <button>Voltar</button>
          </Link>
        </section>
        <form onSubmit={saveOrUpdate}>
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
          <button className="button" type="submit">
            Cadastrar / Alterar
          </button>
        </form>
      </div>
    </div>
  );
}
