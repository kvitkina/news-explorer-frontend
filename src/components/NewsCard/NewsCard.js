import React from 'react';
import { useLocation } from 'react-router-dom';
import '../NewsCard/NewsCard.css';
import CardButton from '../CardButton/CardButton';
import BookmarkIcon from '../icons/BookmarkIcon';
import TrashIcon from '../icons/TrashIcon';
import BookmarkIconActive from '../icons/BookmarkIconActive';


const NewsCard = ({ _id, title, text, date, source, link, image, owner, loggedIn, keyword, onArticleSave, onArticleDelete, onLoginClick }) => {
  const [ isHovered, setIsHovered ] = React.useState(false);
  const [ isSaved, setIsSaved] = React.useState(false);
  const newsDate = new Date(date);
  const options = { day: "numeric", month: "long", year: "numeric" };

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleBookmarkIconClick = () => {
    onArticleSave({ keyword, title, text, date: newsDate, source, link, image, owner })
    setIsSaved(true)
  }
  const handleTrashIconClick = () => {
    onArticleDelete(_id)
    setIsSaved(false)
  }

  const location = useLocation();
  const path = location.pathname;
  return (
    <li className="card">
      {path === "/saved-news" && <CardButton modifier="keyword" content={keyword} />}
      {path ==="/" ? <CardButton
          content={!isSaved ?
            <BookmarkIcon
              hover={isHovered}
              onHoverEnter={handleMouseEnter}
              onHoverLeave={handleMouseLeave}
              onClick={loggedIn ? handleBookmarkIconClick : onLoginClick}
            />
          : <BookmarkIconActive onClick={handleTrashIconClick} /> }
           />
          : <CardButton
          content= {<TrashIcon
              hover={isHovered}
              onHoverEnter={handleMouseEnter}
              onHoverLeave={handleMouseLeave}
              onClick={handleTrashIconClick}
          /> }/>
            }

        {!loggedIn &&<CardButton
          content={path ==="/" ? "Войдите, чтобы сохранять статьи" : "Убрать из сохранённых"}
          modifier="tooltip"
        />}
      <img src={image} className="card__image" alt={title}/>
      <div className="card__description">
        <p className="card__date">{newsDate.toLocaleDateString('ru', options)}</p>
        <div className="card__text-container">
          <h3 className="card__title">{title}</h3>
          <p className="card__subtitle">{text}</p>
        </div>
        <a href={link} target="_blank" rel="noreferrer" className="card__link">{source}</a>
      </div>
    </li>
  )
}

export default NewsCard