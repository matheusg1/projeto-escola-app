import React from "react";
import "bootstrap/dist/css/bootstrap.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//import Alert from "react-bootstrap/Alert";
export default function Navbar1() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
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
}