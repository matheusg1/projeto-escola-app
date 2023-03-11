import React from "react";
import "bootstrap/dist/css/bootstrap.css"

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './global.css';
import logoImage from "./assets/logo-favicon.svg";
//import Alert from "react-bootstrap/Alert";
export default function AppNavbar() {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="sm">
                <Container fluid>
                    <Navbar.Brand href="/"><img src={logoImage} style={{ height: "40px" }} className="me-2"></img>
                        <span className="titulo">Jurema Sistemas</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Nav.Link href="/escolas">Escolas</Nav.Link>
                            <Nav.Link href="/turmas">Turmas</Nav.Link>
                            <Nav.Link href="/materias">Matérias</Nav.Link>
                            <Nav.Link href="/alunos">Alunos</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}