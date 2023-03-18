import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

import logoImage from "../../assets/logo-favicon.svg";
import StandardInput from "../../components";

export default function NewEscola() {
    const [id, setId] = useState();
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [palavraBotao, setPalavraBotao] = useState("Cadastrar")

    const { escolaId } = useParams();

    const navigator = useNavigate();

    useEffect(() => {
        if (escolaId == 0) {
            return;
        } else {
            loadEscola(escolaId);
            setPalavraBotao("Alterar")
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
        <>
            <div className="container">
                <div className="row">
                    <div className="my-5 d-none d-sm-block"></div>
                    <div className="col d-flex justify-content-center flex-column">
                        <img src={logoImage} className="h-75" alt="logo" />
                        <h1>Cadastrar escola</h1>
                        <p>Coloque as informações da escola e clique em 'Cadastrar'</p>
                    </div>
                    <div className="col d-flex justify-content-center flex-column">
                        <form onSubmit={saveOrUpdate} className="mt-5">

                            <StandardInput type="text" placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)} />

                            <StandardInput type="text" placeholder="Endereço"
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)} />
                                
                            <button className="btn btn-dark btn-lg w-100" type="submit">
                                {palavraBotao}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row my-1">
                    <div className="col">
                        <Link className="back-link" to="/escolas">
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
        </>
    );
}
