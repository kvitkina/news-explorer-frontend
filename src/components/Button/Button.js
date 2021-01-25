import React from 'react';
import '../Button/Button.css';

const Button = ({ name, modifier, icon, onClick, onSubmit, type }) => {
  return (
  <button className={`button button_${modifier}`} onClick={onClick} onSubmit={onSubmit} type={type}>
    {name}
    {icon}
  </button>
  )
}

export default Button