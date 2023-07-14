import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEscolas, getTurmasByEscola } from "../../services/getEscolas";
import { getMateriasByTurma } from "../../services/getTurmas";
import api from "../../services/api";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';

import logoImage from "../../assets/logo-favicon.svg";

export default function Materias() {
    const [materias, setMaterias] = useState([]);
    const [turma, setTurma] = useState("Turma");
    const [turmas, setTurmas] = useState([]);
    const [escola, setEscola] = useState("Escola");
    const [escolas, setEscolas] = useState([]);

    useEffect(() => {
        getEscolas(setEscolas);
    }, []);

    async function deleteMateria(id) {
        try {
            await api.delete(`materia/delete/`, {
                params: { Id: id },
            });
            setMaterias(materias.filter((m) => m.materiaId !== id));
        } catch (error) {
            alert("Erro ao excluir matéria");
        }
    }

    const handleSelectEscola = (e) => {
        setMaterias([]);
        let escolaInfo = e.split(",");
        getTurmasByEscola(setTurmas, escolaInfo[0]);
        setEscola(escolaInfo[1]);
    }

    const handleSelectTurma = (e) => {
        let turmaInfo = e.split(",");
        setTurma(turmaInfo[1]);
        getMateriasByTurma(setMaterias, turmaInfo[0]);
    }

    return (
        <div className="mt-3 mx-md-5">
            <header className="d-flex flex-row align-items-center justify-content-between">
                <img src={logoImage} style={{ height: "70px" }} alt="logo" />
                <h2 className="px-4">
                    Bem vindo!
                </h2>
                <Link className="btn btn-dark btn-lg me-1 me-md-0 rounded-1" to="/materia/new/0">
                    Cadastrar nova matéria
                </Link>
            </header>
            <h1 className="mt-5">Matérias</h1>
            <div className="d-flex flex-row">
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
            {materias.length > 0 &&
                <table className="table table-hover table-bordered table-striped table-dark mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Escola</th>
                            <th scope="col">Turma</th>
                            <th scope="col">Matéria</th>
                            <th scope="col">Professor</th>
                            <th scope="col">Alterar / Apagar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materias.map((m) => (
                            <tr key={m.materiaId}>
                                <td>{escola}</td>
                                <td>{turma}</td>
                                <td>{m.nome}</td>
                                <td>{m.professor}</td>
                                <td className="text-center">
                                    <Button className="my-1 my-sm-0" variant="outline-danger" onClick={() => deleteMateria(m.materiaId)}>Apagar</Button>{' '}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div >
    );
}
