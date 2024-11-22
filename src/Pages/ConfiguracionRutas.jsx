
import Inicio from "./Inicio";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Proyectos from "./Proyectos/Proyectos.jsx";
import Docentes from "./Usuarios/Docentes/Docentes.jsx";
import Colaboradores from "./Usuarios/Colaboradores/Colaboradores.jsx";
import Admin from "./Admin.jsx";
import ProyectosCRUD from "./Proyectos/ProyectosCRUD";


export const ConfiguracionRutas=[
  {
    path:'/',
    element:<Inicio/>,
  },
  {
    path:'/Login',
    element:<Login/>,
  },
 
  {
    path:'/Register',
    element:<Register/>,
  },  
  {
    path:'/Proyectos',
    element:<Proyectos/>,
  },
  {
    path:'/Docentes',
    element:<Docentes/>,
  },
  {
    path:'/Colaboradores',
    element:<Colaboradores/>,
  },
  {
    path:'/Admin',
    element:<Admin/>,
  },
  {
    path:'/Admin/Proyectos',
    element:<ProyectosCRUD/>,
  },
 

]

