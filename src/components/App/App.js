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
      mainApi.getSavedArticles()
        .then((res) => { setSavedArticles(res); })
        .catch((err) => console.log(err));
      mainApi.getUserInfo()
        .then((res) => { setCurrentUser(res); })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

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
    mainApi.addArticle({...newArticle, keyword})
    .then((res) => {
      const newArticles = articles.map((article) => {
        if(article.url === res.link) {
          return {...article, _id: res._id, owner: res.owner}
        }
        return article
      })
      setArticles(newArticles)
      setSavedArticles([...savedArticles, newArticle])
    })
    .catch(err => console.log(err))
  }

// удаление статьи
  const handleDeleteArticle = (id) => {
    mainApi.deleteArticle(id)
    .then(() => {
      const newArticles = articles.filter((item) => item._id !== id);
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
        return console.log('Не передано одно из полей');
      } if (err.status === 401) {
        return console.log('Пользователь с email не найден');
      }
      return console.log('Error 500');
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
  };

  const handleRegisterClick = () => {
    setIsLoginPopupOpen(false)
    setIsRegisterPopupOpen(true)
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
