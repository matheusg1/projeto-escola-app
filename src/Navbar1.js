import React from "react";
import "bootstrap/dist/css/bootstrap.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//import Alert from "react-bootstrap/Alert";
export default function Navbar1() {
    return (
        <>
        <Navbar bg="secondary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Jurema Sistemas</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/escolas">Escolas</Nav.Link>
            <Nav.Link href="/turmas">Turmas</Nav.Link>
            <Nav.Link href="/materias">Matérias</Nav.Link>
            <Nav.Link href="/alunos">Alunos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

            
        </>
    );
}/*
<nav className="nav">
                <ul>
                    <li>
                        <a href="/escolas">Escolas</a>
                    </li>
                    <li>
                        <a href="/turmas">Turmas</a>
                    </li>
                    <li>
                        <a href="/materias">Matérias</a>
                    </li>
                    <li>
                        <a href="/alunos">Alunos</a>
                    </li>
                </ul>
            </nav>

*/