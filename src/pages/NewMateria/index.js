import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getEscolas, getTurmasByEscola } from "../../services/getEscolas";
import api from "../../services/api";

import logoImage from "../../assets/logo-favicon.svg";
import StandardInput from "../../components/StandardInput";
import StandardSelect from "../../components/StandardSelect";
import StandardModal from "../../components/StandardModal"
import { MateriaIsValid } from "../../services/validations";

export default function NewMateria() {
    const [turmas, setTurmas] = useState();
    const [escolas, setEscolas] = useState([]);

    const [nome, setNome] = useState("");
    const [professor, setProfessor] = useState("");
    const [turmaId, setTurmaId] = useState();

    const [smShow, setSmShow] = useState(false);    


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
            if (!MateriaIsValid(data)) {
                console.log(smShow);
                setSmShow(true)
                return;
            }

            await api.post("/Materia/create", data);
        } catch (error) {
            alert("Erro ao cadastrar matéria");
        }
        navigator("/materias");
    }
    return (
        <div className="container">
            <div className="row">
                <StandardModal 
                smShow={false}
                title="modaltitulo"
                body="modalbody"
                onHide={() => setSmShow(false)}/>

                <div className="my-5 d-none d-sm-block"></div>
                <div className="col d-flex justify-content-center flex-column">
                    <img src={logoImage} className="h-75" alt="logo" />
                    <h1>Cadastrar matéria</h1>
                    <p>Coloque as informações da matéria e clique em 'Cadastrar'</p>
                </div>
                <div className="col d-flex justify-content-center flex-column">
                    <form onSubmit={createMateria}>

                        <StandardSelect
                            onChange={(e) => getTurmasByEscola(setTurmas, e.target.value)}>
                            <option defaultValue hidden isdisabled="true">
                                Escola
                            </option>
                            {escolas.map((e) => (
                                <option key={e.escolaId} value={e.escolaId}>
                                    {e.nome}
                                </option>
                            ))}
                        </StandardSelect>

                        <StandardSelect
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
                        </StandardSelect>

                        <StandardInput
                            placeholder="Nome da matéria"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} />

                        <StandardInput
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