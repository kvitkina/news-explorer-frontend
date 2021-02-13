import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import '../PopupWithForm/PopupWithForm.css';

const RegisterPopup = ({ onClose, isOpen, onOverlayClose, onLoginPopupOpen, onRegister }) => {
  const [ formData, setFormData ] = React.useState({});
  const [ formErrors, setFormErrors] = React.useState({});

  const handleInputChange = (e) => {
    const { name } = e.target;
    setFormData ({...formData, [name]: e.target.value})
    setFormErrors ({...formErrors, [name]: e.target.validationMessage || ''})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password, name } = formData;
    onRegister(email, password, name)
    setFormData({
      email: '',
      password: '',
      name: ''
    })
  }
  const isDisabled = () => {
    if (
      Object.keys(formData).length === 0 ||
      Object.keys(formData).some(item => !formData[item] || formData[item] === '') ||
      Object.keys(formErrors).some(item => formErrors[item])
    )
    { return true }
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
      isDisabled={isDisabled()}
    >
      <label className="popup__input-name">Email</label>
      <div className="popup__input-container">
        <input
          type="email"
          id="reg-email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
          className="popup__input"
          placeholder="Введите почту"
          required
        />
        <span className="popup__input-error">{formErrors.email}</span>
      </div>
      <label className="popup__input-name">Пароль</label>
      <div className="popup__input-container">
        <input
          type="password"
          id="reg-password"
          name="password"
          value={formData.password || ''}
          onChange={handleInputChange}
          className="popup__input"
          placeholder="Введите пароль"
          minLength="4"
          maxLength="12"
          required
        />
       <span className="popup__input-error">{formErrors.password}</span>
       </div>
       <label className="popup__input-name">Имя</label>
       <div className="popup__input-container">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
          className="popup__input"
          placeholder="Введите своё имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__input-error">{formErrors.name}</span>
        </div>
    </PopupWithForm>
  )
}

export default RegisterPopup

