import api from "./api";
export async function getTurmas(setTurmas) {
  try {
    const response = await api.get("turma/findAll");
    setTurmas(response.data);
  } catch (error) {
    alert("error etc");
  }
}

export async function getMateriasByTurma(setMaterias, id) {
  try {
    const response = await api.get(`turma/findByID/?Id=${id}`);
    setMaterias(response.data.materias);
  } catch (error) {
    alert("error etc");
  }
}

export async function getAlunosByTurma(setAlunos, id) {
  try {
    const response = await api.get(`turma/findByID/?Id=${id}`);
    setAlunos(response.data.alunos);
  } catch (error) {
    alert("error etc");
  }
}
