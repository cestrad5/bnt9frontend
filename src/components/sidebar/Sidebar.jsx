import React, { useState, useEffect } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { menu, menub, menuProduction } from '../../data/sidebar';

import SidebarItem from './SidebarItem';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

import { getUser } from '../../services/authService';

/**
 * Sidebar component with dynamic menu items based on user roles.
 * @param {object} props - React props.
 * @param {ReactNode} props.children - Child components.
 * @returns {JSX.Element} - Rendered component.
 */
const Sidebar = ({ children }) => {
  const [roleUser, setRoleUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Add a 3-second (3000 ms) timer before displaying components
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // After 3 seconds, end the loading state
    }, 200);

    return () => clearTimeout(loadingTimeout); // Clear the timer on component unmount
  }, []);

  // Get the user's role
  useEffect(() => {
    getUser()
      .then((data) => {
        const roleUser = data.role[0];
        setRoleUser(roleUser);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const [isOpen, setIsOpen] = useState(window.innerWidth > 768 ? true : false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="layout">
      {isLoading ? ( // Display a loading message while isLoading is true
        <div className="loading">
          Loading...
        </div>
      ) : (
        <>
          <div className="sidebar" style={{ width: isOpen ? '230px' : '60px' }}>
            <div className="top_section">
              <div className={`logo ${isOpen ? '' : 'logo-hidden'}`}>
                <Logout />
              </div>
              <div className="bars" style={{ marginLeft: isOpen ? '130px' : '0px' }}>
                <HiMenuAlt3 onClick={toggle} color='#000000'/>
              </div>
            </div>
            {(roleUser === 'Admin' ? (menu) : roleUser === 'Sales' ? menub : menuProduction).map((item, index) => {
              return <SidebarItem key={index} item={item} isOpen={isOpen} />;
            })}
          </div>
          <main style={{ paddingLeft: isOpen ? '230px' : '60px', transition: 'all .5s' }}>
            {children}
          </main>
        </>
      )}
    </div>
  );
};

export default Sidebar;
