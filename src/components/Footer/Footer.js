import React from 'react';
import './Footer.css';
import '../App/App.css';
import { Link } from 'react-router-dom';
import { links, socialIcons } from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="footer page__section">
      <h4 className="footer__author">&copy; {new Date().getFullYear()} Supersite, Powered by News API</h4>
      <div className="footer__nav">
        <Link className="footer__nav-item" to='/'>Главная</Link>
        <a className="footer__nav-item" href={links.praktikum} target="_blank" rel="noreferrer">Яндекс.Практикум</a>
      </div>
      <div className="footer__icons">
        {socialIcons.map(({ Icon, link, id }) => {
          return <a key={id} className="footer__icon" href={link} target="_blank" rel="noreferrer">
          <Icon/>
          </a>
        })}
      </div>
    </footer>
  );
}

export default Footer;
