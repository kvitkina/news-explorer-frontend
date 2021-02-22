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
import * as auth from '../../utils/auth';
import * as newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';


const App = () => {
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [articles, setArticles] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');
  const [submitError, setSubmitError] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [preloader, setPreloader] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const [haveNews, setHaveNews] = React.useState(false);
  const [savedArticles, setSavedArticles] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
        .then((res) => { setCurrentUser(res); })
        .catch((err) => console.log(err));
      mainApi.getSavedArticles()
        .then((res) => {
          setSavedArticles(res); })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, currentUser._id]);

// поиск новостей по ключевому слову
  const onSearchNews = (keyword) => {
    localStorage.removeItem('articles');
    localStorage.removeItem('keyword');
    setHaveNews(false)
    setPreloader(true)
    setNotFound(false)
    newsApi.getNews(keyword)
    .then((res) => {
      localStorage.setItem('articles', JSON.stringify(res.articles));
      localStorage.setItem('keyword', keyword);
      setArticles(res.articles)
      setKeyword(keyword)
      setHaveNews(true)
      if(res.articles.length === 0) {
        setNotFound(true)
        setHaveNews(false)
      }
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setPreloader(false)
    })
  }

  React.useEffect(() => {
    tokenCheck();
    const articles = localStorage.getItem('articles')
    ? JSON.parse(localStorage.getItem('articles'))
    : [];
    setArticles(articles)
    const keyword = localStorage.getItem('keyword');
    setKeyword(keyword)
    setHaveNews(true)
    if(articles.length === 0) {
      setHaveNews(false)
    }
  }, [loggedIn]);


// сохранениe статьи
  const handleSaveArticle = (newArticle) => {
    if(loggedIn) {
      mainApi.addArticle({...newArticle, keyword})
      .then((res) => {
        const newArticles = articles.map((article) => {
          if(article.url === res.link) {
            return {...article, _id: res._id}
          }
          return article
        })
        setArticles(newArticles)
        setSavedArticles([...savedArticles, res])
      })
      .catch(err => console.log(err))
    }
  }

// удаление статьи
  const handleDeleteArticle = (_id) => {
    mainApi.deleteArticle(_id)
    .then((res) => {
      const newArticles = savedArticles.filter((item) => item._id !== res._id);
      setSavedArticles(newArticles)
    })
    .catch(err => console.log(err))
  }

// регистрация
  const onRegister = (email, password, name) => {
    auth.register(email, password, name)
    .then((res) => {
      if(res) {
        setIsRegisterPopupOpen(false);
        handleTooltip();
        history.push("/");
      }
    })
    .catch((err) => {
      if (err.status === 400) {
        return setSubmitError('Пороль должен быть без пробелов');
      } else if (err.status === 409) {
        return setSubmitError('Такой пользователь уже есть');
      } else {
        return setSubmitError('Что-то пошло не так!');
      }
    })
  }
// авторизация
  const onLogin = (email, password) => {
    auth.authorize(email, password)
    .then((data) => {
      if(data.token) {
        setLoggedIn(true);
        setCurrentUser({ name: data.name, id: data._id });
        history.push('/');
        closeAllPopups();
      }
    })
    .catch((err) => {
      if (err.status === 400) {
        return setSubmitError('Не передано одно из полей');
      } else if (err.status === 401) {
        return setSubmitError('Пользователь с email не найден');
      }
      return setSubmitError('Что-то пошло не так!');
    });
  }

  // проверка токена
  const tokenCheck= () => {
    const token = localStorage.getItem('token');
    if(token) {
      auth.getContent(token)
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

  // выход
  const onSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('articles');
    localStorage.removeItem('keyword');
    setLoggedIn(false);
    setHaveNews(false)
    history.push('/');
  };

  // блок с "открыть/закрыть"
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
    setSubmitError('')
  };

  const handleRegisterClick = () => {
    setIsLoginPopupOpen(false)
    setIsRegisterPopupOpen(true)
    setSubmitError('')
  };

  const handleTooltip = () => {
    setIsInfoTooltipOpen(true);
  };

  const closeAllPopups = () => {
    setIsRegisterPopupOpen(false)
    setIsLoginPopupOpen(false)
    setIsInfoTooltipOpen(false)
  };

  // закрытие попапов по клику на overlay
  const handleOverlayClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeAllPopups();
  };

  // закрытие попапов по клику на Escape
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


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main
              onLoginClick={handleLoginClick}
              onMenuClick={handleMenuClick}
              isMenuOpen={isMenuOpen}
              onMenuClose={closeMenu}
              onSignOut={onSignOut}
              articles={articles}
              preloader={preloader}
              notFound={notFound}
              loggedIn={loggedIn}
              onSearchNews={onSearchNews}
              keyword={keyword}
              setKeyword={setKeyword}
              haveNews={haveNews}
              onArticleSave={handleSaveArticle}
              onArticleDelete={handleDeleteArticle}
            />
          </Route>
          <ProtectedRoute
            exact path="/saved-news"
            component={SavedNews}
            onSignOut={onSignOut}
            loggedIn={loggedIn}
            articles={articles}
            keyword={keyword}
            savedArticles={savedArticles}
            onArticleDelete={handleDeleteArticle}
            onMenuClick={handleMenuClick}
            isMenuOpen={isMenuOpen}
            onMenuClose={closeMenu}
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
          submitError={submitError}
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
