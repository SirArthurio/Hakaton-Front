import axios from "axios";



const API_URL_PRoyectos = "http://localhost:3001/proyecto/getAll";
const API_DOCENTES ="http://localhost:3001/docente/getAll"



export const obtenerProyectos = async () => {
  try {
    const res = await axios.get(API_URL_PRoyectos);
    return res.data;
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    return [];  
  }
}
export const obtenerObjetivos = async () => {
  try {
    const res = await axios.get("");
    return res.data;
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    return [];  
  }
}

export const obtenerDocentes = async () => {
  try {
    const res = await axios.get(API_DOCENTES);
    return res.data;
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    return [];  
  }
}



//proyctos



