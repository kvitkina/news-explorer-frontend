import React from 'react';
import './Preloader.css';
import '../App/App.css';

const Preloader = () => {
  return (
    <section className="preloader page__section">
      <div className="preloader__circle"></div>
      <h3 className="preloader__title">Идет поиск новостей...</h3>
    </section>
  );
}

export default Preloader;