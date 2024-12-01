import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { getUser } from "../../services/authService";

/**
 * Profile component displays user profile information.
 * It fetches the user data from the backend and displays the user's name, email, phone, and role.
 * Users can navigate to the "Edit Profile" page by clicking the "Editar Perfil" button.
 */
const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetches user data from the backend and updates the component state.
   */
  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      try {
        const data = await getUser();
        setProfile(data);
        setIsLoading(false);
        await dispatch(SET_USER(data));
        await dispatch(SET_NAME(data.name));
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    }
    getUserData();
  }, [dispatch]);

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}
      <>
        {!isLoading && profile === null ? (
          <p>Algo salió mal, por favor recarga la página...</p>
        ) : (
          <Card cardClass={"profile-card --flex-dir-column"}>
            {/* Profile Photo Section (Commented out for simplicity) */}
            {/* <span className="profile-photo">
              <img src={profile?.photo} alt="profilepic" />
            </span> */}

            {/* Profile Information Section */}
            <span>
              <h4> Nombre: {profile?.name}</h4>
              <h4> Correo: {profile?.email}</h4>
              <h4> Celular: {profile?.phone}</h4>
              <h4> Rol: {profile?.role}</h4>
              <div>
                <Link to="/edit-profile">
                  <button className="btnSave">Editar Perfil</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
