import api from './api';

export async function getTurmasByEscola(setTurmas, id) {
  try {
    const response = await api.get(`escola/findByID/?Id=${id}`);
    setTurmas(response.data.turmas);
  } catch (error) {
    alert("error etc");
  }
}

export async function getEscolas(setEscolas) {
  try {
    const response = await api.get("escola/findAll");
    setEscolas(response.data);
  } catch (error) {
    alert("error etc");
  }
}