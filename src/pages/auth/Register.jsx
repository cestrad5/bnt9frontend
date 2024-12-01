import React, { useState } from 'react';
import styles from './auth.module.css';
import { TiUserAddOutline } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../../components/loader/Loader';

const BACKEND_URL = import.meta.env.VITE_BACKEND;

/**
 * Register component for user registration.
 * Allows users to register with their name, email, password, and role.
 */
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    clave: '',
    role: '', // Field to store the role selection
  });

  const [claveValida, setClaveValida] = useState(false);

  const navigate = useNavigate();

  /**
   * Handles input changes in the form fields.
   * @param {Object} e - Event object.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles validation of the clave.
   */
  const handleClaveValidation = () => {
    if (formData.clave === '71268042') {
      setClaveValida(true);
    } else {
      toast.error('La clave no es válida');
    }
  };

  /**
   * Handles the user registration process.
   * @param {Object} e - Event object.
   */
  const register = async (e) => {
    e.preventDefault();

    if (!claveValida) {
      toast.error('La clave no ha sido validada.');
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData, { withCredentials: true });

      toast.success('Registered successfully');
      setIsLoading(false);
      navigate('/login');
    } catch (error) {
      const message = (
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      );
      toast.error(message);
      setIsLoading(false);
    }
  };

  return (
    <div className='home'>
      <div className={`container ${styles.auth}`}>
        {isLoading && <Loader />}
        <div className={styles.form}>
          <div className='--flex-center'>
            <TiUserAddOutline size={35} color='#895c47' />
          </div>
          <h2>Registrar Usuario</h2>

          {!claveValida ? (
            <form>
              <input type='password' placeholder='Clave' name='clave' value={formData.clave} onChange={handleInputChange} />
              <button onClick={handleClaveValidation} className={styles.button}>Validar Clave</button>
            </form>
          ) : (
            <form onSubmit={register}>
              <input type='text' placeholder='Nombre' name='name' value={formData.name} onChange={handleInputChange} />
              <input type='email' placeholder='Email' name='email' value={formData.email} onChange={handleInputChange} />
              <input type='password' placeholder='Contraseña' name='password' value={formData.password} onChange={handleInputChange} />
              <input type='password' placeholder='Confirmar Contraseña' name='password2' value={formData.password2} onChange={handleInputChange} />

              <select className='selectRole' name="role" value={formData.role} onChange={handleInputChange}>
                <option value="">Selecciona un rol</option>
                <option value="Sales">Sales</option>
                <option value="Production">Production</option>
              </select>

              <button type='submit' className={styles.button}>Registrar</button>
            </form>
          )}

          <span className={styles.register}>
            <br />
            <Link to='/'>Home</Link>
            <p>&nbsp; &nbsp; ¿Tienes una cuenta? &nbsp; &nbsp;</p>
            <Link to='/login'>Inicia Sesión</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
