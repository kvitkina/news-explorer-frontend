import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import '../PopupWithForm/PopupWithForm.css';

const RegisterPopup = ({ onClose, isOpen, onOverlayClose, onLoginPopupOpen, onRegister, submitError }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister(email,password,name)
  }

  return (
    <PopupWithForm
      title="Регистрация"
      name="register"
      buttonName="Зарегистрироваться"
      linkName="Войти"
      onClose={onClose}
      isOpen={isOpen}
      onOverlayClose={onOverlayClose}
      onCurrentPopupOpen={onLoginPopupOpen}
      onSubmit={handleSubmit}
      submitError={submitError}
    >
      <h4 className="popup__input-name">Email</h4>
      <div className="popup__input-container">
        <input
          type="email"
          id="reg-email"
          name="email"
          value={email || ''}
          onChange={handleEmailChange}
          className="popup__input"
          placeholder="Введите почту"
          required
        />
        <span className="popup__input-error" id="email-reg-error"></span>
      </div>
      <h4 className="popup__input-name">Пароль</h4>
      <div className="popup__input-container">
        <input
          type="password"
          id="reg-password"
          name="password"
          value={password || ''}
          onChange={handlePasswordChange}
          className="popup__input"
          placeholder="Введите пароль"
          minLength="4"
          maxLength="12"
          required
        />
        <span className="popup__input-error" id="password-reg-error"></span>
        </div>
        <h4 className="popup__input-name">Имя</h4>
        <div className="popup__input-container">
          <input
            type="text"
            id="name"
            name="name"
            value={name || ''}
          onChange={handleNameChange}
            className="popup__input"
            placeholder="Введите своё имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__input-error" id="name-error"></span>
          </div>
    </PopupWithForm>
  )
}

export default RegisterPopup