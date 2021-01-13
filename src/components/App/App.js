import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import LoginPopup from '../LoginPopup/LoginPopup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);


  const handleMenuClick = () => {
    setIsMenuOpen(true)
  }

  const handleLoginClick = () => {
    setIsRegisterPopupOpen(false)
    setIsLoginPopupOpen(true)
  };

  const handleRegisterClick = () => {
    setIsLoginPopupOpen(false)
    setIsRegisterPopupOpen(true)
  };

  const closeAllPopups = () => {
    setIsRegisterPopupOpen(false)
    setIsLoginPopupOpen(false)
  };

  const handleOverlayClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeAllPopups();
  };

  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  const handleTooltip = () => {
    setIsInfoTooltipOpen(true);
  };

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main
            onLogin={handleLoginClick}
            onMenuClick={handleMenuClick}
            isMenuOpen={isMenuOpen}
          />
        </Route>
        <Route exact path="/saved-news">
          <SavedNews />
        </Route>
      </Switch>
      <Footer />
      <RegisterPopup
        onClose={closeAllPopups}
        isOpen={isRegisterPopupOpen}
        onOverlayClose={handleOverlayClose}
        onLoginPopupOpen={handleLoginClick}
      />
      <LoginPopup
        onClose={closeAllPopups}
        isOpen={isLoginPopupOpen}
        onOverlayClose={handleOverlayClose}
        onRegisterPopupOpen={handleRegisterClick}
      />
      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isInfoTooltipOpen}
        title="Пользователь успешно зарегистрирован!"
        onCurrentPopupOpen={handleLoginClick}
        linkName="Войти"
        onOverlayClose={handleOverlayClose}
      />
    </div>
  );
}

export default App;
