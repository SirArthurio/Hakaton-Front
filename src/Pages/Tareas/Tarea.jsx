import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerTarea } from "../../API/Data";


const FiltroTarea = () => {
  const { id } = useParams();
  const [tarea, setTarea] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      const data = await obtenerTarea(id);
      setTarea(data);
    };

    fetchTareas();
  }, []);

  return (
    <div>
      {tarea ? (
        <div className="flex-col justify-items-center ">
          <h2 className="text-center">{tarea.name}</h2>

          <div className="justify-items-center  w-11/12	m-4 p-4 bg-emerald-100		rounded-lg		">
            <div className="flex flex-wrap">
              <p className="ml-2">{tarea.IdColaborador}</p>
            </div>
            <div className="flex flex-wrap">
              <p className="ml-2">{tarea.IdEstadoTarea}</p>
            </div>
            <p>{tarea.description}</p>
          </div>
        </div>
      ) : (
        <p>tarea no encontrado</p>
      )}
    </div>
  );
};

export const Tarea = () => {
  return (
    <div className="flex flex-col	justify-items-center			">
      <h2 className="text-center">Tarea</h2>
      <FiltroTarea />
    </div>
  );
};
