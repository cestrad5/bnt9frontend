import React, { useState } from 'react';
import styles from './auth.module.css';
import { BiLogIn } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser, validateEmail } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

/**
 * Login component for handling user authentication.
 * Allows users to log in with their email and password.
 */
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  /**
   * Handles input changes in the form fields.
   * @param {Object} e - Event object.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles the login process.
   * @param {Object} e - Event object.
   */
  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('All fields are required');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);

    try {
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate('/dashboard');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Invalid email or password');
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <div className='home'>
        <div className={`container ${styles.auth}`}>
          {isLoading && <Loader />}
          <div className={styles.form}>
            <div className='--flex-center'>
              <BiLogIn size={35} color='#895c47' />
            </div>
            <h2>Login</h2>

            <form onSubmit={login}>
              <input type='email' placeholder='Correo' name='email' value={email} onChange={handleInputChange} />
              <input type='password' placeholder='Contraseña' name='password' value={password} onChange={handleInputChange} />
              <button type='submit' className={styles.button}>Iniciar Sesión</button>
            </form>

            <Link to='/forgot' className={styles.a}>¿Olvidaste tu contraseña?</Link>
            <span className={styles.register}>
              <Link to='/'>Home</Link>
              {/* <p>&nbsp; Don't have an account? &nbsp;</p>
                  <Link to='/register'>Register</Link> */}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
