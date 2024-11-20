import React from 'react'
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table"
import { Progress } from "@nextui-org/progress"
import { Button } from "@nextui-org/button"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Datos de ejemplo
const projectsData = [
  { id: 1, name: "Proyecto A", progress: 75, status: "En progreso" },
  { id: 2, name: "Proyecto B", progress: 30, status: "En progreso" },
  { id: 3, name: "Proyecto C", progress: 100, status: "Completado" },
  { id: 4, name: "Proyecto D", progress: 10, status: "Iniciado" },
]

const chartData = [
  { name: 'Ene', completed: 4, ongoing: 3 },
  { name: 'Feb', completed: 3, ongoing: 4 },
  { name: 'Mar', completed: 5, ongoing: 2 },
  { name: 'Abr', completed: 2, ongoing: 5 },
  { name: 'May', completed: 4, ongoing: 3 },
  { name: 'Jun', completed: 3, ongoing: 4 },
]

export default function Inicio() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard de Seguimiento</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardBody>
            <p className="text-lg font-semibold">Proyectos Totales</p>
            <p className="text-3xl font-bold">{projectsData.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-lg font-semibold">En Progreso</p>
            <p className="text-3xl font-bold">{projectsData.filter(p => p.status === "En progreso").length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-lg font-semibold">Completados</p>
            <p className="text-3xl font-bold">{projectsData.filter(p => p.status === "Completado").length}</p>
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
            <DropdownMenu aria-label="Opciones de filtrado">
              <DropdownItem key="all">Todos</DropdownItem>
              <DropdownItem key="inprogress">En Progreso</DropdownItem>
              <DropdownItem key="completed">Completados</DropdownItem>
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
              {projectsData.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>
                    <Progress 
                      value={project.progress} 
                      color={project.progress === 100 ? "success" : "primary"}
                      aria-label={`Progreso de ${project.name}`}
                    />
                  </TableCell>
                  <TableCell>{project.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Proyectos Completados vs. En Curso</h2>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#4CAF50" name="Completados" />
              <Bar dataKey="ongoing" fill="#2196F3" name="En Curso" />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  )
}