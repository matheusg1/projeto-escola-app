import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEscolas, getTurmasByEscola } from "../../services/getEscolas";
import api from "../../services/api";

import logoImage from "../../assets/logo-favicon.svg";
import StandardInput from "../../components";

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
            <div className="row">
                <div className="my-5 d-none d-sm-block"></div>
                <div className="col d-flex justify-content-center flex-column">
                    <img src={logoImage} className="h-75" alt="logo" />
                    <h1>Cadastrar matéria</h1>
                    <p>Coloque as informações da matéria e clique em 'Cadastrar'</p>
                </div>
                <div className="col d-flex justify-content-center flex-column">
                    <form onSubmit={createMateria}>
                        <select className="form-select form-select-lg mb-3"
                            onChange={(e) => getTurmasByEscola(setTurmas, e.target.value)}>
                            <option defaultValue hidden isdisabled="true">
                                Escola
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

                        <StandardInput className="form-control form-control-lg mb-3"
                            placeholder="Nome da matéria"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} />

                        <StandardInput className="form-control form-control-lg mb-3"
                            placeholder="Professor"
                            value={professor}
                            onChange={(e) => setProfessor(e.target.value)} />

                        <button className="btn btn-dark btn-lg w-100" type="submit">
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
            <div className="row my-1">
                <div className="col">
                    <Link className="back-link" to="/materias">
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