import React from 'react';
import { useLocation } from 'react-router-dom';
import '../NewsCardList/NewsCardList.css';
import '../App/App';
import Button from '../Button/Button';
import NewsCard from '../NewsCard/NewsCard';


const NewsCardList = ({ articles, savedArticles, loggedIn, keyword, onArticleSave, onArticleDelete }) => {
  const location = useLocation();
    const path = location.pathname;

    // const [toShow, setToShow] = React.useState(3);
    // const articlesToShow = articles.slice(0, toShow);

  return (
    <>
    {path === "/" &&
    <section className="cards page__section">
       <h2 className="cards__title">Результаты поиска</h2>
      <ul className="cards__list">
       {articles.map((article, i) => {
         return <NewsCard
           key={i}
           _id={article.url}
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
         />
       })}
      </ul>
      {/* {articles.length > 3 && <Button onClick={_ => setToShow(toShow + 3)} name="Показать еще" modifier="cards-list"/>} */}
      </section>}

      {path === "/saved-news" &&
      <section className="cards page__section">
      <ul className="cards__list">
       {savedArticles.map((savedArticle, i) => {
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