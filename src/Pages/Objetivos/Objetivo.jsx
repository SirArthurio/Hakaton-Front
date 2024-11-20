import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerEvento } from "../../API/Data";

const FiltroObjetivo = () => {
  const { id } = useParams();
  const [objetivo, setObjetivos] = useState([]);

  useEffect(() => {
    const fetchObjetivos = async () => {
      const data = await obtenerEvento(id);
      setObjetivos(data);
    };

    fetchObjetivos();
  }, []);

  return (
    <div>
      {objetivo ? (
        <div className="flex-col justify-items-center ">
          <h2 className="text-center">{objetivo.name}</h2>

          <div className="justify-items-center  w-11/12	m-4 p-4 bg-emerald-100		rounded-lg		">
            <div className="flex flex-wrap">
              <p className="ml-2">{objetivo.nombre}</p>
            </div>

            <p>{objetivo.descripcion}</p>
          </div>
        </div>
      ) : (
        <p>Objetivo no encontrado</p>
      )}
    </div>
  );
};

export const Evento = () => {
  return (
    <div className="flex flex-col	justify-items-center			">
      <h2 className="text-center">Objetivo</h2>
      <FiltroObjetivo />
    </div>
  );
};
