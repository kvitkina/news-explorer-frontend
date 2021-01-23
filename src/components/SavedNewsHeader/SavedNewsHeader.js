import React from 'react';
import '../SavedNewsHeader/SavedNewsHeader.css';
import '../App/App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const SavedNewsHeader = () => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className="saved-news-header page__section">
      <p className="saved-news-header__page-name">Сохраненные статьи</p>
      <h2 className="saved-news-header__title">Грета, у вас 5 сохраненных статей</h2>
      <p className="saved-news-header__words">По ключевый словам:
        <span className="saved-news-header__words saved-news-header__words_span"> Природа, Тайга и 2-м другим</span>
      </p>
    </section>
  )
}

export default SavedNewsHeader