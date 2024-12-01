import React from 'react';
import loaderImg from '../../assets/loader.gif';
import ReactDOM from 'react-dom';

/**
 * Loader component that displays a loading spinner using a portal.
 * @returns {React.ReactPortal} - Rendered Loader component using a portal.
 */
const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
      <div className='loader'>
        <img src={loaderImg} alt='loading' />
      </div>
    </div>,
    document.getElementById('loader')
  );
};

/**
 * SpinnerImg component that displays a loading spinner.
 * @returns {JSX.Element} - Rendered SpinnerImg component.
 */
export const SpinnerImg = () => {
  return (
    <div className='--center-all'>
      <img src={loaderImg} alt='loading' />
    </div>
  );
};

export default Loader;
