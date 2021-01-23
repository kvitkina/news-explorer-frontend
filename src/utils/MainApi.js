class MainApi {
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

  getAllInfo() {
    return Promise.all([this.getInitialArticles(), this.getUserInfo()]);
  }

  getInitialArticles(token) {
    return fetch(`${this.baseUrl}/articles`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this.handleOriginalResponse);
  }

  addArticle(item, token) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    }).then(this.handleOriginalResponse);
  }

  deleteArticle(articleId, token) {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this.handleOriginalResponse);
  }

  getUserInfo(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this.handleOriginalResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3003',
});
export default mainApi;
