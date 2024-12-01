import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

/**
 * Layout component that includes a common header and footer for the application.
 * @param {Object} props - React props containing children components.
 * @returns {JSX.Element} - Rendered Layout component.
 */
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: '80vh' }} className="--pad">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
