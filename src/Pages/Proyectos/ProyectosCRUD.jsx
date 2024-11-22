import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react";
import { ModalForm } from "../../components/Modal";
import defaultImage from "../../assets/not_image.jpg";
import FormularioProyecto from "./FormularioProyecto.jsx";

const ProyectosCRUD = () => {
  const API = "http://localhost:3001/proyecto/getall";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoProyecto, setNuevoProyecto] = useState({
    NombreProyecto: "",
    IdLider: 0,
    Descripcion: "",
    Facultad: 0,
    IdDocente: 0,
  });
  
  const [proyectoEditado, setProyectoEditado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const obtenerProyectos = async () => {
    try {
      const res = await axios.get(API);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerProyectos();
  }, []);

  const editarProyecto = (proyectoId) => {
    const proyecto = data.find((e) => e._id === proyectoId);
    console.log(proyecto);
    if (proyecto) {
      setProyectoEditado(proyecto);
      setNuevoProyecto({
        NombreProyecto: proyecto.NombreProyecto,
        IdLider: proyecto.IdLider,
        Descripcion: proyecto.Descripcion,
        Facultad: proyecto.Facultad,
        IdDocente: proyecto.IdDocente,
     
      });

      
      setIsModalOpen(true);
    }
  };

  const actualizarProyecto = async () => {
    if (!proyectoEditado) return;

    try {
      const { NombreProyecto, IdLider, Descripcion, Facultad, IdDocente } = nuevoProyecto;

      const res = await axios.put(`${API}/${proyectoEditado._id}`, {
        NombreProyecto,
        IdLider,
        Descripcion,
        Facultad,
        IdDocente,
      });

      if (res.status === 200) {
        const proyectoActualizado = res.data;
        setData((prevData) =>
          prevData.map((proyecto) =>
            proyecto._id === proyectoActualizado._id ? proyectoActualizado : proyecto
          )
        );
        limpiarFormulario();
        setProyectoEditado(null);
        setIsModalOpen(false);
      } else {
        console.error(`Error al actualizar el proyecto: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al actualizar el proyecto:", error);
    }
  };

  const agregarProyecto = async () => {
    try {
      const { NombreProyecto, IdLider, Descripcion, Facultad, IdDocente } = nuevoProyecto;
  
      const res = await axios.post("http://localhost:3001/proyecto/create", {
        NombreProyecto,
        IdLider,
        Descripcion,
        Facultad,
        IdDocente,
      });
  
      if (res.status === 201) {
        setData((prevData) => [...prevData, res.data]);
        limpiarFormulario();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error al agregar el proyecto:", error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página
    if (proyectoEditado) {
      await actualizarProyecto();
    } else {
      await agregarProyecto();
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    limpiarFormulario();
  };

  const eliminarProyecto = async (proyectoId) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar este proyecto?"
    );

    if (!confirmar) return;

    try {
      const res = await axios.delete(`${API}/${proyectoId}`);

      if (res.status === 200) {
        await obtenerProyectos();
      } else {
        console.error(`Error al eliminar el proyecto: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const limpiarFormulario = () => {
    setNuevoProyecto({
      NombreProyecto: "",
      IdLider:0,
      Descripcion: "",
      Facultad: 0,
      IdDocente: 0,
    });
    setProyectoEditado(null);
  };

  const columns = [
    { name: "Nombre", selector: (row) => row.NombreProyecto },
    { name: "Líder", selector: (row) => row.IdLider },
    { name: "Facultad", selector: (row) => row.Facultad },
    { name: "Descripción", selector: (row) => row.Descripcion },
    { name: "Docente", selector: (row) => row.IdDocente },
    {
      name: "Imagen",
      cell: (row) => {
        const imageUrl = row.img?.[0]?.secure_url || defaultImage;
        return (
          <img
            src={imageUrl}
            alt={row.NombreProyecto}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        );
      },
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <Button className="p-2 m-2" onClick={() => eliminarProyecto(row._id)}>
            Eliminar
          </Button>
          <Button className="p-2 m-2" onClick={() => editarProyecto(row._id)}>
            Editar
          </Button>
        </>
      ),
    },
  ];
  

  if (loading) {
    return (
      <div  className="z-40 text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center">proyectos</h2>
      <Button color="success" onPress={() => setIsModalOpen(true)}>
        Agregar proyecto
      </Button>
      <ModalForm
  isOpen={isModalOpen}
  closeOnBlur={false}
  title={proyectoEditado ? "Editar proyecto" : "Registro de proyecto"}
  formulario={
    <FormularioProyecto
      nuevoProyecto={nuevoProyecto}
      setNuevoProyecto={setNuevoProyecto}
      proyectoEditado={proyectoEditado}
      handleSubmit={handleSubmit}
    />
  }
  onAction={proyectoEditado ? actualizarProyecto : agregarProyecto} // Cambia "direccion" a "onAction"
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

export default ProyectosCRUD;
