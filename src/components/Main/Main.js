import React from 'react';
import '../Main/Main.css';
import '../App/App.css';
import About from '../About/About';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';


const Main = ({ onLogin, onMenuClick, isMenuOpen }) => {
  return (
    <section className="main">
       <div className="main__overlay">
        <Header
          onLogin={onLogin}
          onMenuClick={onMenuClick}
          isMenuOpen={isMenuOpen}
        />
        <SearchForm />
      </div>
      <Preloader />
      <NotFound />
      <NewsCardList />
      <About />
    </section>
  )
}

export default Main