import React, { useState } from 'react';
import styles from './auth.module.css';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword, validateEmail } from '../../services/authService';

/**
 * Forgot component for handling the password reset functionality.
 * Allows users to request a password reset link via email.
 */
const Forgot = () => {
  const [email, setEmail] = useState('');

  /**
   * Handles the password reset process.
   * @param {Object} e - Event object.
   */
  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error('Please enter an email address');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    const userData = {
      email,
    }

    try {
      await forgotPassword(userData);
      toast.success('Password reset link sent successfully');
      setEmail('');
    } catch (error) {
      toast.error('Error sending password reset link');
      console.error('Error sending password reset link:', error);
    }
  };

  return (
    <>
      <div className='home'>
        <div className={`container ${styles.auth}`}>
          <div className={styles.form}>
            <div className='--flex-center'>
              <AiOutlineMail size={35} color='#895c47' />
            </div>
            <h2>Forgot Password</h2>

            <form onSubmit={forgot}>
              <input type='email' placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type='submit' className={styles.button}>Enviar Solicitud</button>
              <div className={styles.links}>
                <p><Link to='/'>Home</Link></p>
                <p><Link to='/login'>Iniciar Sesión</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Forgot
