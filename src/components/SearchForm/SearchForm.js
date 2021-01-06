import React from 'react';
import '../SearchForm/SearchForm.css';
import '../App/App';
import Button from '../Button/Button';

const SearchForm = () => {
  return (
    <section className="search">
      <h1 className="search__title">Что творится в мире?</h1>
      <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <form className="search__form" noValidate>
        <input
          className="search__input"
          type="text"
          placeholder="Введите тему новости"
          required
        />
        <Button name="Искать" modifier="search"/>
      </form>
    </section>
  )
}

export default SearchForm