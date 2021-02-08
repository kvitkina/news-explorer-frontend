import React from 'react';
import { useLocation } from 'react-router-dom';
import '../NewsCardList/NewsCardList.css';
import '../App/App';
import NewsCard from '../NewsCard/NewsCard';

const NewsCardList = ({ children, articles, onLoginClick, savedArticles, loggedIn, keyword, onArticleSave, onArticleDelete }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
    {path === "/" &&
    <section className="cards page__section">
       <h2 className="cards__title">Результаты поиска</h2>
      <ul className="cards__list">
       {articles.map((article, i) => {
         return <NewsCard
           key={i}
           owner={article.owner}
           _id={article._id}
           link={article.url}
           image={article.urlToImage}
           title={article.title}
           date={article.publishedAt}
           text={article.description}
           source={article.source.name}
           loggedIn={loggedIn}
           keyword={keyword}
           onArticleSave={onArticleSave}
           onArticleDelete={onArticleDelete}
           onLoginClick={onLoginClick}
           savedArticles={savedArticles}
         />
       })}
      </ul>
      {children}
      </section>}

      {path === "/saved-news" &&
      <section className="cards page__section">
      <ul className="cards__list">
       {savedArticles.map((savedArticle, i) => {
         console.log(savedArticle)
         return <NewsCard
           key={i}
           _id={savedArticle._id}
           owner={savedArticle.owner}
           link={savedArticle.link}
           image={savedArticle.image}
           title={savedArticle.title}
           date={savedArticle.date}
           text={savedArticle.text}
           source={savedArticle.source}
           loggedIn={loggedIn}
           keyword={savedArticle.keyword}
           onArticleDelete={onArticleDelete}
         />
       })}
      </ul>
    </section>}
</>
  )
}

export default NewsCardList