import React from "react";
import logo from "../images/logo.svg";
import { Link, Route, Switch } from "react-router-dom";

// import { Link, useHistory } from "react-router-dom";
function Header(props) {
  // const history = useHistory();
  // function signOut() {
  //   localStorage.removeItem("jwt");
  //   history.push("/sign-up");
  // }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <ul className="header__nav">
        {" "}
        <Switch>
          <Route exact path="/main">
            <p className="header__paragraph">{props.userData}</p>
            <Link
              className="header__link header__button"
              onClick={props.loggedOut}
            >
              Выйти
            </Link>
          </Route>

          <Route path="/signin">
            <li>
              <Link to="signup" className="header__link">
                Регистрация
              </Link>
            </li>
          </Route>
          <Route path="/signup">
            {" "}
            <li>
              <Link to="signin" className="header__link">
                Войти
              </Link>
            </li>
          </Route>
        </Switch>
      </ul>
    </header>
  );
}

export default Header;
// onClick={signOut}
