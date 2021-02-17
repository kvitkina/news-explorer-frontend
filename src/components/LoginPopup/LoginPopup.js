import React from 'react';
import '../PopupWithForm/PopupWithForm.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const LoginPopup = ({ onClose, isOpen, onOverlayClose, onRegisterPopupOpen, onLogin, submitError }) => {
  const [ formData, setFormData ] = React.useState({ email: '', password: '' });
  const [ formErrors, setFormErrors] = React.useState({});

  const handleInputChange = (e) => {
    const { name } = e.target;
    setFormData ({...formData, [name]: e.target.value})
    setFormErrors ({...formErrors, [name]: e.target.validationMessage || ''})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email,password } = formData
    onLogin(email,password)
  }

  React.useEffect(() => {
    setFormData({ email: '', password: '' })
  }, [isOpen])

  const isDisabled = () => {
    if (
      Object.keys(formData).length === 0 ||
      Object.keys(formData).some(item => !formData[item]) ||
      Object.keys(formErrors).some(item => formErrors[item])
    )
    { return true }
  }

  return (
    <PopupWithForm
      title="Вход"
      name="login"
      linkName="Зарегистрироваться"
      buttonName="Войти"
      onClose={onClose}
      isOpen={isOpen}
      onOverlayClose={onOverlayClose}
      onCurrentPopupOpen={onRegisterPopupOpen}
      onSubmit={handleSubmit}
      isDisabled={isDisabled()}
      submitError={submitError}
    >
      <label className="popup__input-name">Email</label>
      <div className="popup__input-container">
        <input
          type="email"
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
          name="password"
          value={formData.password || ''}
          onChange={handleInputChange}
          className="popup__input"
          placeholder="Введите пароль"
          minLength="8"
          maxLength="12"
          required
        />
        <span className="popup__input-error">{formErrors.password}</span>
      </div>
    </PopupWithForm>
  )
}

export default LoginPopup