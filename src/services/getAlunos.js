import api from './api';

export async function getAlunos(setAlunos) {
    try {
        const response = await api.get("aluno/findAll");
        setAlunos(response.data);
    } catch (error) {
        alert("Falha ao buscar alunos");
    }
}