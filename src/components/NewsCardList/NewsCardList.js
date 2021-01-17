import React from 'react';
import { useLocation } from 'react-router-dom';
import '../NewsCardList/NewsCardList.css';
import '../App/App';
import Button from '../Button/Button';
import NewsCard from '../NewsCard/NewsCard';
import { articles } from '../../utils/constants';


const NewsCardList = () => {
  const location = useLocation();
    const path = location.pathname;
  return (
    <section className="cards page__section">
      {path === "/" && <h2 className="cards__title">Результаты поиска</h2>}
      <ul className="cards__list">
       {articles.map((article) => {
         return <NewsCard
           key={article.id}
           image={article.image}
           title={article.title}
           subtitle={article.subtitle}
           date={article.date}
           link={article.link}
           href={article.href}
         />
       })}
      </ul>
      <Button name="Показать еще" modifier="cards-list"/>
    </section>

  )
}

export default NewsCardList