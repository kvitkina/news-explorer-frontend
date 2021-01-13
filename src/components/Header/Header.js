import React from 'react';
import '../Header/Header.css';
import '../App/App.css';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import LogoutIcon from '../icons/LogoutIcon';
import MenuIcon from '../icons/MenuIcon';

const Header = ({ onLogin, onMenuClick, isMenuOpen }) => {
    const location = useLocation();
    const path = location.pathname;

  return (
    <section
      className={`header
        ${isMenuOpen && 'header_black'}
        ${path === '/saved-news' && 'header_saved-news'}
        page__section`
      }
      >
      <Link to='/' className={`logo ${path === '/saved-news' && 'logo_saved-news'}`}>NewsExplorer</Link>
      <MenuIcon onClick={onMenuClick} isMenuOpen={isMenuOpen}/>
      <div className={` header__container ${isMenuOpen && 'header__container_visible'}`}>
        <Navigation />
        {path === '/' ?
          <Button name="Авторизироваться" modifier="header-auth" onClick={onLogin} /> :
          <Button name="Грета" icon={<LogoutIcon/>} modifier="header-name"/>
        }
      </div>
    </section>
  )
}

export default Header;