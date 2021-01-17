import React from 'react';
import { useLocation } from 'react-router-dom';
import '../NewsCard/NewsCard.css';
import CardButton from '../CardButton/CardButton';
import BookmarkIcon from '../icons/BookmarkIcon';
import TrashIcon from '../icons/TrashIcon';


const NewsCard = ({ image, date, title, subtitle, link, href}) => {
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
      <img src={image} className="card__image" alt={title}/>
      <div className="card__description">
        <p className="card__date">{date}</p>
        <div className="card__text-container">
          <h3 className="card__title">{title}</h3>
          <p className="card__subtitle">{subtitle}</p>
        </div>
        <a href={href} className="card__link">{link}</a>
      </div>
    </li>
  )
}

export default NewsCard