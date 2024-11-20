import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react";
import { ModalForm } from "../../components/Modal";
import defaultImage from "../../assets/not_image.jpg";
import FormularioEvento from "./FormaularioObjetivos";

const ObjetivosCrud = () => {
  const API = "http://localhost:3000/Objetivo";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoObjetivo, setNuevoObjetivo] = useState({
    name: "",
    date: "",
    description: "",
    category: "",
    place: "",
    img: null,
  });
  const [preview, setPreview] = useState(null);
  const [ObjetivoEditado, setObjetivoEditado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const convertirFechaAFormatoDate = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const obtenerObjetivo = async () => {
    try {
      const res = await axios.get(API);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error al obtener los objetivos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerObjetivo();
  }, []);

  const editarObjetivo = (ObjetivoId) => {
    const objetivo = data.find((e) => e._id === ObjetivoId);
    console.log(objetivo);
    if (objetivo) {
      setObjetivoEditado(objetivo);
      setNuevoEvento({
        name: objetivo.name,
        date: convertirFechaAFormatoDate(objetivo.date),
        description: objetivo.description,
        category: objetivo.category,
        place: objetivo.place,
        img: null,
      });

      setPreview(o.img[0] !== undefined ? objetivo.img[0].secure_url  : null);
      setIsModalOpen(true);
    }
  };

  const actualizarObjetivo = async () => {
    if (!ObjetivoEditado) return;

    try {
      const { name, date, description, category, place } = nuevoObjetivo;

      const res = await axios.put(`${API}/${ObjetivoEditado._id}`, {
        name,
        date,
        description,
        category,
        place,
      });

      if (res.status === 200) {
        const objetivoActualizado = res.data;
        setData((prevData) =>
          prevData.map((objetivo) =>
            objetivo._id === objetivoActualizado._id ? objetivoActualizado : evento
          )
        );
        limpiarFormulario();
        setObjetivoEditado(null);
        setIsModalOpen(false);
      } else {
        console.error(`Error al actualizar el objetivo: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al actualizar el objetivo:", error);
    }
  };

  const agregarObjetivo = async () => {
    try {
      const formData = new FormData();
      formData.append("name", nuevoObjetivo.name);
      formData.append("date", convertirFechaAFormatoDate(nuevoObjetivo.date));
      formData.append("description", nuevoObjetivo.description);
      formData.append("category", nuevoObjetivo.category);
      formData.append("place", nuevoObjetivo.place);
      if (nuevoObjetivo.img) formData.append("img", nuevoObjetivo.img);

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
      console.error("Error al agregar el evento:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    limpiarFormulario();
  };

  const eliminarObjetivo = async (ObjetivoId) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar este evento?"
    );

    if (!confirmar) return;

    try {
      const res = await axios.delete(`${API}/${eventoId}`);

      if (res.status === 200) {
        await obtenerObjetivo();
      } else {
        console.error(`Error al eliminar el objetivo: ${res.status}`);
      }
    } catch (error) {
      console.error("Error al eliminar el objetivo:", error);
    }
  };

  const limpiarFormulario = () => {
    setNuevoEvento({
      name: "",
      date: "",
      description: "",
      category: "",
      place: "",
      img: null,
    });
    setPreview(null);
    setEventoEditado(null);
  };

  const columns = [
    { name: "Nombre", selector: (row) => row.name },
    { name: "Fecha", selector: (row) => row.date },
    { name: "Categoria", selector: (row) => row.category },
    { name: "Descripción", selector: (row) => row.description },
    { name: "Lugar", selector: (row) => row.place },
    {
      name: "Imagen",
      cell: (row) => {
        const imageUrl =
          row.img && row.img.length > 0
            ? row.img[0].secure_url
            : defaultImage;
        console.log(row.img);
        console.log(imageUrl);
        return (
          <img
            src={imageUrl}
            alt={row.name}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        );
      },
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <Button className="p-2 m-2" onClick={() => eliminarObjetivo(row._id)}>
            Eliminar
          </Button>
          <Button className="p-2 m-2" onClick={() => editarObjetivo(row._id)}>
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
      <h2 className="text-center">Eventos</h2>
      <Button color="success" onPress={() => setIsModalOpen(true)}>
        Agregar objetivo
      </Button>
      <ModalForm
        isOpen={isModalOpen}
        closeOnBlur={false}
        title={eventoEditado ? "Editar Evento" : "Registro de Evento"}
        formulario={
          <FormularioEvento
            nuevoEvento={nuevoEvento}
            setNuevoEvento={setNuevoEvento}
            preview={preview}
            handleFileChange={(e) => {
              const file = e.target.files[0];
              setNuevoEvento((prev) => ({ ...prev, img: file }));
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
            eventoEditado={eventoEditado}
          />
        }
        direccion={eventoEditado ? actualizarEvento : agregarEvento}
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

export default EventosCrud;
