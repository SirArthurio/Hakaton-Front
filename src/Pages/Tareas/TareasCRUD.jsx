import  { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react";
import { ModalForm } from "../../components/Modal";
import FormularioTareas from "./FormularioTareas";

const TareasCRUD = () => {
  const API = "http://localhost:3000/eventos";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevaTarea, setNuevaTarea] = useState({
    nombre: "",
    IdColaborador: 0,
    IdEstadoTarea: 0,
    Descripcion: "",
  });
  const [preview, setPreview] = useState(null);
  const [tareaEditada, setTareaEditada] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const obtenerTareas = async () => {
    try {
      const res = await axios.get(API);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  const editarTarea = (tareaId) => {
    const tarea = data.find((e) => e.id === tareaId);
    console.log(tarea);
    if (tarea) {
      setTareaEditada(tarea);
      setNuevaTarea({
        nombre: tarea.name,
        descripcion: tarea.description,
        IdColaborador: tarea.category,
        IdEstadoTarea: tarea.place,
      });
      setIsModalOpen(true);
    }
  };

  const actualizarTarea = async () => {
    if (!tareaEditada) return;

    try {
      const { nombre, IdColaborador, descripcion, IdEstadoTarea } = nuevaTarea;

      const res = await axios.put(`${API}/${tareaEditada.id}`, {
        nombre,
        IdColaborador,
        descripcion,
        IdEstadoTarea,
      });

      if (res.status === 200) {
        const tareaActualizada = res.data;
        setData((prevData) =>
          prevData.map((tarea) =>
            tarea.id === tareaActualizada.id ? tareaActualizada : tarea
          )
        );
        limpiarFormulario();
        setTareaEditada(null);
        setIsModalOpen(false);
      } else {
        console.error(`Error al actualizar la Tarea: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al actualizar la Tarea:", error);
    }
  };

  const agregarTarea = async () => {
    try {
      const formData = new FormData();
      formData.append("nombre", nuevaTarea.nombre);
      formData.append("Descripcion", nuevaTarea.Descripcion);
      formData.append("IdColaborador", nuevaTarea.IdColaborador);
      formData.append("IdEstadoTarea", nuevaTarea.IdEstadoTarea);

      const res = await axios.post(API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setData((prevData) => [...prevData, res.data]);
        limpiarFormulario();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error al agregar la Tarea:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    limpiarFormulario();
  };

  const eliminarTarea = async (tareaID) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar esta Tarea?"
    );

    if (!confirmar) return;

    try {
      const res = await axios.delete(`${API}/${tareaID}`);

      if (res.status === 200) {
        await obtenerTareas();
      } else {
        console.error(`Error al eliminar la tarea: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const limpiarFormulario = () => {
    setNuevaTarea({
      nombre: "",
      Descripcion: "",
      IdColaborador: 0,
      IdEstadoTarea: 0,
    });
    setPreview(null);
    setTareaEditada(null);
  };

  const columns = [
    { name: "nombre", selector: (row) => row.nombre },
    { name: "Descripcion", selector: (row) => row.Descripcion },
    { name: "IdColaborador", selector: (row) => row.IdColaborador },
    { name: "IdEstadoTarea", selector: (row) => row.IdEstadoTarea },

    {
      name: "Acciones",
      cell: (row) => (
        <>
          <Button className="p-2 m-2" onClick={() => eliminarTarea(row.id)}>
            Eliminar
          </Button>
          <Button className="p-2 m-2" onClick={() => editarTarea(row.id)}>
            Editar
          </Button>
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="z-40 text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center">Tareas</h2>
      <Button color="success" onPress={() => setIsModalOpen(true)}>
        Agregar Tarea
      </Button>
      <ModalForm
        isOpen={isModalOpen}
        closeOnBlur={false}
        title={tareaEditada ? "Editar Tarea" : "Registro de Tarea"}
        formulario={
          <FormularioTareas
            nuevaTarea={nuevaTarea}
            setNuevaTarea={setNuevaTarea}
            preview={preview}
            tareaEditada={tareaEditada}
          />
        }
        direccion={tareaEditada ? actualizarTarea : agregarTarea}
        onClose={handleCloseModal}
      />

      <div className="border mt-4">
        <DataTable
          key={`datatable-${data.length}-${Date.now()}`}
          columns={columns}
          data={data}
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default TareasCRUD;
