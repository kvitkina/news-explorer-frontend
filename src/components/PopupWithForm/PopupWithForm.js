import React from 'react';
import '../PopupWithForm/PopupWithForm.css';
import Button from '../Button/Button';
import CloseIcon from '../icons/CloseIcon';

const PopupWithForm = ({
  title, children, name, onSubmit, submitError, onClose, linkName, buttonName, isOpen, onOverlayClose, onCurrentPopupOpen
}) => {
  return (
    <section className={`popup ${isOpen && 'popup_opened'}`} onClick={onOverlayClose}>
      <div className="popup__container">
        <CloseIcon onClick={onClose}/>
        <form className="popup__form-container" onSubmit={onSubmit} name={name} noValidate>
          <h2 className="popup__title">{title}</h2>
          <fieldset className="popup__form">
            {children}
            <div className="popup__input-container">
              <span className="popup__input-error popup__input-error_type_submit" id="submit-error">{submitError}</span>
              <Button name={buttonName} modifier="popup" type="submit"/>
            </div>
          </fieldset>
        </form>
        <div className="popup__redirect">
              <p className="popup__word">или</p>
              <button className="popup__word popup__word_link" onClick={onCurrentPopupOpen}>
                {linkName}
              </button>
            </div>
      </div>
    </section>
  )
}

export default PopupWithForm