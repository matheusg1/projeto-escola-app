import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
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
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link>
                        <img id="img-logo" className="ms-lg-4" height="40px" src={logoImage} />
                    </Link>
                    <Link className="navbar-brand  mx-0 ps-lg-3" to="/">Instituto Jurema de Ensino</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-white" aria-current="page" to="/escolas">Escolas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/materias">Matérias</Link>
                            </li>
                            <li className="nav-item  text-light">
                                <Link className="nav-link text-white" to="/turmas">Turmas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/alunos">Alunos</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}