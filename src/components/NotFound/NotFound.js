import React from 'react';
import '../NotFound/NotFound.css';
import '../App/App.css';
import NotFoundIcon from '../icons/NotFoundIcon';

const NotFound = () => {
  return (
    <section className="not-found page__section">
      <NotFoundIcon />
      <h3 className="not-found__title">Ничего не найдено</h3>
      <p className="not-found__subtitle">К сожалению по вашему запросу ничего не найдено.</p>
    </section>
  )
}

export default NotFound