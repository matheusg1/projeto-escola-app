import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAlunosByTurma } from "../../services/getTurmas";
import { getEscolas, getTurmasByEscola } from "../../services/getEscolas";
import api from "../../services/api";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';

import logoImage from "../../assets/logo-favicon.svg";

export default function Alunos() {
    const [alunos, setAlunos] = useState([]);
    const [turmas, setTurmas] = useState([]);

    const [escolas, setEscolas] = useState([]);
    const [escolaId, setEscolaId] = useState("");
    const [escola, setEscola] = useState("Escola");
    const [turma, setTurma] = useState("Turma");
    const [turmaId, setTurmaId] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getEscolas(setEscolas, escolas);
    }, []);

    async function deleteAluno(id) {
        try {
            await api.delete(`aluno/delete/`, {
                params: { Id: id },
            });
            setAlunos(alunos.filter((a) => a.alunoId != id));
        } catch (error) {
            alert("Erro ao excluir aluno");
        }
    }

    async function editAluno(id) {
        try {
            navigator(`/aluno/new/${id}`);
        } catch (error) {
            alert("Erro ao editar informações do aluno");
        }
    }

    const handleSelectEscola = (e) => {
        setAlunos([])
        let escolaInfo = e.split(",");
        getTurmasByEscola(setTurmas, escolaInfo[0]);
        setEscola(escolaInfo[1]);

    }

    const handleSelectTurma = (e) => {
        let turmaInfo = e.split(",");
        setTurma(turmaInfo[1]);
        getAlunosByTurma(setAlunos, turmaInfo[0]);
    }

    return (
        <div className="mt-3 mx-md-5">
            <header className="d-flex flex-row align-items-center justify-content-between">
                <img src={logoImage} style={{ height: "70px" }} alt="logo" />
                <h2 className="px-4">
                    Bem vindo!
                </h2>
                <Link className="btn btn-dark btn-lg me-1 me-md-0 rounded-1" to="/aluno/new/0">
                    Cadastrar novo aluno
                </Link>
            </header>
            <h1 className="mt-5">Alunos</h1>

            <div className="d-flex">
                <DropdownButton className="me-2" id="dropdown-basic-button" variant="dark" size="lg" title={escola} onSelect={handleSelectEscola
                }>
                    {escolas &&
                        escolas.map((e) => (
                            <Dropdown.Item eventKey={[e.escolaId, e.nome]} key={e.escolaId} value={e.turmaId}>{e.nome}</Dropdown.Item>
                        ))}
                </DropdownButton>

                <DropdownButton id="dropdown-basic-button" variant="dark" size="lg" title={turma} onSelect={handleSelectTurma
                }>
                    {turmas &&
                        turmas.map((t) => (
                            <Dropdown.Item eventKey={[t.turmaId, t.codigo]} key={t.turmaId} value={t.turmaId}>{t.codigo}</Dropdown.Item>
                        ))}
                </DropdownButton>
            </div>
            {alunos.length > 0 &&
                <table className="table table-hover table-bordered table-striped table-dark mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Matrícula</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Sobrenome</th>
                            <th scope="col">CPF</th>
                            <th scope="col">Nascimento</th>
                            <th scope="col">Alterar / Apagar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunos.map((a) => (
                            <tr key={a.alunoId}>
                                <td>{a.matricula}</td>
                                <td>{a.nome}</td>
                                <td>{a.sobrenome}</td>
                                <td>{a.cpf}</td>
                                <td>{Intl.DateTimeFormat("pt-BR").format(new Date(a.dataNascimento))}</td>
                                <td className="text-center">
                                    <Button className="my-1 my-sm-0" variant="outline-primary" onClick={() => editAluno(a.alunoId)}>Editar</Button>{' '}
                                    <Button variant="outline-danger" onClick={() => deleteAluno(a.alunoId)}>Apagar</Button>{' '}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}

/*
<select onChange={(e) => {
        getTurmasByEscola(setTurmas, e.target.value);
        setAlunos([])
      }}>
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

      <select onChange={(e) => getAlunosByTurma(setAlunos, e.target.value)}>
        <option defaultValue hidden>
          Turmas
        </option>
        {turmas &&
          turmas.map((t) => (
            <option key={t.turmaId} value={t.turmaId}>
              {t.codigo}
            </option>
          ))}
        )
      </select>
      <ul>
        {alunos.map((a) => (
          <li key={a.alunoId}>
            <strong>Matrícula</strong>
            <p>{a.matricula}</p>
            <strong>Nome</strong>
            <p>{a.nome}</p>
            <strong>Sobrenome</strong>
            <p>{a.sobrenome}</p>
            <strong>CPF</strong>
            <p>{a.cpf}</p>
            <strong>Data de nascimento</strong>
            <p>
              {Intl.DateTimeFormat("pt-BR").format(new Date(a.dataNascimento))}
            </p>
            <Button variant="outline-primary" onClick={() => editAluno(a.alunoId)}>Editar</Button>{' '}
            <Button variant="outline-danger" onClick={() => deleteAluno(a.alunoId)}>Apagar</Button>{' '}
          </li>
        ))}



*/