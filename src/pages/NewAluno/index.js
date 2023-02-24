import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../../services/api'
import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function NewAluno() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setdataNascimento] = useState('');

    const navigator = useNavigate();

    async function createAluno(e) {
        e.preventDefault();

        const data = {
            nome,
            sobrenome,
            cpf,
            dataNascimento
        }
        
        //const accessToken = localStorage.getItem('accessToken');
        
        try {
            await api.post('/Aluno/Create', data
            /*
            , {            
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
                
            }*/
            )
        } catch (error) {
            alert("Erro ao cadastrar aluno")
        }
        navigator('/alunos')
    }

    return (
        <div className="new-aluno-container">
            <div className="content">
                <section className="form">
                    <img src={logoImage} alt="logo" />
                    <h1>Cadastrar aluno</h1>
                    <p>Coloque as informações da aluno e clique em 'Cadastrar'</p>
                    <Link className="back-link" to="/alunos">

                    </Link>
                </section>
                <form onSubmit={createAluno}>
                    <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                    <input placeholder="Sobrenome" value={sobrenome} onChange={e => setSobrenome(e.target.value)} />
                    <input placeholder="Cpf" value={cpf} onChange={e => setCpf(e.target.value)} />
                    <input placeholder="dataNascimento" type="date" value={dataNascimento} onChange={e => setdataNascimento(e.target.value)} />
                    
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}