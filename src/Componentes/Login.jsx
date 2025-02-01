import React from "react"; // Importa React para crear el componente
import "../stylesheets/login.css"; // Importa los estilos específicos para el componente Login
import { Link, useNavigate } from "react-router-dom"; // Importa Link para navegación entre rutas y useNavigate para redireccionar
import { useState } from "react"; // Importa useState para manejar el estado de los valores del formulario
import axios from "axios"; // Importa axios para realizar solicitudes HTTP
import { useAuth } from "../Componentes/AuthContext";

function Login() {
  // Estados para manejar los valores del formulario, errores y mensajes de éxito
  const [username, setUsername] = useState(""); // Estado para almacenar el nombre de usuario ingresado
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña ingresada
  const [error, setError] = useState(""); // Estado para manejar errores al iniciar sesión
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mostrar mensajes de éxito
  const navigate = useNavigate(); // Hook para redirigir a otras rutas
  const { login } = useAuth();

  async function handleLogin(event) {
    event.preventDefault(); // Evita que el formulario recargue la página
    setError(""); // Reinicia el mensaje de error
    setSuccessMessage(""); // Reinicia el mensaje de éxito

    try {
      // Envía una solicitud POST al backend con los datos del formulario
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: username, // Envía el nombre de usuario ingresado
          password: password, // Envía la contraseña ingresada
        }
      );

      // Verifica si el inicio de sesión fue exitoso
      if (response.data.authStatus === "LOGIN_SUCCESS") {
        setSuccessMessage("Inicio de sesión exitoso"); // Muestra el mensaje de éxito
        // Guarda el token JWT en el almacenamiento local para futuras solicitudes
        localStorage.setItem("token", response.data.token);

        login({
          username: username,
          name: username,
        });

        // Espera 1 segundo antes de redirigir al usuario a la página principal
        setTimeout(() => {
          navigate("/home"); // Redirige a la ruta home
        }, 2000);
      }
    } catch (err) {

      setSuccessMessage("");
      // Maneja errores y muestra mensajes apropiados
      if (err.response?.data?.message) {
        setError(err.response.data.message); // Muestra el mensaje de error del backend
      } else {
        setError("Error al iniciar sesión. Por favor, intente más tarde."); // Mensaje genérico de error
      }
      console.error("Error detallado:", err); // Imprime el error en la consola para depuración
    }
  }

  return (
    <div>
      <div className="card">
        <form onSubmit={handleLogin}>
          <h2 className="text-center">Iniciar Sesión</h2>

          {error && !successMessage && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {successMessage && !error && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Recordar Contraseña
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>

          <p className="text-center mt-3">
            ¿No tienes una cuenta?{" "}
            <Link to="/registro" className="btn btn-link">
              Registro
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
