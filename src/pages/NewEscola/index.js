import React from 'react';
import {Link} from 'react-router-dom';

import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function NewEscola(){
    return(
        <div className="new-escola-container">
            <div className="content">
                <section className="form">
                    <img src={logoImage} alt="logo"/>
                    <h1>Cadastrar Escola</h1>
                    <p>Coloque as informações da escola e clique em 'Cadastrar'</p>
                    <Link className="back-link" to="/escolas">

                    </Link>
                </section>
                <form>
                    <input placeholder="Nome"/>
                    <input placeholder="Endereço"/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>        
    )    
}