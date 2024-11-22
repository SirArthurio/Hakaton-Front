import  { useState, useEffect } from "react";
import { obtenerObjetivos } from "../../API/Data";
import { Carta } from "../../components/Card";

function Objetivos() {
  const [objetivos, setObjetivos] = useState([]);

  useEffect(() => {
    const fechObjetivos = async () => {
      const data = await obtenerObjetivos();
      setObjetivos(data);
    };

    fechObjetivos();
  }, []);

  if (objetivos.length === 0) {
    return <p>No hay Objetivos disponibles.</p>;
  }

  return (
    <div>
      <div className="h-1/3 m-4 p-4 bg-emerald-100 rounded-lg">
        <h2 className="text-3xl text-center mt-2 pt-2">Objetivos</h2>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {objetivos.map((item, index) => (
          <Carta item={item} key={item.id} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Objetivos;
