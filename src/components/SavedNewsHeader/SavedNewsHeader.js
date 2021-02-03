import React from 'react';
import '../SavedNewsHeader/SavedNewsHeader.css';
import '../App/App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const SavedNewsHeader = ({ savedArticles }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const arrayCopy = [...savedArticles];

  const keywordsArray = arrayCopy.reduce((sum, item) => {
    sum[item.keyword] = (sum[item.keyword] || 0) + 1;
    return sum;
  }, {});
  console.log(keywordsArray)

  const keysOnly = Object.keys(keywordsArray).sort(function (a, b) {
    return keywordsArray[a] > keywordsArray[b] ? -1 : 1;
  });
  console.log(keysOnly)

  const keywordsRender = (arr) => {
    if(arr.length > 3) {
      return arr.slice(0, 2).join(", ") + " и другим"
    } else if(arr.length <=3) {
      return arr.join(", ")
    }
  }

  return (
    <section className="saved-news-header page__section">
      <p className="saved-news-header__page-name">Сохраненные статьи</p>
      <h2 className="saved-news-header__title">
        {currentUser.name}, у вас {savedArticles.length} {' '}
        {savedArticles.length >= 5 || savedArticles.length === 0
          ? "сохраненных статей"
          : "сохраненные статьи"}
      </h2>
      <p className="saved-news-header__words"> {keysOnly.length === 1
        ? "По rлючевому слову: "
        : "По ключевым словам: "  }
        <span className="saved-news-header__words saved-news-header__words_span">
         {keywordsRender(keysOnly)}
        </span>
      </p>
    </section>
  )
}

export default SavedNewsHeader