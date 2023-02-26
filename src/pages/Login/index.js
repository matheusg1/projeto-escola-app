import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
/*
import {useHistory} from 'react-router-dom';
import api from '../../services/api'
*/
import "./styles.css";
import logoImage from "../../assets/logo.svg";
import padlock from "../../assets/padlock.png";

export default function Login() {
  /*const [userName, setUserName] = useState('');
    const [password, setpassword] = useState('');

    const history = useHistory();*/

  return (
    <>
      <div>
        <Link to="/escolas">Escolas</Link>
        <Link to="/turmas">Turmas</Link>
        <Link to="/materias">Matérias</Link>
        <Link to="/alunos">Alunos</Link>
        <p>asdads</p>
      </div>
      <div className="login-container">
        <section className="form">
          <img src={logoImage} alt="logo" />
        </section>
        <img src={padlock} alt="login" />
      </div>
    </>
  );
}
