import React, { useState } from "react";
import { Carta2 } from "../components/Card";

const items = [
  {
    id: "1",
    nombre: "Docentes",
    img: "https://img.freepik.com/vector-gratis/coleccion-docentes_23-2148534611.jpg?semt=ais_hybrid",
  },
  {
    id: "2",
    nombre: "Colaboradores",
    img: "https://mxblog.kyoceradocumentsolutions.com/hubfs/C%C3%B3mo%20hacer%20que%20tus%20colaboradores%20trabajen%20en%20equipo.png",
  },
  {
    id: "3",
    nombre: "Tareas",
    img: "https://www.padinthecity.com/img/blog/app-para-lista-de-tareas.jpg",
  },
  {
    id: "4",
    nombre: "Objetivos",
    img: "https://lectera.com/info/storage/img/20221031/2c125f1996399f9ed74b_808xFull.jpg",
  },
  {
    id: "5",
    nombre: "Proyectos",
    img: "https://assets.asana.biz/m/2729b34d99aa7f91/webimage-article-project-planning-project-design-2x.jpg",
  },
];

const FiltroAdmin = () => {
  const filteredItems = items.filter((item) => item.rol === "3");
  return (
    <div>
      {filteredItems.map((item, index) => (
        <Carta2 item={item} key={item.id} index={index} />
      ))}
    </div>
  );
};

export function Admin() {
  const [isAdmin, setAdmin] = useState(true);
  const getUserRole = () => {
    if (isAdmin) return 0;
    if (isEditor) return 1;
    return 2;
  };
  return (
    <div>
      <div className="h-1/3 m-4 p-4 bg-emerald-100 rounded-lg">
        <h2 className="text-3xl text-center mt-2 pt-2">{getUserRole()}</h2>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 m-2">
        {isAdmin ? (
          items.map((item, index) => (
            <Carta2 item={item} key={item.id} index={index} />
          ))
        ) : (
          <FiltroAdmin />
        )}
      </div>
    </div>
  );
}
export function entrenador() {
  return <div>soy entrenador</div>;
}
