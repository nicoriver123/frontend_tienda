import React from 'react'
import { Link } from 'react-router-dom'; // Importa el componente Link para redirecciones internas en la aplicación
import axios from "axios"; // Biblioteca para realizar solicitudes HTTP
import { useState } from "react"; // Hook para manejar estados en React

function Registro() {
  // Estados para almacenar los valores de los campos del formulario y mensajes de error o éxito
  const [username, setUsername] = useState(""); // Estado para el nombre de usuario
  const [email, setEmail] = useState(""); // Estado para el correo electrónico
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar la contraseña
  const [error, setError] = useState(""); // Estado para mensajes de error
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensajes de éxito

  // Función para manejar el envío del formulario
  async function save(event) {
    event.preventDefault(); // Previene la recarga de la página al enviar el formulario
    setError(""); // Reinicia el estado de error
    setSuccessMessage(""); // Reinicia el estado de mensaje de éxito

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden"); // Muestra un mensaje de error si no coinciden
      return; // Detiene la ejecución de la función
    }

    try {
      // Realiza una solicitud POST al endpoint del backend para registrar al usuario
      const response = await axios.post("http://localhost:8080/api/auth/registrar", {
        username, // Envía el username de usuario
        email, // Envía el correo electrónico
        password, // Envía la contraseña
      });

      // Manejar la respuesta del backend
      if (response.data.authStatus === 'USER_CREATED_SUCCESSFULLY') {
        setSuccessMessage(response.data.message); // Muestra el mensaje de éxito del backend
        // Esperar 2 segundos antes de redirigir al login
        setTimeout(() => {
          window.location.href = '/login'; // Redirige a la página de login
        }, 2000);
      } else {
        setError(response.data.message || "No se pudo completar el registro"); // Muestra el mensaje de error del backend
      }
    } catch (err) {
      // Manejar errores específicos del backend
      if (err.response?.data?.message) {
        setError(err.response.data.message); // Muestra el mensaje de error del backend si está disponible
      } else if (err.response?.data?.authStatus === 'USER_NOT_CREATED') {
        setError("No se pudo crear el usuario. Por favor, intente nuevamente."); // Muestra un mensaje genérico
      } else {
        setError("Error en el registro. Por favor, intente más tarde."); // Muestra un mensaje genérico en caso de error desconocido
      }
      console.error("Error detallado:", err); // Muestra el error en la consola para depuración
    }
  }


  return (
    <div className='card'>
      <form >
        <h2 className='text-center'>Crear Cuenta</h2>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        <div className='mb-3'>
          <label htmlFor='username' className='form-label'>Username</label>
          <input 
            type='text' 
            className='form-control' 
            id='username' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>Email</label>
          <input type='email' className='form-control' id='email' value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}

            required />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>Contraseña</label>
          <input type='password' className='form-control' id='password' value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}

            required />
        </div>
        <div className='mb-3'>
          <label htmlFor='confirmPassword' className='form-label'>Confirmar Contraseña</label>
          <input 
            type='password' 
            className='form-control' 
            id='confirmPassword' 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
        </div>

        <button type='submit' className=' btn btn-primary w-100' onClick={save}>Registrar</button>

        <p className='text-center mt-3'>
          Ya tienes una cuenta{''}
          <Link to="/login" className='btn btn-link'>Login</Link>

        </p>



      </form>
    </div>
  )
}

export default Registro;
