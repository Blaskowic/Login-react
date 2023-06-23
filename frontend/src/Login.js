import axios from 'axios'; 
import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import Validation from './InicioValidation'; 
 function Login() { 
  // Declaración de constantes y estados 
  const navigate = useNavigate(); 
  const [values, setValues] = useState({ email: '', password: '' }); 
  const [errors, setErrors] = useState({}); 
  const [backendError, setBackendError] = useState([]); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const SERVER_URL = 'http://localhost:8081';
   // Funciones
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }));
  };
   const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
    if (err.email === "" && err.password === "") {
      axios.post(`${SERVER_URL}/login`, values)
      .then(res => { 
        if (res.data.errors) { 
          setBackendError(res.data.errors); 
        } else { 
          setBackendError([]); 
          setIsLoggedIn(true);
        } 
      }) 
      .catch(err => console.log(err));
    }
  };
   // Redirigir al usuario si ya ha iniciado sesión
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);
   // Renderizado del componente
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Iniciar sesión</h2>
        {backendError.length > 0 && (
          <div className='alert alert-danger'>
            {backendError.map(e => (<p className='text-danger'>{e.msg}</p>))}
          </div>
        )}
        <form action="" onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Correo electrónico</strong></label>
            <input type="email" placeholder='Ingrese correo electrónico' name='email' onChange={handleInput} className='form-control rounded-0' />
            {errors.email && <span className='text-danger'> {errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Contraseña</strong></label>
            <input type="password" placeholder='Ingrese contraseña' name='password' onChange={handleInput} className='form-control rounded-0' />
            {errors.password && <span className='text-danger'> {errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'> Iniciar sesión</button>
          <p>Aceptas nuestros términos y políticas</p>
          <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Crear cuenta</Link>
        </form>
      </div>
    </div>
  );
}
 export default Login;