import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import heroImg from '../../assets/logo.svg';
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/HiddenLink';
import { Fade, Zoom } from 'react-awesome-reveal';
import SwipeSlider from './SwipeSlider';
import Footer from '../../components/footer/Footer';

/**
 * Home component representing the landing page of the application.
 * Displays navigation links, hero section, product carousel, and footer.
 */
const Home = () => {
  return (
    <>
      <div className='home'>
        {/* Navigation Bar */}
        <nav className='container-home'>
          <Fade>
            <div className='logo'>
              <img src={heroImg} alt='Logo Bonneto con Amor' />
            </div>
            <div className='home-links'>
              <ul>
                {/* Show these links when the user is logged out */}
                <ShowOnLogout>
                  <li>
                    <Link to='/register'>
                      <div className='btnRegister'>
                        Registrar
                      </div>
                    </Link>
                  </li>
                </ShowOnLogout>
                <ShowOnLogout>
                  <li>
                    <Link to='/login'>
                      <div className='btnPrimary'>
                        Iniciar Sesión
                      </div>
                    </Link>
                  </li>
                </ShowOnLogout>
                {/* Show this link when the user is logged in */}
                <ShowOnLogin>
                  <li>
                    <Link to='/dashboard'>
                      <button className='btnPrimary'>
                        Dashboard
                      </button>
                    </Link>
                  </li>
                </ShowOnLogin>
              </ul>
            </div>
          </Fade>
        </nav>

        {/* Hero Section */}
        <section className='heroSlogan'>
          <Zoom>
            <div className='hero-slogan'>
              <h1>
                Experiencias creadas con madera y mucho amor
              </h1>
            </div>
          </Zoom>
        </section>
        {/* End Hero Section */}

        {/* Product Carousel Section */}
        <section className='carouselText'>
          <Fade>
            <div className='carousel'>
              <SwipeSlider />
            </div>
          </Fade>
        </section>

        {/* Section Information (Commented Out) */}
        {/* Uncomment and customize as needed */}
        {/* <section className='heroText'>
          <Fade>
            <div className='hero-text'>
              <div className='mision'>
                <h2>Misión</h2>
                <p>
                  En Bonetto con amor trabajamos día a día para sustituir importaciones asiáticas, con productos locales, brindando alternativas de compra a establecimientos de comercio como cacharrerias, piñaterias, tiendas de variedades y almacenes con surtido para hogar, a un costo competitivo y con tiempos de entrega muy reducidos, generando empleos locales dignos.
                </p>
              </div>

              <div className='vision'>
                <h2>Visión</h2>
                <p>
                  Inventory system control and manage products in the warehouse in real timeand integrated to make it easier to develop your business.
                </p>
              </div>
            </div>
          </Fade>
        </section> */}
        {/* End Section Information */}

        {/* Footer Section */}
        <footer className='footer'>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Home;
