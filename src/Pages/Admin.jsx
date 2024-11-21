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

const roles = [
  { id: "0", rol: "director", id_items: ["5"] },
  { id: "1", rol: "lider", id_items: ["1", "2", "3", "4", "5"] },
  { id: "2", rol: "docente", id_items: ["4", "5"] },
  { id: "3", rol: "colaborador", id_items: ["3"] },
];

export default function FiltroAdmin() {
  const [selectedRole, setSelectedRole] = useState("3");

  const getFilteredItems = () => {
    const selectedRoleObj = roles.find((role) => role.id === selectedRole);
    return items.filter((item) => selectedRoleObj.id_items.includes(item.id));
  };

  return (
    <div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 m-2">
        {getFilteredItems().map((item, index) => (
          <div key={item.id} className="item">
            <Carta2 item={item} key={item.id} index={index}></Carta2>
          </div>
        ))}
      </div>
    </div>
  );
}
