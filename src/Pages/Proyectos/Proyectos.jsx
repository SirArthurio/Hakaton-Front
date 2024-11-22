import {useEffect,useState} from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,

} from "@nextui-org/react";
import { obtenerProyectos } from "../../API/Data";




export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const fetchProyectos = async () => {
      const data = await obtenerProyectos();
      setProyectos(data);
    };

    fetchProyectos();
  }, []);

  if (proyectos.length === 0) {
    return <p>No hay proyectos disponibles.</p>;
  }
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2  className="text-3xl font-bold text-center mb-8">
          Nuestros Proyectos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map((proyectos) => (
            <Card key={proyectos.IdProyecto} className="max-w-[400px]">
              <CardBody className="p-0">
                
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">
                    {proyectos.NombreProyecto}
                  </h4>
                  <p>{proyectos.Descripcion}</p>
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
