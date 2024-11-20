"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
} from "@nextui-org/react";

const docentes = [
  {
    id: 1,
    nombre: "María González",
    email: "maria.gonzalez@escuela.edu",
    materia: "Matemáticas",
    experiencia: 10,
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Juan Pérez",
    email: "juan.perez@escuela.edu",
    materia: "Historia",
    experiencia: 8,
    estado: "Inactivo",
  },
  {
    id: 3,
    nombre: "Ana Rodríguez",
    email: "ana.rodriguez@escuela.edu",
    materia: "Ciencias",
    experiencia: 5,
    estado: "Activo",
  },
];

const columns = [
  { name: "NOMBRE", uid: "nombre" },

  { name: "ACCIONES", uid: "acciones" },
];

export default function Colaboradores() {
  const renderCell = (docente, columnKey) => {
    const cellValue = docente[columnKey];

    switch (columnKey) {
      case "nombre":
        return <User name={cellValue}></User>;
      case "acciones":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detalles">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Button className="p-2 m-2">Editar</Button>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Lista de Colaboradores</h1>
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
        <TableBody items={docentes}>
          {(item) => (
            <TableRow key={item.id}>
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
