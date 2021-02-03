import { baseUrl, apiKey } from './constants.js';
let date = new Date()
const today = date
date.setDate(date.getDate() - 7);
const fromDate =  date

  export const getNews = (keyword) => {
    return fetch(`${baseUrl}?q=${keyword}&pageSize=100&from=${fromDate}&to=${today}&apiKey=${apiKey}`, {
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