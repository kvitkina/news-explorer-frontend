import React from 'react';
import '../SavedNews/SavedNews.css';
import '../App/App.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Header from '../Header/Header';


const SavedNews = () => {
  return (
    <section className="saved-news">
      <Header />
      <SavedNewsHeader />
      <NewsCardList />
    </section>
  )
}

export default SavedNews