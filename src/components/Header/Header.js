import React from 'react';
import '../Header/Header.css';
import '../App/App.css';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import LogoutIcon from '../icons/LogoutIcon';


const Header = () => {
    const location = useLocation();
    const path = location.pathname;

  return (
    <section className={`header ${path === '/saved-news' && 'header_saved-news'} page__section`}>
      <Link to='/' className={`logo ${path === '/saved-news' && 'logo_saved-news'}`}>NewsExplorer</Link>
      <Navigation />
      {path === '/' ? <Button name="Авторизироваться" modifier="header-auth"/> :
        <Button name="Грета" icon={<LogoutIcon/>} modifier="header-name"/>}
    </section>
  )
}

export default Header;