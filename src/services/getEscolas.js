import api from './api';

export async function getTurmasByEscola(setTurmas, id) {
    try {
        //, { params: { Id: id } }
        const response = await api.get(`escola/findByID/?Id=${id}`);
        setTurmas(response.data.turmas);
    } catch (error) {
        alert("Falha ao buscar turmas");
    }
}

export async function getEscolas(setEscolas) {
    try {
        const response = await api.get("escola/findAll");
        setEscolas(response.data);
    } catch (error) {
        alert("Falha ao buscar escolas");
    }
}