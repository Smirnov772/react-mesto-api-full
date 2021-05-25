const onError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject("Сервер не доступен");
};

class Api {
  constructor({ url, cohortId, headers }) {
    this._url = url;
    this._cohortId = cohortId;
    this._headers = headers;
  }
  getAllCards() {
    return fetch(`${this._url}/${this._cohortId}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(onError);
  }

  addCard(dataCards) {
    return fetch(`${this._url}/${this._cohortId}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: `${dataCards.name}`,
        link: `${dataCards.link}`,
      }),
    }).then(onError);
  }

  getUserInfo() {
    return fetch(`${this._url}/${this._cohortId}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(onError);
  }

  renameUser(name, job) {
    return fetch(`${this._url}/${this._cohortId}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${job}`,
      }),
    }).then(onError);
  }

  removeCard(id) {
    console.log(id)
    return fetch(`${this._url}/${this._cohortId}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(onError);
  }
  editAvatar(avatarId) {
    console.log(avatarId)
    return fetch(`${this._url}/${this._cohortId}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatarId}`,
      }),
    }).then(onError);
  }
  setLike(id) {
    console.log(id);
    return fetch(`${this._url}/${this._cohortId}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(onError);
  }
  removeLike(id) {
    console.log(id);
    return fetch(`${this._url}/${this._cohortId}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(onError);
  }
  changeLikeCardStatus(id, isLiked) {
    console.log(id, isLiked);
    return fetch(`${this._url}/${this._cohortId}/cards/likes/${id}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(onError);
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1",
  cohortId: "cohort-20",
  headers: {
    authorization: "8b4bf4c7-50a5-4055-8a00-6f47d910a5d3",
    "Content-Type": "application/json",
  },
});

export default api;
