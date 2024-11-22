import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { obtenerDocentes } from "../../../API/Data";

const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "ACCIONES", uid: "acciones" },
];

export default function Docentes() {
  const [docente, setDocentes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const data = await obtenerDocentes();
        if (Array.isArray(data)) {
          setDocentes(data);
        } else {
          console.error("Datos no válidos");
        }
      } catch (error) {
        console.error("Error al obtener los docentes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocentes();
  }, []);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (docente.length === 0) {
    return <p>No hay proyectos disponibles.</p>;
  }

  const renderCell = (docente, columnKey) => {
    const cellValue = docente[columnKey];

    switch (columnKey) {
      case "nombre":
        return <User name={cellValue}></User>;
      case "acciones":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar">
              <Button size="sm" color="primary">
                Editar
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Lista de Docentes</h1>
      <Table aria-label="Tabla de docentes">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "acciones" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={docente}>
          {(item) => (
            <TableRow key={item.cedula}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
