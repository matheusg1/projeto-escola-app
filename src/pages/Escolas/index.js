import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEscolas } from "../../services/getEscolas";
import api from "../../services/api";

import Button from 'react-bootstrap/Button';

import logoImage from "../../assets/logo-favicon.svg";


export default function Escolas() {
    const [escolas, setEscolas] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getEscolas(setEscolas);
    }, []);

    async function deleteEscola(id) {
        try {
            await api.delete(`escola/delete/`, {
                params: { Id: id },
            });
            setEscolas(escolas.filter((e) => e.escolaId != id));
        } catch (error) {
            alert("Erro ao excluir escola");
        }
    }
    async function editEscola(id) {
        try {
            navigator(`/escola/new/${id}`)
        } catch (error) {
            alert("Erro ao editar escola");
        }
    }

    return (
        <div className="mt-3 mx-md-5">
            <header className="d-flex flex-row align-items-center justify-content-between">
                <img src={logoImage} style={{ height: "70px" }} alt="logo" />
                <h2 className="px-4">
                    Bem vindo!
                </h2>
                <Link className="btn btn-dark btn-lg me-1 me-md-0 rounded-1" style={{ width: "300px" }} to="/escola/new/0">
                    Cadastrar nova escola
                </Link>
            </header>
            <h1 className="mt-5">Escolas registradas</h1>
            <div className="table-responsive">
                <table className="table table-hover table-bordered table-striped table-dark mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Endereço</th>
                            <th scope="col">Qtd Turmas</th>
                            <th scope="col">Alterar / Apagar</th>
                        </tr>
                    </thead>
                    <tbody>

                        {escolas.map((e) => (
                            <tr key={e.escolaId}>
                                <td>{e.nome}</td>
                                <td>{e.endereco}</td>
                                <td>{e.quantidadeTurmas}</td>
                                <td className="d-flex justify-content-evenly">
                                    <Button className="my-1" variant="outline-primary" onClick={() => editEscola(e.escolaId)}>Editar</Button>{' '}
                                    <Button variant="outline-danger" onClick={() => deleteEscola(e.escolaId)}>Apagar</Button>{' '}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}
/*

      <h1>Escolas registradas</h1>
      <ul>
        {escolas.map((e) => (
          <li key={e.escolaId}>
            <strong>{e.nome}</strong>
            <p>{e.endereco}</p>
            <Button variant="outline-primary" onClick={() => editEscola(e.escolaId)}>Editar</Button>{' '}
            <Button variant="outline-danger" onClick={() => deleteEscola(e.escolaId)}>Apagar</Button>{' '}
          </li>
        ))}
      </ul>










      <ul>
        <Container>
          {escolas.map((e) => (
            <Row sm={8}>
              <Col>
                <li key={e.escolaId}>
                  <strong>Nome</strong>
                  <p>{e.nome}</p>
                  <strong>Endereço</strong>
                  <p>{e.endereco}</p>
                  <Button variant="outline-primary" onClick={() => editEscola(e.escolaId)}>Editar</Button>{' '}
                  <Button variant="outline-danger" onClick={() => deleteEscola(e.escolaId)}>Apagar</Button>{' '}
                </li>
              </Col>
            </Row>
          ))}
        </Container>
      </ul>



        {escolas.map((e) => {
          { Grid1(e) }
          <>
            <button type="button" onClick={() => editEscola(e.escolaId)}>Editar</button>
            <button type="button" onClick={() => deleteEscola(e.escolaId)}>Apagar</button>
          </>
        })}




          <button type="button" onClick={() => editEscola(e.escolaId)}>Editar</button>
          <button type="button" onClick={() => deleteEscola(e.escolaId)}>Apagar</button>


      <ul>
        {escolas.map((e) => (
          <li key={e.escolaId}>
            <strong>{e.nome}</strong>
            <p>{e.endereco}</p>
            <Button variant="outline-primary" onClick={() => editEscola(e.escolaId)}>Editar</Button>{' '}
            <Button variant="outline-danger" onClick={() => deleteEscola(e.escolaId)}>Apagar</Button>{' '}
          </li>
        ))}
      </ul>
*/