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

  const keysOnly = Object.keys(keywordsArray).sort(function (a, b) {
    return keywordsArray[a] > keywordsArray[b] ? -1 : 1;
  });

  const keywordsRender = (arr) => {
    if(arr.length > 3) {
      return arr.slice(0, 2).join(", ") + " и "
    } else if(arr.length <=3) {
      return arr.join(", ")
    }
  }
  const othersKeywords = (arr) => {
    if((arr.length - 2) >=2 && (arr.length - 2) <=4) {
      return arr.length - 2 + "-м другим"
    } else if((arr.length - 2) >=5) {
      return arr.length - 2 + "-и другим"
    }
  }

  const savedArticlesText = (length) => {
    if(length >= 5 || length === 0){
      return "сохраненных статей"
    } else if (length < 5 && length > 1){
      return "сохраненные статьи"
    } else if(length === 1) {
      return "сохраненная статья"
    }
  }
  return (
    <section className="saved-news-header page__section">
      <p className="saved-news-header__page-name">Сохраненные статьи</p>
      <h2 className="saved-news-header__title">
        {currentUser.name}, у вас {savedArticles.length} {' '}
        {savedArticlesText(savedArticles.length)}
      </h2>
      <p className="saved-news-header__words"> {keysOnly.length === 1
        ? "По rлючевому слову: "
        : "По ключевым словам: " }
        <span className="saved-news-header__words saved-news-header__words_span">
         {keywordsRender(keysOnly)} {keysOnly.length > 3 && othersKeywords(keysOnly)}
        </span>
      </p>
    </section>
  )
}

export default SavedNewsHeader