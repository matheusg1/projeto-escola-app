import StandardModal from "../components/StandardModal";
import React, { useState } from "react";


export const EscolaIsValid = (data) => {
    if (!data.nome) {
        alert("Insira um nome");
        return false
    }
    if (!data.endereco) {
        alert("Insira um endereço")
        return false;
    }
    return true
}

export const TurmaIsValid = (data) => {
    if (!data.escolaId) {
        alert("Selecione uma escola")
        return false;
    }
    if (!data.codigo) {
        alert("Codigo inválido")
        return false
    }

    return true
}

export const MateriaIsValid = (data) => {
    if (!data.nome) {
        alert("Insira um nome");    
        return false;
    }
    if(!data.professor){
        alert("Insira o nome do professor");        
        return false;
    }
    if(!data.turmaId){
        alert("Escolha uma turma");        
        return false;
    }

    return true
}

export const AlunoIsValid = (data) => {
    if (!data.nome) {
        alert("Insira um nome");
        return false;
    }
    if (!data.sobrenome) {
        alert("Insira um sobrenome");
        return false;
    }
    if (!data.cpf) {
        alert("Insira um CPF");
        return false;
    }
    if (!data.dataNascimento) {
        alert("Insira uma data de nascimento");
        return false;
    } 
    if (!data.turmaId) {
        alert("Selecione uma turma");
        return false;
    }
    return true
}