import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { getEscolas, getTurmasByEscola } from "../../services/getEscolas";

import api from "../../services/api";
import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function NewAluno() {
  const [turmas, setTurmas] = useState();
  const [escolas, setEscolas] = useState([]);

  const [id, setId] = useState();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [matricula, setMatricula] = useState("");
  const [escolaId, setEscolaId] = useState("");
  const [turmaId, setTurmaId] = useState("");
  const { alunoId } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (alunoId == 0) {
      return;
    } else {
      loadAluno(alunoId);
    }
  }, [alunoId]);

  useEffect(() => {
    getEscolas(setEscolas);
  }, []);

  async function loadAluno(id) {
    try {
      const response = await api.get(`aluno/findByID`, {
        params: { Id: id },
      });

      let dataFormatada = response.data.dataNascimento.split("T", 10)[0];

      setId(response.data.alunoId);
      setNome(response.data.nome);
      setSobrenome(response.data.sobrenome);
      setCpf(response.data.cpf);
      setDataNascimento(dataFormatada);
      setEscolaId(response.data.escolaId);
      setTurmaId(response.data.turmaId);
      setMatricula(response.data.matricula);
    } catch (err) {
      alert("Erro ao receber informações do aluno");
      navigator("/alunos");
    }
  }

  async function saveOrUpdate(e) {
    e.preventDefault();

    const data = {
      nome,
      sobrenome,
      cpf,
      dataNascimento,
      escolaId,
      turmaId,
      matricula,
    };

    try {
      if (alunoId == 0) {
        await api.post("/aluno/create/", data);
      } else {
        data.alunoId = id;
        data.turmaId = turmaId;
        data.escolaId = escolaId;
        data.matricula = matricula;
        await api.put("/aluno/update/", data);
      }
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
          <Link className="back-link" to="/alunos">
            <button>Voltar</button>
          </Link>
        </section>
        <form onSubmit={saveOrUpdate}>
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
          {matricula && (
            <input
              placeholder="Matrícula"
              value={matricula}
              onChange={(e) => setNome(e.target.value)}
              disabled
            />
          )}

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
