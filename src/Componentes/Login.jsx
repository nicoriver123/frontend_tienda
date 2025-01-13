import React from 'react'
import '../stylesheets/login.css'
import { Link } from 'react-router-dom';


function Login() {
  return (
    <div>
      <div className='card'>
        <form>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail' className='form-label'> Email</label>
            <input type='email' className='form-control' id='exampleInputEmail' aria-describedby='emailHelp' />
            <div id='emailHelp' className='form-text' >Nunca compartiremos su correo electronico</div>
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>Contraseña</label>
            <input type='password' className='form-control' id='exampleInputPassword1' />
          </div>
          <div className='mb-3 form-check'>
            <input type='checkbox' className='form-check-input' id='exampleCheck1' />
            <label className='form-check-label' htmlFor='exampleCheck1'>Recordar Contraseña</label>
          </div>
          <button type='submit' className='btn btn-primary'> Entrar</button>
          <p className='text-center mt-3'>
            ¿No tines una cuenta? {''}
            <Link to="/registro" className='btn btn-link'>Registro</Link>

          </p>
        </form>

      </div>
    </div>
  )
}



export default Login;