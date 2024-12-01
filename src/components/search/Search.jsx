import React from 'react';
import { BiSearch } from 'react-icons/bi';

/**
 * A search input component with an icon.
 * @param {Object} props - React component props.
 * @param {string} props.value - Current value of the search input.
 * @param {Function} props.onChange - Callback function to handle changes in the search input.
 * @returns {JSX.Element} - Rendered component.
 */
const Search = ({ value, onChange }) => {
  return (
    <div className="search">
      <BiSearch size={20} className="icon" color='#000000' />
      <input type='text' placeholder='Buscar' value={value} onChange={onChange} />
    </div>
  );
};

export default Search;
