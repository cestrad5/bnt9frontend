import React, { useState } from 'react';
import styles from './auth.module.css';
import { MdPassword } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../services/authService';

/**
 * Reset component for changing user password.
 * Allows users to reset their password with a token received via email.
 */
const Reset = () => {
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  });
  const { password, password2 } = formData;

  const { resetToken } = useParams();

  /**
   * Handles input changes in the form fields.
   * @param {Object} e - Event object.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles the password reset process.
   * @param {Object} e - Event object.
   */
  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    if (password !== password2) {
      return toast.error('Passwords do not match');
    }

    const userData = {
      password,
      password2,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className='home'>
        <div className={`container ${styles.auth}`}>
          <div className={styles.form}>
            <div className='--flex-center'>
              <MdPassword size={35} color='#895c47' />
            </div>
            <h2>Cambiar Contraseña</h2>

            <form onSubmit={reset}>
              <input type='password' placeholder='Contraseña' required name='password' value={password} onChange={handleInputChange} />
              <input type='password' placeholder='Confirmar Contraseña' required name='password2' value={password2} onChange={handleInputChange} />
              <button type='submit' className={styles.button}>Cambiar Contraseña</button>
              <div className={styles.links}>
                <p><Link to='/'>Home</Link></p>
                <p><Link to='/login'>Iniciar Sesión</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
