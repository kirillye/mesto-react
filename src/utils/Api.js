class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _getResponseData(res) {
    // console.log(res.json())
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getCards() {
    return fetch(`${this.url}cards`, {
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getUserInfo() {
    return fetch(`${this.url}users/me`, {
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  sendCard({ articleTitle, linkImage }) {
    return fetch(`${this.url}cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: articleTitle,
        link: linkImage,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  putLike(id) {
    return fetch(`${this.url}cards/${id}/likes `, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  removeLike(id) {
    return fetch(`${this.url}cards/${id}/likes `, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  removeCard(id) {
    return fetch(`${this.url}cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  sendUserInfo(data) {
    return fetch(`${this.url}users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.userName,
        about: data.userJob,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  sendUserAvatar(avatar) {
    return fetch(`${this.url}users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-63/",
  headers: {
    authorization: "329c4ea8-6d08-414a-aa1f-2a25b10eec2c",
    "Content-Type": "application/json",
  },
});
