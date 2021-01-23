import React from 'react';
import { useLocation } from 'react-router-dom';
import '../NewsCardList/NewsCardList.css';
import '../App/App';
import Button from '../Button/Button';
import NewsCard from '../NewsCard/NewsCard';


const NewsCardList = ({ articles }) => {
  const location = useLocation();
    const path = location.pathname;
  return (
    <section className="cards page__section">
      {path === "/" && <h2 className="cards__title">Результаты поиска</h2>}
      <ul className="cards__list">
       {articles.map((article) => {
         return <NewsCard
           article={article}
           key={article.source.id}
         />
       })}
      </ul>
      <Button name="Показать еще" modifier="cards-list"/>
    </section>

  )
}

export default NewsCardList