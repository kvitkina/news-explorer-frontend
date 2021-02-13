import React from 'react';
import '../Button/Button.css';

const Button = ({ name, modifier, icon, onClick, onSubmit, type, isDisabled }) => {
  return (
  <button
    className={`button button_${modifier}`}
    onClick={onClick}
    onSubmit={onSubmit}
    type={type}
    disabled={isDisabled}
  >
    {name}
    {icon}
  </button>
  )
}

export default Button