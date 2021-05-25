const onError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.statusText}`);
};

class ApiAuth {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  register(password, email) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`,
      }),
    }).then(onError);
  }

  authorize(password, email) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`,
      }),
    }).then(onError);
  }

  JWTValid(jwt) {
      console.log(`Bearer ${jwt}`)
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
    } 
    }).then(onError);
  }
}

const apiAuth = new ApiAuth({
  url: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiAuth;
