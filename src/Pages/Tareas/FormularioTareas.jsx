import React from "react";
import { Input } from "@nextui-org/react";

const FormularioTarea = ({ nuevaTarea, setNuevaTarea, TareaEditada }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarea((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="text-center">
        {TareaEditada ? "Editar Tarea" : "Registro de Tarea"}
      </h2>
      <form className="grid grid-cols-2 gap-4 p-2">
        <Input
          isRequired
          label="Nombre del Tarea:"
          value={nuevaTarea.nombre}
          className="max-w-xs"
          name="name"
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Id Colaborador:"
          value={nuevaTarea.IdColaborador}
          className="max-w-xs"
          name="place"
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Id Estado de la Tarea:"
          value={nuevaTarea.IdEstadoTarea}
          className="max-w-xs"
          name="place"
          onChange={handleChange}
        />
        <Input
          isRequired
          label="descripcion:"
          value={nuevaTarea.Descripcion}
          className="max-w-xs"
          name="place"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default React.memo(FormularioTarea);
