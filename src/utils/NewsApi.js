import { API_KEY, BASE_URL } from './constants.js';
let date = new Date()
const today = date
date.setDate(date.getDate() - 7);
const fromDate =  date

  export const getNews = (keyword) => {
    return fetch(`${BASE_URL}?q=${keyword}&pageSize=100&from=${fromDate}&to=${today}&apiKey=${API_KEY}`, {
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