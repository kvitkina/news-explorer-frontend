export const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3003';

export const register = (email, password, name) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password, name }),
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`));
  });

export const getContent = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`));
  });

export const authorize = (email, password) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`));
  })
  .then((data) => {
    if (data.token) {
      localStorage.setItem('jwt', data.jwt);
      return data;
    }
  });