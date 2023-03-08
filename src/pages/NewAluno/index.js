import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEscolas, getTurmasByEscola } from "../../services/getEscolas";
import api from "../../services/api";

import logoImage from "../../assets/logo-favicon.svg";

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
        };

        try {
            if (alunoId == 0) {
                console.log(data);
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
        <div className="container">
            <div className="row mt-5">
                <div className="col">
                    <img src={logoImage} className="h-75" alt="logo" />
                    <h1>Cadastrar aluno</h1>
                    <p>Coloque as informações da aluno e clique em 'Cadastrar'</p>
                    <Link className="back-link" to="/alunos">
                        <button className="btn btn-dark btn-lg" type="button">Voltar</button>
                    </Link>
                </div>
                <div className="col">
                    <form onSubmit={saveOrUpdate} className="mt-3">
                        <select className="form-select form-select-lg mb-2"
                            onChange={(e) => {
                                getTurmasByEscola(setTurmas, e.target.value);
                                setEscolaId(e.target.value);
                            }
                            }
                        >
                            <option defaultValue hidden isdisabled="true">
                                Escola
                            </option>
                            {escolas.map((e) => (
                                <option key={e.escolaId} value={e.escolaId}>
                                    {e.nome}
                                </option>
                            ))}
                        </select>

                        <select className="form-select form-select-lg mb-2" onChange={(e) => setTurmaId(e.target.value)}>
                            <option defaultValue hidden>
                                Turma
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
                            <input type="text" className="form-control form-control-lg mb-2" placeholder="Matrícula"
                                value={matricula}
                                onChange={(e) => setNome(e.target.value)} disabled />
                        )}

                        <input type="text" className="form-control form-control-lg mb-2" placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} />

                        <input type="text" className="form-control form-control-lg mb-2" placeholder="Sobrenome"
                            value={sobrenome}
                            onChange={(e) => setSobrenome(e.target.value)} />

                        <input type="text" className="form-control form-control-lg mb-2" placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)} />

                        <input type="date" className="form-control form-control-lg mb-2"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)} />

                        <button className="btn btn-dark btn-lg w-100" type="submit">
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
        </div >
    );
}
