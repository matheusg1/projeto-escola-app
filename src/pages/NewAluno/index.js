import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEscolas, getTurmasByEscola } from "../../services/getEscolas";
import api from "../../services/api";

import StandardInput from "../../components";

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
    const [palavraBotao, setPalavraBotao] = useState("Cadastrar");

    const { alunoId } = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        if (alunoId == 0) {
            return;
        } else {
            loadAluno(alunoId);
            setPalavraBotao("Alterar")
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
            <div className="row">
                <div className="my-5 d-none d-sm-block"></div>
                <div className="col d-flex justify-content-center flex-column">
                    <img src={logoImage} className="h-75" alt="logo" />
                    <h1>Cadastrar aluno</h1>
                    <p>Coloque as informações da aluno e clique em 'Cadastrar'</p>
                </div>
                <div className="col d-flex justify-content-center flex-column">
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
                            <StandardInput type="text" placeholder="Matrícula" value={matricula}
                            onChange={(e) => setMatricula(e.target.value)} disabled={true}/>
                        )}

                        <StandardInput type="text" placeholder="Nome" value={nome}
                            onChange={(e) => setNome(e.target.value)} />

                        <StandardInput type="text" placeholder="Sobrenome" value={sobrenome}
                            onChange={(e) => setSobrenome(e.target.value)} />

                        <StandardInput type="text" placeholder="CPF" value={cpf}
                            onChange={(e) => setCpf(e.target.value)} />
                        
                        <StandardInput type="date" placeholder="CPF" value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)} />

                        <button className="btn btn-dark btn-lg w-100" type="submit">
                            {palavraBotao}
                        </button>
                    </form>
                </div>
            </div>
            <div className="row my-1">
                <div className="col">
                    <Link className="back-link" to="/alunos">
                        <div className="d-none d-sm-block">
                            <button className="btn btn-dark btn-lg" type="button">Voltar</button>
                        </div>
                        <div className="d-block d-sm-none">
                            <button className="btn btn-dark btn-lg w-100" type="button">Voltar</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
