import React from 'react';
import '../Button/Button.css';

const Button = ({ name, modifier, icon, onClick, onSubmit }) => {
  return (
  <button className={`button button_${modifier}`} onClick={onClick} onSubmit={onSubmit}>
    {name}
    {icon}
  </button>
  )
}

export default Button