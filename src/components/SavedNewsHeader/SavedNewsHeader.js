import React from 'react';
import '../SavedNewsHeader/SavedNewsHeader.css';
import '../App/App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const SavedNewsHeader = ({ savedArticles }) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className="saved-news-header page__section">
      <p className="saved-news-header__page-name">Сохраненные статьи</p>
      <h2 className="saved-news-header__title">
        {currentUser.name}, у вас {savedArticles.length} {' '}
        {savedArticles.length >= 3
          ? "сохраненных статей"
          : "сохраненные статьи"
        && savedArticles.length === 0
          ? "сохраненных статей"
          : "сохраненные статьи"
        && savedArticles.length === 1
          ? "сохраненная статья"
          : "сохраненные статьи"
          }
      </h2>
      <p className="saved-news-header__words">По ключевый словам:
        <span className="saved-news-header__words saved-news-header__words_span"> Природа, Тайга и 2-м другим</span>
      </p>
    </section>
  )
}

export default SavedNewsHeader