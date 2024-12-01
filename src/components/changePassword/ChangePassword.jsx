/*This component provides a form for users to change
their passwords. It uses the changePassword service,
displays notifications using react-toastify, and utilizes
the Card component for styling. The form validates if the
new passwords match before initiating the password change
process. Upon successful password change, it displays a
success message and navigates the user to the profile page.
*/
// Importing necessary dependencies and styles
import React, { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../../services/authService";
import Card from "../card/Card";
import { useNavigate } from "react-router-dom";

// Initial state for form data
const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

/**
 * Component for changing user password.
 * @returns {JSX.Element} - Rendered component for changing password.
 */
const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  /**
   * Handles input changes in the form.
   * @param {Object} e - Event object.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  /**
   * Handles the password change process.
   * @param {Object} e - Event object.
   */
  const changePass = async (e) => {
    e.preventDefault();

    // Validates if new passwords match
    if (password !== password2) {
      return toast.error("Las nuevas contraseñas no coinciden");
    }

    // Form data for password change
    const formData = {
      oldPassword,
      password,
    };

    // Calls the service to change the password
    const data = await changePassword(formData);
    
    // Displays success message and navigates to the profile page
    toast.success(data);
    navigate("/profile");
  };

  // Rendered JSX
  return (
    <div className="add-product">
      {/* Card component for styling */}
      <Card cardClass={"product-card"}>
        <h3>Cambiar Contraseña</h3>
        {/* Form for password change */}
        <form onSubmit={changePass} className="--form-control">
          <input
            type="password"
            placeholder="Contraseña Anterior"
            required
            name="oldPassword"
            value={oldPassword}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Nueva Contraseña"
            required
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Repetir Contraseña"
            required
            name="password2"
            value={password2}
            onChange={handleInputChange}
          />
          {/* Button to submit the form */}
          <button type="submit" className="btnSave">
            Cambiar Contraseña
          </button>
        </form>
      </Card>
    </div>
  );
};

// Exporting the component
export default ChangePassword;
