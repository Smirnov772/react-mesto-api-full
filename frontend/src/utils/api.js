const onError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject("Сервер не доступен");
};

class Api {
  constructor({ url, headers }) {
    this._url = url;
    // this._cohortId = cohortId;
    this._headers = headers;
  }
  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {...this._headers, "Authorization": `Bearer ${localStorage.getItem("JWT")}`},
      'credentials': 'include',
    }).then(onError);
  }

  addCard(dataCards) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {...this._headers, "Authorization": `Bearer ${localStorage.getItem("JWT")}`},
      'credentials': 'include',
      body: JSON.stringify({
        name: `${dataCards.name}`,
        link: `${dataCards.link}`,
      }),
    }).then(onError);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {...this._headers, "Authorization": `Bearer ${localStorage.getItem("JWT")}`},
      'credentials': 'include',
    }).then(onError);
  }

  renameUser(name, job) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {...this._headers, "Authorization": `Bearer ${localStorage.getItem("JWT")}`},
      'credentials': 'include',
      body: JSON.stringify({
        name: `${name}`,
        about: `${job}`,
      }),
    }).then(onError);
  }

  removeCard(id) {
    console.log(id)
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {...this._headers, "Authorization": `Bearer ${localStorage.getItem("JWT")}`},
      'credentials': 'include',
    }).then(onError);
  }
  editAvatar(avatarId) {
    console.log(avatarId)
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {...this._headers, "Authorization": `Bearer ${localStorage.getItem("JWT")}`},
      'credentials': 'include',
      body: JSON.stringify({
        avatar: `${avatarId}`,
      }),
    }).then(onError);
  }
  setLike(id) {
    console.log(id);
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: {...this._headers, "Authorization": `Bearer ${localStorage.getItem("JWT")}`},
      'credentials': 'include',
    }).then(onError);
  }
  removeLike(id) {
    console.log(id);
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {...this._headers, "Authorization": `Bearer ${localStorage.getItem("JWT")}`},
      'credentials': 'include',
    }).then(onError);
  }
  changeLikeCardStatus(id, isLiked) {
    console.log(id, isLiked);
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {...this._headers, "Authorization": `Bearer ${localStorage.getItem("JWT")}`},
      'credentials': 'include',
    }).then(onError);
  }
}

const api = new Api({
  url: "http://api.front15.smistav.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json"
  },
});

export default api;
