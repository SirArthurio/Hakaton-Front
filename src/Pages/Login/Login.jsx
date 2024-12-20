import "../Login/App.css";
import axios from "axios";
import { FaUserShield } from "react-icons/fa";
import { GoShieldLock } from "react-icons/go";
import { AiOutlineSwapRight } from "react-icons/ai";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import video from "../../assets/login/Fondo.mp4";
import { Link } from "react-router-dom";
import { Usuario } from "../../Models/Usuario";
import { UserContext } from "../../Context/UserContext";
import Swal from "sweetalert2";
axios.defaults.withCredentials = true;
const API = axios.create({
  baseURL: "http://localhost:3000", 
  withCredentials: true,
});

const Login = () => {
  const [form, setForm] = useState({
    cedula: null,
    password: null,
  });

  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const manejadorIniciar = (e) => {
    e.preventDefault();

    if (!form.cedula || !form.password) {
      setError(true);
      setErrorMsg("Por favor, completa todos los campos.");
      return;
    }

    API.post("/login", form)
      .then((res) => {
        if (res.status === 200) {
          const user = new Usuario(
            res.data.user.document,
            res.data.user.name,
            res.data.user.user,
            res.data.user.levelUser
          );

          setUser({
            id: user.id,
            nombre: user.nombre,
            role: user.role,
          });

          Swal.fire({
            icon: "success",
            title: "¡Se inicio se sesion compae!",
            text: "Has cerrado sesión correctamente.",
            confirmButtonText: "Ok",
          })
          navigate("/");
        }else if (res.status === 400){
          Swal.fire({
            icon: "error",
            title: "¡Hay error compae!",
            text: "Verifica tus credenciales.",
            confirmButtonText: "Ok",
          })
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError(true);
        setErrorMsg("Error occurred during login. Please try again.");
      });
  };

  const manejadorState = async (e) => {
    await setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
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
            <span className="text">No tienes una cuenta?, Unetenos</span>
            <Link to="/register">
              <button className="btn">Crear Cuenta</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          

          <form action="" className="form grid" onSubmit={manejadorIniciar}>
            <div className="inputDiv">
              <label htmlFor="username">Usuario</label>
              <div className="input flex">
                <FaUserShield className="icon"></FaUserShield>
                <input
                  placeholder="Ingrese su usuario"
                  type="text"
                  id="username"
                  name="cedula"
                  onChange={manejadorState}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Contraseña</label>
              <div className="input flex">
                <GoShieldLock className="icon"></GoShieldLock>
                <input
                  placeholder="Ingrese su contraseña"
                  type="text"
                  id="password"
                  name="password"
                  onChange={manejadorState}
                />
              </div>
            </div>
          
            <button type="submit" className="btn flex">
              <span>Login</span>
              <AiOutlineSwapRight className="icon"></AiOutlineSwapRight>
            </button>


            <span className="footerDiv flex">
              Olvidaste tu contraseña? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
