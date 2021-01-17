import React from 'react';
import '../Button/Button.css';

const Button = ({ name, modifier, icon, onClick }) => {
  return (
  <button className={`button button_${modifier}`} onClick={onClick}>
    {name}
    {icon}
  </button>
  )
}

export default Button