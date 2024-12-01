import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { selectUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authService";
import ChangePassword from "../../components/changePassword/ChangePassword";

/**
 * EditProfile component allows users to edit their profile information.
 * Users can update their name, phone, and role.
 * It includes a form with input fields for editing the profile details.
 * It also provides an option to change the password using the ChangePassword component.
 */
const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user?.email) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    role: user?.role,
  };
  const [profile, setProfile] = useState(initialState);
  const [selectedRole, setSelectedRole] = useState("Admin");

  /**
   * Handles the input change event.
   * Updates the corresponding field in the profile state.
   * @param {Object} e - Event object.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  /**
   * Handles the form submission to save the edited profile.
   * Sends a request to update the user's profile information.
   * Redirects to the profile page after successful update.
   * @param {Object} e - Event object.
   */
  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = {
        name: profile.name,
        phone: profile?.phone,
        role: selectedRole,
      };

      await updateUser(formData);
      toast.success("User updated");
      navigate("/profile");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* Profile Editing Form */}
      <div className="add-product">
        {isLoading && <Loader />}
        <Card cardClass={"card --flex-dir-column"}>
          <form className="--form-control --m" onSubmit={saveProfile}>
            <span className="profile-data">
              <p>
                <label>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={profile?.name}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Correo:</label>
                <input
                  className="emailDisabled"
                  type="text"
                  name="email"
                  value={profile?.email}
                  disabled
                />
                <span className="email-disabled-message">
                  El Correo no puede ser cambiado.
                </span>
              </p>
              <p>
                <label>Celular:</label>
                <input
                  type="text"
                  name="phone"
                  value={profile?.phone}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Rol:</label>
                <div>
                  <label htmlFor="selectRole">Selecciona una opción: </label>
                  <select
                    className="selectRole"
                    id="selectRole"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Sales">Ventas</option>
                    <option value="Production">Produccion</option>
                  </select>
                </div>
              </p>
              <div>
                <button className="btnSave">Guardar Cambios</button>
              </div>
            </span>
          </form>
        </Card>
        <br />
      </div>

      {/* Change Password Section */}
      <div>
        <ChangePassword />
      </div>
    </>
  );
};

export default EditProfile;
