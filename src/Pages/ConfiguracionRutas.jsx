import React from "react";
import Inicio from "./Inicio";
import Login from "./Login/Login";
import { Evento } from "./Eventos/Evento.jsx";
import Eventos from "./Eventos/Eventos.jsx";
import Register from "./Register/Register";
import EventosCrud from "./Eventos/EventosCrud.jsx";
import Proyectos from "./Proyectos/Proyectos.jsx";
import Docentes from "./Usuarios/Docentes/Docentes.jsx";
import Colaboradores from "./Usuarios/Colaboradores/Colaboradores.jsx";
import Admin from "./Admin.jsx";

export const ConfiguracionRutas = [
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "eventos/evento/:id",
    element: <Evento />,
  },
  {
    path: "/Eventos",
    element: <Eventos />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Admin/Eventos",
    element: <EventosCrud />,
  },
  {
    path: "/Proyectos",
    element: <Proyectos />,
  },
  {
    path: "/Docentes",
    element: <Docentes />,
  },
  {
    path: "/Colaboradores",
    element: <Colaboradores />,
  },
  { path: "/Admin", element: <Admin /> },
];
