import React from 'react';
import '../Main/Main.css';
import '../App/App.css';
import About from '../About/About';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';

const Main = ({
  onLoginClick,
  onSignOut,
  onMenuClick,
  isMenuOpen,
  onMenuClose,
  articles,
  preloader,
  notFound,
  loggedIn,
  onSearchNews,
  keyword,
  setKeyword,
  haveNews,
  onArticleSave,
  onArticleDelete
}) => {

  return (
    <section className="main">
       <div className="main__overlay">
        <Header
          onLoginClick={onLoginClick}
          onMenuClick={onMenuClick}
          isMenuOpen={isMenuOpen}
          onMenuClose={onMenuClose}
          loggedIn={loggedIn}
          onSignOut={onSignOut}
        />
        <SearchForm
          keyword={keyword}
          onSearchNews={onSearchNews}
          setKeyword={setKeyword}
        />
      </div>
      {preloader && <Preloader />}
      {notFound && <NotFound />}
      {haveNews &&
        <NewsCardList
          articles={articles}
          loggedIn={loggedIn}
          onArticleSave={onArticleSave}
          onArticleDelete={onArticleDelete}
        />
      }
      <About />
    </section>
  )
}

export default Main