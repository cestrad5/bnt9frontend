import { useNavigate } from 'react-router-dom';
import heroImg from '../../assets/logo.svg';

/**
 * Header component for the application.
 * @returns {JSX.Element} - Rendered Header component.
 */
const Header = () => {
  const navigate = useNavigate();
  // const name = useSelector(selectName); // Commented out as it's not used in the current version

  /**
   * Handles the navigation to the home page.
   */
  const goHome = () => {
    navigate('/');
  };

  // Rendered JSX
  return (
    <div className="--pad header">
      <div className="--flex-center">
        <h3>
          <div className="logo">
            {/* Logo with a clickable image, navigating to the home page */}
            <img src={heroImg} alt="Logo Bonneto con Amor" style={{ cursor: 'pointer' }} onClick={goHome} />
          </div>
        </h3>
      </div>
    </div>
  );
};

export default Header;
