import api from './api';
export async function getTurmas(setTurmas) {
  try {
    const response = await api.get("turma/findAll");
    setTurmas(response.data);
  } catch (error) {
    alert("error etc");
  }
}