import React from "react";

function Login(props) {
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
      <p className="user-auth__paragraph">Вход</p>
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
          onChange={handlePasswordChange}
          value={password}
          type="password"
          placeholder="Пароль"
        ></input>
        <button type="submit" className="user-auth__button">
          Войти
        </button>
      </form>
    </div>
  </>
  );
}

export default Login;
