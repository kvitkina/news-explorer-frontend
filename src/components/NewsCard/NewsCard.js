import React from 'react';
import { useLocation } from 'react-router-dom';
import '../NewsCard/NewsCard.css';
import CardButton from '../CardButton/CardButton';
import BookmarkIcon from '../icons/BookmarkIcon';
import TrashIcon from '../icons/TrashIcon';

const NewsCard = ({ article }) => {
  const [ isHovered, setIsHovered ] = React.useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const location = useLocation();
  const path = location.pathname;
  return (
    <li className="card">
      {path === "/saved-news" && <CardButton modifier="keyword" content="Природа"/>}
        <CardButton
          content={path ==="/" ? <BookmarkIcon
            hover={isHovered}
            onHoverEnter={handleMouseEnter}
            onHoverLeave={handleMouseLeave}
          />
         :
         <TrashIcon
          hover={isHovered}
          onHoverEnter={handleMouseEnter}
          onHoverLeave={handleMouseLeave}
         />}
        />
        <CardButton
          content={path ==="/" ? "Войдите, чтобы сохранять статьи" : "Убрать из сохранённых"}
          modifier="tooltip"
        />
      <img src={article.urlToImage} className="card__image" alt={article.title}/>
      <div className="card__description">
        <p className="card__date">{article.publishedAt}</p>
        <div className="card__text-container">
          <h3 className="card__title">{article.title}</h3>
          <p className="card__subtitle">{article.description}</p>
        </div>
        <a href={article.url} className="card__link">{article.source.name}</a>
      </div>
    </li>
  )
}

export default NewsCard