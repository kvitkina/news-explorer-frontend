import React from 'react';
import '../Button/Button.css';

const Button = ({ name, modifier, icon }) => {
  return (
  <button className={`button button_${modifier}`}>
    {name}
    {icon}
  </button>
  )
}

export default Button