import api from "./api";
export async function getTurmas(setTurmas) {
  try {
    const response = await api.get("turma/findAll");
    setTurmas(response.data);
  } catch (error) {
    alert("error etc");
  }
}

export async function getAlunosByTurma(setAlunos, id) {
  //, { params: { Id: id } }
  try {
    const response = await api.get(`turma/findByID/?Id=${id}`);
    setAlunos(response.data.alunos);
  } catch (error) {
    alert("error etc");
  }
}
