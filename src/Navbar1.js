import React from "react";
import "bootstrap/dist/css/bootstrap.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './global.css';
import logoImage from "./assets/logo-favicon.svg";
//import Alert from "react-bootstrap/Alert";
export default function Navbar1() {
    return (
        <>
            <Navbar bg="light" variant="dark">
                <Container>
                    <Navbar.Brand href="#home"><img src={logoImage} style={{ height: "40px" }} className="me-2"></img>
                    <span className="titulo">Jurema Sistemas</span>
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="/escolas"><span>Escolas</span></Nav.Link>
                        <Nav.Link href="/turmas"><span>Turmas</span></Nav.Link>
                        <Nav.Link href="/materias"><span>Matérias</span></Nav.Link>
                        <Nav.Link href="/alunos"><span>Alunos</span></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}