class NewsApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  handleOriginalResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`));
  }

  getNews() {
    return fetch(`${this.baseUrl}/everything?pageSize=3&apiKey=28216fbc7eec47978577642245381406&q=природа`, {
      headers: this.headers,
    }).then(this.handleOriginalResponse);
  }
}

const newsApi = new NewsApi({
  baseUrl: 'http://newsapi.org/v2',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
export default newsApi;