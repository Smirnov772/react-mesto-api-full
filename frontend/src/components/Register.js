import React from "react";
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      password,
      email,
    });
  }
  return (
    <>
      <div className="user-auth">
        <p className="user-auth__paragraph">Регистрация</p>
        <form onSubmit={handleSubmit} className="user-auth__form">
          <input
            required
            className="user-auth__input"
            onChange={handleEmailChange}
            value={email}
            type="email"
            placeholder="Email"
          ></input>
          <input
            required
            className="user-auth__input"
            type="password"
            onChange={handlePasswordChange}
            value={password}
            placeholder="Пароль"
          ></input>
          <button type="submit" className="user-auth__button">
            Зарегистрироваться
          </button>
        </form>
        <Link className="user-auth__link" to="/sign-in" >Уже зарегистрированы? Войти</Link>
      </div>
    </>
  );
}

export default Register;
