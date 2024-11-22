import "../Login/App.css";
import { FaUserShield } from "react-icons/fa";
import { GoShieldLock } from "react-icons/go";
import { AiOutlineSwapRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import video from "../../assets/login/Fondo.mp4";
import { Link } from "react-router-dom";
import Nmodal from "../../components/Nmodal"
import { useState } from "react";



const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);


  const manejadorIniciar = (e) => {
    e.preventDefault();
    navigate("/"); // Redirige directamente a la página principal
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h1 className="title">HAKATON</h1>
          </div>
          <div className="footerDiv flex">
            <span className="text">¿No tienes una cuenta? Únete</span>
            <Link to="/register">
              <button className="btn">Crear Cuenta</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <form className="form grid" onSubmit={manejadorIniciar}>
            <div className="inputDiv">
              <label htmlFor="username">Usuario</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  placeholder="Ingrese su usuario"
                  type="text"
                  id="username"
                  name="cedula"
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Contraseña</label>
              <div className="input flex">
                <GoShieldLock className="icon" />
                <input
                  placeholder="Ingrese su contraseña"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
            </div>
            <button type="submit" className="btn flex">
              <span>Login</span>
              <AiOutlineSwapRight className="icon" />
            </button>
            <span className="footerDiv flex" onClick={()=> setOpen(true)} >
              ¿Olvidaste tu contraseña? Click aquí 
            </span>
          </form>
        </div>
      </div>

      <Nmodal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-56">
          
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirmar Eliminacion</h3>
            <p className="text-sm text-gray-500">
              Estas seguro que quieres eliminar esto?
            </p>
          </div>
          <div className="flex gap-4">
            <button className="btn-danger w-full">Se fue</button>
            <button
              className="btn btn-light w-full"
              onClick={() => setOpen(false)}
            >
              Aguantala
            </button>
          </div>
        </div>
      </Nmodal>
    </div>  
  );
};

export default Login;
