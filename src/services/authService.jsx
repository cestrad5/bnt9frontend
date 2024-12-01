import axios from 'axios';
import { toast } from 'react-toastify';

// The backend URL is retrieved from the environment variable.
export const BACKEND_URL = import.meta.env.VITE_BACKEND;

/**
 * Validates the email format.
 * @param {string} email - Email to be validated.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
export const validateEmail = (email) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

/**
 * Registers a new user.
 * @param {Object} userData - User data to be registered.
 * @returns {Promise} - Returns the response data from the registration API.
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData, { withCredentials: true });
    if (response.statusText === 'OK') {
      toast.success('Registered successfully');
    }
    return response.data;
  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();
    toast.error(message);
  }
};

/**
 * Logs in an existing user.
 * @param {Object} userData - User data for login.
 * @returns {Promise} - Returns the response data from the login API.
 */
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData);
    if (response.statusText === 'OK') {
      toast.success('Login successful...');
    }
    return response.data;
  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();
    toast.error(message);
  }
};

/**
 * Logs out the currently logged-in user.
 */
export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/api/users/logout`);
  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();
    toast.error(message);
  }
};

/**
 * Sends a request to reset the user's password.
 * @param {Object} userData - User data for password reset.
 */
export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`, userData);
    toast.success(response.data.message);
  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();
    toast.error(message);
  }
};

/**
 * Resets the user's password.
 * @param {Object} userData - User data for password reset.
 * @param {string} resetToken - Reset token for password reset.
 * @returns {Promise} - Returns the response data from the password reset API.
 */
export const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`, userData);
    return response.data;
  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();
    toast.error(message);
  }
};

/**
 * Gets the login status of the current user.
 * @returns {Promise} - Returns the response data indicating the login status.
 */
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
    return response.data;
  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();
    toast.error(message);
  }
};

/**
 * Gets the user profile information.
 * @returns {Promise} - Returns the response data containing user profile information.
 */
export const getUser = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/getuser`);
    return response.data;
  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();
    toast.error(message);
  }
};

/**
 * Updates the user's profile information.
 * @param {Object} formData - User data to be updated.
 * @returns {Promise} - Returns the response data from the profile update API.
 */
export const updateUser = async (formData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/users/updateuser`,
      formData
    );
    return response.data;
  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();
    toast.error(message);
  }
};

/**
 * Updates the user's password.
 * @param {Object} formData - User data for password change.
 * @returns {Promise} - Returns the response data from the password change API.
 */
export const changePassword = async (formData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/users/changepassword`,
      formData
    );
    return response.data;
  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();
    toast.error(message);
  }
};
