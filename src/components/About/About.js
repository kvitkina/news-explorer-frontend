import React from 'react';
import './About.css';
import '../App/App.css';
import photo from '../../images/about.png';

const Preloader = () => {
  return (
    <section className="about page__section">
      <img src={photo} class="about__photo" alt="Фотография автора"></img>
      <div className="about__description">
        <h2 className="about__title">Об авторе</h2>
        <p className="about__paragraph">
          Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.
        </p>
        <p className="about__paragraph">
          Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.
        </p>
      </div>
    </section>
  );
}

export default Preloader;