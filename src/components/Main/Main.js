import React from 'react';
import '../Main/Main.css';
import '../App/App.css';
import About from '../About/About';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Main = ({ onLogin, onMenuClick, isMenuOpen, onMenuClose, articles, preloader, notFound, loggedIn }) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className="main">
       <div className="main__overlay">
        <Header
          onLogin={onLogin}
          onMenuClick={onMenuClick}
          isMenuOpen={isMenuOpen}
          onMenuClose={onMenuClose}
          loggedIn={loggedIn}
        />
        <SearchForm />
      </div>
      {preloader && <Preloader />}
      {notFound && <NotFound />}
      <NewsCardList articles={articles} />
      <About />
    </section>
  )
}

export default Main