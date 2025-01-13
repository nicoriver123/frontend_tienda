import React from 'react'
import { Link } from 'react-router-dom';
 function Registro () {
  return (
    <div className='card'>
        <form>
            <h2 className='text-center'>Crear Cuenta</h2>
            <div className='mb-3'>
            <label htmlFor='username' className='form-label'>Username</label>
            <input type='text' className='form-control' id='username' required />
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>Email</label>
            <input type='email' className='form-control' id='email' required />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Contraseña</label>
            <input type='password' className='form-control' id='password' required />
          </div>
          <div className='mb-3'>
            <label htmlFor='confirmPassword' className='form-label'>Confirmar Contraseña</label>
            <input type='password' className='form-control' id='confirmPassword' required />
          </div>
          <button type='submit' className=' btn btn-primary w-100'>Registrar</button>

          <p className='text-center mt-3'>
            Ya tienes una cuenta{''}
            <Link to="/login" className='btn btn-link'>Login</Link>

          </p>
          
          

        </form>
    </div>
  )
}

export default Registro;