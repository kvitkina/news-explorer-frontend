import React from 'react';
import './MenuIcon.css';
import { useLocation } from 'react-router-dom';

const MenuIcon = ({ onClick, isMenuOpen }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <svg
      className={`menu-icon ${isMenuOpen && 'menu-icon_hidden'} `}
      onClick={onClick} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="16" height="2" fill={path === '/' ? '#FFF' : '#1A1B22'}/>
      <rect x="4" y="14" width="16" height="2" fill={path === '/' ? '#FFF' : '#1A1B22'}/>
    </svg>
  )
}

export default MenuIcon