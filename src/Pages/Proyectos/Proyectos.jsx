import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,

} from "@nextui-org/react";


const projects = [
  {
    id: "1",
    title: "Proyecto A",
    description:
      "Una breve descripción del Proyecto A y sus características principales.",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Proyecto B",
    description: "Detalles sobre el Proyecto B y su impacto en la industria.",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Proyecto C",
    description: "Información sobre el innovador Proyecto C y sus beneficios.",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  
];

export default function Proyectos() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2  className="text-3xl font-bold text-center mb-8">
          Nuestros Proyectos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="max-w-[400px]">
              <CardBody className="p-0">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full object-cover h-[200px]"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">
                    {project.title}
                  </h4>
                  <p>{project.description}</p>
                </div>
              </CardBody>
              <CardFooter className="justify-end">
                <Button color="primary">Ver más</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
