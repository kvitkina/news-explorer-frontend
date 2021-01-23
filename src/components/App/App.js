import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import LoginPopup from '../LoginPopup/LoginPopup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';
import newsApi from '../../utils/NewsApi';
import * as auth from '../../utils/auth';

const App = () => {
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [articles, setArticles] = React.useState([]);
  const [submitError, setSubmitError] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [name, setName] = React.useState("");
  const [preloader, setPreloader] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const history = useHistory();

  // React.useEffect(() => {
  //   newsApi.getNews()
  //   .then((res) => {
  //     setArticles(res)
  //   })
  //   .catch((err) => console.log(err));
  // },[])

// регистрация
  const onRegister = (email, password, name) => {
    auth.register(email, password, name)
    .then((res) => {
      if(res) {
        setIsRegisterPopupOpen(false)
        handleTooltip()
      }
    })
    .catch((err) => {
      if (err.status === 400) {
        setSubmitError('Пороль должен быть без пробелов');
      } else if (err.status === 409) {
        setSubmitError('Такой пользователь уже есть');
      } else {
        setSubmitError('Что-то пошло не так!');
      }
    })
  }
// авторизация
  const onLogin = (email, password) => {
    auth.authorize(email, password)
    .then((res) => {
      if(res.jwt) {
        localStorage.setItem('jwt', res.jwt);
        setLoggedIn(true);
        closeAllPopups();
      }
    })
    .catch((err) => {
      if (err.status === 400) {
        return console.log('Не передано одно из полей');
      } if (err.status === 401) {
        return console.log('Пользователь с email не найден');
      }
      return console.log('Error 500');
    });
  }

  // проверка токена
  const tokenCheck= () => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.getContent(jwt)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setCurrentUser({ name: res.name, id: res._id });
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          return console.log('Токен не передан или передан не в том формате');
        }
        return console.log('Переданный токен некорректен');
      });
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/');
  };

  const handleMenuClick = () => {
    setIsMenuOpen(true)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLoginClick = () => {
    setIsRegisterPopupOpen(false)
    setIsInfoTooltipOpen(false)
    setIsLoginPopupOpen(true)
  };

  const handleRegisterClick = () => {
    setIsLoginPopupOpen(false)
    setIsRegisterPopupOpen(true)
  };

  const closeAllPopups = () => {
    setIsRegisterPopupOpen(false)
    setIsLoginPopupOpen(false)
    setIsInfoTooltipOpen(false)
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
        closeMenu();
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main
              onLogin={handleLoginClick}
              onMenuClick={handleMenuClick}
              isMenuOpen={isMenuOpen}
              onMenuClose={closeMenu}
              articles={articles}
              preloader={preloader}
              notFound={notFound}
              loggedIn={loggedIn}
            />
          </Route>
          <ProtectedRoute
            exact path="/saved-news"
            component={SavedNews}
            onSignOut={onSignOut}
            loggedIn={loggedIn}
          >
          </ProtectedRoute>
        </Switch>
        <Footer />
        <RegisterPopup
          onClose={closeAllPopups}
          isOpen={isRegisterPopupOpen}
          onOverlayClose={handleOverlayClose}
          onLoginPopupOpen={handleLoginClick}
          onRegister={onRegister}
          submitError={submitError}
        />
        <LoginPopup
          onClose={closeAllPopups}
          isOpen={isLoginPopupOpen}
          onOverlayClose={handleOverlayClose}
          onRegisterPopupOpen={handleRegisterClick}
          onLogin={onLogin}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
