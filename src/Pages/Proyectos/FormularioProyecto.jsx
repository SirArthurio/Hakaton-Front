import React from "react";
import { Input } from "@nextui-org/react";

const FormularioProyecto = ({
  nuevoProyecto,
  setNuevoProyecto,
  proyectoEditado,
  handleSubmit,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProyecto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  return (
    <div>
      <h2 className="text-center text-lg font-bold mb-4">
        {proyectoEditado ? "Editar proyecto" : "Registro de proyecto"}
      </h2>
      <form className="grid grid-cols-2 gap-4 p-2" onSubmit={handleSubmit}>
  <Input
    label="Nombre del Proyecto:"
    value={nuevoProyecto.NombreProyecto || ""}
    className="max-w-xs"
    name="NombreProyecto"
    onChange={handleChange}
  />
  <Input
    isRequired
    label="Facultad:"
    value={nuevoProyecto.Facultad || ""}
    className="max-w-xs"
    name="Facultad"
    onChange={handleChange}
  />
  <Input
    isRequired
    label="Descripción del Proyecto:"
    value={nuevoProyecto.Descripcion || ""}
    className="max-w-xs"
    name="Descripcion"
    onChange={handleChange}
  />
  <Input
    isRequired
    label="ID del Proyecto:"
    value={nuevoProyecto.IdProyecto || ""}
    className="max-w-xs"
    name="IdProyecto"
    onChange={handleChange}
  />
  <Input
    isRequired
    label="ID del Líder:"
    value={nuevoProyecto.IdLider || ""}
    className="max-w-xs"
    name="IdLider"
    onChange={handleChange}
  />
  <Input
    isRequired
    label="ID del Docente:"
    value={nuevoProyecto.IdDocente || ""}
    className="max-w-xs"
    name="IdDocente"
    onChange={handleChange}
  />
  <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded">
    {proyectoEditado ? "Actualizar Proyecto" : "Agregar Proyecto"}
  </button>
</form>

    </div>
  );
};

export default React.memo(FormularioProyecto);
