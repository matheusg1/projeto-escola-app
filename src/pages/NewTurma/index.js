import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEscolas } from "../../services/getEscolas";
import api from "../../services/api";

import logoImage from "../../assets/logo-favicon.svg";
import StandardInput from "../../components/StandardInput";
import { TurmaIsValid } from "../../services/validations";


export default function NewTurma() {
    const [escolas, setEscolas] = useState([]);

    const [id, setId] = useState();
    const [codigo, setCodigo] = useState();
    const [escolaId, setEscolaId] = useState();
    const [palavraBotao, setPalavraBotao] = useState("Cadastrar")

    const { turmaId } = useParams();
    const navigator = useNavigate();
    const selectRef = useRef();

    useEffect(() => {
        if (turmaId == 0) {
            return;
        } else {
            loadTurma(turmaId);
            setPalavraBotao("Alterar")
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
            codigo
        };

        try {
            data.escolaId = escolaId
            if (!TurmaIsValid(data)) {
                return;
            }

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
        <div className="container">
            <div className="row">
                <div className="col d-flex justify-content-center flex-column">
                    <img src={logoImage} className="h-75" alt="logo" />
                    <h1>Cadastrar turma</h1>
                    <p>Coloque as informações da turma e clique em 'Cadastrar'</p>
                    <Link className="back-link d-none d-sm-block" to="/turmas">
                        <button className="btn btn-dark btn-lg" type="button">Voltar</button>
                    </Link>
                </div>
                <div className="col d-flex justify-content-center flex-column">
                    <form onSubmit={saveOrUpdate}>
                        <select className="form-select form-select-lg mb-3" ref={selectRef} onChange={(e) => setEscolaId(e.target.value)}>
                            <option defaultValue hidden isdisabled="true">
                                Escola
                            </option>
                            {escolas.map((e) => (
                                <option key={e.escolaId} value={e.escolaId}>
                                    {e.nome}
                                </option>
                            ))}
                            )
                        </select>

                        <StandardInput type="text"
                            placeholder="Código"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                        <button className="btn btn-dark btn-lg w-100" type="submit">
                            {palavraBotao}
                        </button>
                    </form>
                    <Link className="back-link d-block my-1 d-sm-none" to="/turmas">
                        <button className="btn btn-dark btn-lg w-100 bg-secondary" type="button">Voltar</button>
                    </Link>
                </div>
            </div>
        </div >
    );
}