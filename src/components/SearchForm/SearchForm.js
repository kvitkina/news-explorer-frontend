import React from 'react';
import '../SearchForm/SearchForm.css';
import '../App/App';
import Button from '../Button/Button';

const SearchForm = ({ onSearchNews, keyword, setKeyword }) => {

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchNews(keyword)
  }

  return (
    <section className="search">
      <h1 className="search__title">Что творится в мире?</h1>
      <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <input
          className="search__input"
          type="text"
          placeholder="Введите тему новости"
          value={keyword || ''}
          onChange={handleKeywordChange}
          required
        />
        <span className="search__error"></span>
        <Button name="Искать" modifier="search"/>
      </form>
    </section>
  )
}

export default SearchForm