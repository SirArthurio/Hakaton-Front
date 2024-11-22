import React from "react";
import { Input } from "@nextui-org/react";

const FormularioObjetivo = ({
  nuevoObjetivo,
  setNuevoObjetivo,
  objetivoEditado,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoObjetivo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="text-center">
        {objetivoEditado ? "Editar Objetivo" : "Registro de Objetivo"}
      </h2>
      <form className="grid grid-cols-2 gap-4 p-2">
        <Input
          isRequired
          label="Nombre del Objetivo:"
          value={nuevoObjetivo.name}
          className="max-w-xs"
          name="nombre"
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Descripcion del Objetivo:"
          value={nuevoObjetivo.Descripcion}
          className="max-w-xs"
          name="Descripcion"
          onChange={handleChange}
        />
        <Input
          isRequired
          label="IdProyecto:"
          value={nuevoObjetivo.IdProyecto}
          className="max-w-xs"
          name="Descripcion"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default React.memo(FormularioObjetivo);
