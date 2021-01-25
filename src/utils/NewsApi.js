import { baseUrl, apiKey } from './constants.js';

  export const getNews = (keyword) => {
    return fetch(`${baseUrl}?q=${keyword}&pageSize=100&apiKey=${apiKey}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`));
    })
  }