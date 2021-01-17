import React from 'react';
import '../PopupWithForm/PopupWithForm.css';
import CloseIcon from '../icons/CloseIcon';

const InfoTooltip = ({ title, onClose, isOpen, linkName, onOverlayClose, onCurrentPopupOpen }) => {
  return (
    <section
      className={`popup ${isOpen && 'popup_opened'} `}
      onClick={onOverlayClose}
    >
      <div className="popup__container popup__container_theme_tooltip">
        <CloseIcon onClick={onClose}/>
        <h2 className="popup__title popup__title_theme_tooltip">{title}</h2>
        <button className="popup__tooltip-link" onClick={onCurrentPopupOpen}>
          {linkName}
         </button>
      </div>
    </section>
  );
}

export default InfoTooltip;