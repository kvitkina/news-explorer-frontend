import React from 'react';
import '../Navigation/Navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <NavLink
        exact to='/'
        className="navigation__item navigation__item-main"
         activeClassName="navigation__item-main_active"
      >
        Главная
      </NavLink>
      <NavLink
        exact to='/saved-news'
        className="navigation__item navigation__item-news"
        activeClassName="navigation__item-news_active"
      >
        Сохранённые статьи
      </NavLink>
    </nav>
  )
}

export default Navigation