import React from 'react';
import '../SavedNews/SavedNews.css';
import '../App/App.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Header from '../Header/Header';


const SavedNews = ({ onMenuClick, onMenuClose, isMenuOpen, onSignOut, loggedIn, savedArticles, keyword, onArticleDelete }) => {
  return (
    <section className="saved-news">
      <Header
        onMenuClick={onMenuClick}
        isMenuOpen={isMenuOpen}
        onMenuClose={onMenuClose}
        onSignOut={onSignOut}
        loggedIn={loggedIn}
      />
      <SavedNewsHeader savedArticles={savedArticles} />
      <NewsCardList
        loggedIn={loggedIn}
        keyword={keyword}
        savedArticles={savedArticles}
        onArticleDelete={onArticleDelete}/>
    </section>
  )
}

export default SavedNews