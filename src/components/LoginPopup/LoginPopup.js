import React from 'react';
import '../PopupWithForm/PopupWithForm.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const LoginPopup = ({ onClose, isOpen, onOverlayClose, onRegisterPopupOpen }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <PopupWithForm
      title="Вход"
      name="login"
      buttonName="Войти"
      linkName="Зарегистрироваться"
      onClose={onClose}
      isOpen={isOpen}
      onOverlayClose={onOverlayClose}
      onCurrentPopupOpen={onRegisterPopupOpen}
    >
      <h4 className="popup__input-name">Email</h4>
      <div className="popup__input-container">
        <input
          type="email"
          id="email"
          name="email"
          value={email || ''}
          onChange={handleEmailChange}
          className="popup__input"
          placeholder="Введите почту"
          required
        />
        <span className="popup__input-error" id="email-error"></span>
      </div>
      <h4 className="popup__input-name">Пароль</h4>
      <div className="popup__input-container">
        <input
          type="password"
          id="password"
          name="password"
          value={password || ''}
          onChange={handlePasswordChange}
          className="popup__input"
          placeholder="Введите пароль"
          minLength="4"
          maxLength="12"
          required
        />
        <span className="popup__input-error" id="password-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default LoginPopup