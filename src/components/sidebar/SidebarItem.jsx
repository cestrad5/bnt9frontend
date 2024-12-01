import React, { useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

/**
 * Determines the CSS class for an active link.
 * @param {object} props - React props.
 * @param {boolean} props.isActive - Indicates if the link is active.
 * @returns {string} - CSS class for the link.
 */
const activeLink = ({ isActive }) => (isActive ? 'active' : 'link');

/**
 * Determines the CSS class for an active sublink.
 * @param {object} props - React props.
 * @param {boolean} props.isActive - Indicates if the sublink is active.
 * @returns {string} - CSS class for the sublink.
 */
const activeSublink = ({ isActive }) => (isActive ? 'active' : 'link');

/**
 * SidebarItem component that represents a single item in the sidebar menu.
 * @param {object} props - React props.
 * @param {object} props.item - Sidebar item data.
 * @param {boolean} props.isOpen - Indicates if the sidebar is open.
 * @returns {JSX.Element} - Rendered component.
 */
const SidebarItem = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);

  if (item.childrens) {
    return (
      <div className={expandMenu ? 'sidebar-item s-parent open' : 'sidebar-item s-parent '}>
        <div className='sidebar-title'>
          <span>
            {item.icon && <div className='icon'>{item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
          </span>
          <MdKeyboardArrowRight size={25} color='#000000' className='arrow-icon' onClick={() => setExpandMenu(!expandMenu)} />
        </div>
        <div className='sidebar-content'>
          {item.childrens.map((child, index) => {
            return (
              <div key={index} className='s-child'>
                <NavLink to={child.path} className={activeSublink}>
                  <div className='sidebar-item'>
                    <div className='sidebar-title'>
                      <span>
                        {child.icon && <div className='icon'>{child.icon}</div>}
                        {isOpen && <div>{child.title}</div>}
                      </span>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink to={item.path} className={activeLink}>
        <div className='sidebar-item s-parent'>
          <div className='sidebar-title'>
            <span>
              {item.icon && <div className='icon'>{item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
          </div>
        </div>
      </NavLink>
    );
  }
};

export default SidebarItem;
