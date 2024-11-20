import React, { useState, useEffect } from "react";
import { obtenerEventos } from "../../API/Data";
import { Carta } from "../../components/Card";

function Tareas() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      const data = await obtenerEventos();
      setTareas(data);
    };

    fetchTareas();
  }, []);

  if (tareas.length === 0) {
    return <p>No hay tareas disponibles.</p>;
  }

  return (
    <div>
      <div className="h-1/3 m-4 p-4 bg-emerald-100 rounded-lg">
        <h2 className="text-3xl text-center mt-2 pt-2">tareas</h2>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {tareas.map((item, index) => (
          <Carta item={item} key={item.id} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Tareas;
