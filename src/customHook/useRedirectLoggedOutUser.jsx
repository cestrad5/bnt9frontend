import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLoginStatus } from '../services/authService';
import { SET_LOGIN } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

/**
 * Custom hook to redirect a logged-out user to a specified path.
 * @param {string} path - The path to redirect to if the user is logged out.
 */
const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * Checks the login status and redirects the user if logged out.
     */
    const redirectLoggedOutUser = async () => {
      try {
        const isLoggedIn = await getLoginStatus();
        dispatch(SET_LOGIN(isLoggedIn));

        if (!isLoggedIn) {
          toast.info('Session expired. Please login to continue.');
          navigate(path);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    // Call the function to redirect the user on mount
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
