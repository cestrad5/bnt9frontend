import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectName, SET_LOGIN } from '../../redux/features/auth/authSlice';
import { logoutUser } from '../../services/authService';
import { BiSolidLogOut } from 'react-icons/bi';

/**
 * Component to handle user logout.
 * @returns {JSX.Element} - Rendered component.
 */
const LogoutSession = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const name = useSelector(selectName);

  /**
   * Handles the user logout process.
   * @async
   * @returns {Promise<void>} - A Promise that resolves after the logout process is completed.
   */
  const logout = async () => {
    try {
      // Call the logoutUser function from the authService
      await logoutUser();

      // Dispatch the action to set the login status to false
      await dispatch(SET_LOGIN(false));

      // Navigate to the login page
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div onClick={logout} className='buttonLogout' title='Cerrar Sesión'>
      <BiSolidLogOut size={30} color='#000000' />
    </div>
  );
};

export default LogoutSession;
