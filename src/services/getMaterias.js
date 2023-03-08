import api from "./api";
export async function getMaterias(setMaterias) {
    try {
        const response = await api.get("materia/findAll");
        setMaterias(response.data);
    } catch (error) {
        alert("Falha ao buscar matérias");
    }
}
