import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { Progress } from "@nextui-org/progress";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { obtenerProyectos } from "../API/Data";

export default function Inicio() {
  const [proyectos, setProyectos] = useState([]);
  const [filtro, setFiltro] = useState("all");

  useEffect(() => {
    const fetchProyectos = async () => {
      const data = await obtenerProyectos();
      setProyectos(data);
    };

    fetchProyectos();
  }, []);

  const proyectosFiltrados =
    filtro === "all"
      ? proyectos
      : proyectos.filter((p) => {
          if (filtro === "en progreso") return p.Estado === 0;
          if (filtro === "completado") return p.Estado === 1;
          if (filtro === "atrasado") return p.Estado === 2;
        });

  if (proyectos.length === 0) {
    return <p>No hay proyectos disponibles.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard de Seguimiento</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardBody>
            <p className="text-lg font-semibold">Proyectos Totales</p>
            <p className="text-3xl font-bold">{proyectos.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-lg font-semibold">En Progreso</p>
            <p className="text-3xl font-bold">{proyectos.filter((p) => p.Estado === 0).length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-lg font-semibold">Atrasados</p>
            <p className="text-3xl font-bold">{proyectos.filter((p) => p.Estado === 2).length}</p>
          </CardBody>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex justify-between">
          <h2 className="text-xl font-semibold">Proyectos en Curso</h2>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat">Filtrar</Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Opciones de filtrado"
              onAction={(key) => setFiltro(key)}
            >
              <DropdownItem key="all">Todos</DropdownItem>
              <DropdownItem key="en progreso">En Progreso</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody>
          <Table aria-label="Tabla de proyectos">
            <TableHeader>
              <TableColumn>NOMBRE</TableColumn>
              <TableColumn>PROGRESO</TableColumn>
              <TableColumn>ESTADO</TableColumn>
            </TableHeader>
            <TableBody>
              {proyectosFiltrados.map((project) => (
                <TableRow key={project.IdProyecto}>
                  <TableCell>{project.NombreProyecto}</TableCell>
                  <TableCell>
                    <Progress
                      value={project.progress}
                      color={project.progress === 100 ? "success" : "primary"}
                      aria-label={`Progreso de ${project.NombreProyecto}`}
                    />
                  </TableCell>
                  <TableCell>
                    {project.Estado === 0 ? "En Progreso" : "Terminado o Atrasado"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Proyectos Atrasados vs. En Curso</h2>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: "Atrasados", cantidad: proyectos.filter((p) => p.Estado === 2).length },
                { name: "En Curso", cantidad: proyectos.filter((p) => p.Estado === 0).length },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  );
}
