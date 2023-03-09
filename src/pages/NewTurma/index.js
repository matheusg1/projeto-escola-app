import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEscolas } from "../../services/getEscolas";
import api from "../../services/api";

import logoImage from "../../assets/logo-favicon.svg";

export default function NewTurma() {
    const [escolas, setEscolas] = useState([]);

    const [id, setId] = useState();
    const [codigo, setCodigo] = useState("");
    const [escolaId, setEscolaId] = useState();
    const { turmaId } = useParams();
    const navigator = useNavigate();
    const selectRef = useRef();

    useEffect(() => {
        if (turmaId == 0) {
            return;
        } else {
            loadTurma(turmaId);
        }
    }, [turmaId]);

    useEffect(() => {
        getEscolas(setEscolas);
    }, []);

    async function loadTurma(id) {
        try {
            const response = await api.get(`turma/findByID`, {
                params: { Id: id },
            });
            setId(response.data.turmaId);
            setCodigo(response.data.codigo);
            setEscolaId(response.data.escolaId)
            const select = selectRef.current;
            select.value = response.data.escolaId
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
                data.escolaId = escolaId
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
        <div className="container">
            <div className="row mt-5">
                <div className="col">

                        <img src={logoImage} className="h-75" alt="logo" />
                        <h1>Cadastrar turma</h1>
                        <p>Coloque as informações da turma e clique em 'Cadastrar'</p>
                        <Link className="back-link" to="/turmas">
                            <button className="btn btn-dark btn-lg" type="button">Voltar</button>
                        </Link>
                    </div>
                <div className="col">
                    <form onSubmit={saveOrUpdate} className="mt-5">
                        <select className="form-select form-select-lg mb-3" ref={selectRef} onChange={(e) => setEscolaId(e.target.value)}>
                            {escolas.map((e) => (
                                <option key={e.escolaId} value={e.escolaId}>
                                    {e.nome}
                                </option>
                            ))}
                            )
                        </select>
                        <input type="text" placeholder="Código"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            className="form-control form-control-lg mb-3" />
                        <button className="btn btn-dark btn-lg w-100" type="submit">
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
