import React from 'react';
import './CardButton.css';

const CardButton = ({ content, modifier}) => {
  return (
    <button className={`card-button card-button_${modifier}`}>{content}</button>
  )
}

export default CardButton