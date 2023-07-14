import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

import logoImage from "../../assets/logo-favicon.svg";
import StandardInput from "../../components/StandardInput";
import { EscolaIsValid } from "../../services/validations";

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
            if (!EscolaIsValid(data)) return

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
                <div className="row my-xxl-5 ">
                    <div className="col d-flex justify-content-center flex-column">
                        <img src={logoImage} className="h-75" alt="logo" />
                        <h1>Cadastrar escola</h1>
                        <p>Coloque as informações da escola e clique em 'Cadastrar'</p>
                        <Link className="back-link d-none d-sm-block" to="/escolas">
                            <button className="btn btn-dark btn-lg" type="button">Voltar</button>
                        </Link>
                    </div>
                    <div className="col d-flex justify-content-center flex-column">
                        <form onSubmit={saveOrUpdate} className="">

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
                        <Link className="back-link d-block my-1 d-sm-none" to="/escolas">
                            <button className="btn btn-dark btn-lg w-100 bg-secondary" type="button">Voltar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}