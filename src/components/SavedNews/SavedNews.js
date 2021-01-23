import React from 'react';
import '../SavedNews/SavedNews.css';
import '../App/App.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Header from '../Header/Header';


const SavedNews = ({ onMenuClick, isMenuOpen, onSignOut }) => {
  return (
    <section className="saved-news">
      <Header
        onMenuClick={onMenuClick}
        isMenuOpen={isMenuOpen}
        onSignOut={onSignOut}
      />
      <SavedNewsHeader />
      <NewsCardList />
    </section>
  )
}

export default SavedNews