import React from 'react';
import '../Header/Header.css';
import '../App/App.css';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import LogoutIcon from '../icons/LogoutIcon';
import MenuIcon from '../icons/MenuIcon';
import CloseIcon from '../icons/CloseIcon';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Header = ({ onLoginClick, onMenuClick, isMenuOpen, onMenuClose, onSignOut, loggedIn }) => {
  const location = useLocation();
  const path = location.pathname;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section
      className={`header
        ${isMenuOpen && 'header_black'}
        ${path === '/saved-news' && 'header_saved-news header_white'}
        page__section`
      }
      >
      <Link to='/' className={`logo ${path === '/saved-news' && 'logo_saved-news'}`}>NewsExplorer</Link>
      <MenuIcon onClick={onMenuClick} isMenuOpen={isMenuOpen}/>
      <CloseIcon isMenuOpen={isMenuOpen} onClick={onMenuClose}/>
      <div className={` header__container
        ${isMenuOpen && 'header__container_visible'}
        ${path === '/saved-news' && 'header__container_white'}
        `}>
        <Navigation loggedIn={loggedIn} />
        {!loggedIn ?
          <Button name="Авторизироваться" modifier="header-auth" onClick={onLoginClick} /> :
          <Button name={currentUser.name} icon={<LogoutIcon onClick={onSignOut}/>} modifier="header-name"/>
        }
      </div>
    </section>
  )
}

export default Header;