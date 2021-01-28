import React from 'react';
import '../SavedNews/SavedNews.css';
import '../App/App.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Header from '../Header/Header';


const SavedNews = ({ onMenuClick, isMenuOpen, onSignOut, loggedIn, savedArticles, keyword }) => {
  return (
    <section className="saved-news">
      <Header
        onMenuClick={onMenuClick}
        isMenuOpen={isMenuOpen}
        onSignOut={onSignOut}
        loggedIn={loggedIn}
      />
      <SavedNewsHeader savedArticles={savedArticles} />
      <NewsCardList
        loggedIn={loggedIn}
        keyword={keyword}
        savedArticles={savedArticles} />
    </section>
  )
}

export default SavedNews