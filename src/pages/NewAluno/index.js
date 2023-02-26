import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEscolas, getTurmasByEscola } from "../../services/getEscolas";

import api from "../../services/api";
import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function NewAluno() {
  const [turmas, setTurmas] = useState();
  const [escolas, setEscolas] = useState([]);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [turmaId, setTurmaId] = useState("");
  const [escolaId, setEscolaId] = useState("");
  
  useEffect(() => {
    getEscolas(setEscolas);
  }, []);

  const navigator = useNavigate();

  async function createAluno(e) {
    e.preventDefault();

    const data = {
      nome,
      sobrenome,
      cpf,
      dataNascimento,
      turmaId,
    };

    //const accessToken = localStorage.getItem('accessToken');

    try {
      await api.post(
        "/Aluno/Create",
        data
        /*
            , {            
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
                
            }*/
      );
    } catch (error) {
      alert("Erro ao cadastrar aluno");
    }
    navigator("/alunos");
  }

  return (
    <div className="new-aluno-container">
      <div className="content">
        <section className="form">
          <img src={logoImage} alt="logo" />
          <h1>Cadastrar aluno</h1>
          <p>Coloque as informações da aluno e clique em 'Cadastrar'</p>
          <Link className="back-link" to="/alunos"></Link>
        </section>
        <form onSubmit={createAluno}>
            
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
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            placeholder="Sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />
          <input
            placeholder="Cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            placeholder="dataNascimento"
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}