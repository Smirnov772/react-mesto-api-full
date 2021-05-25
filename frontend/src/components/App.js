import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Main from "./Main";
import Header from "./Header";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import apiAuth from "../utils/apiAuth";
import { currentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({
    name: "Жак Ив Кусто",
    about: "Иследователь океана",
    avatar: "#",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  console.log(userData);
  useEffect(() => {
    api
      .getUserInfo()
      .then((dataUser) => {
        setCurrentUser(dataUser);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/main");
    }
  }, [loggedIn]);

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiAuth.JWTValid(jwt).then((res) => {
        setUserData({ ...userData, email: res.data.email });
        setLoggedIn(true);
      });
    }
  }
  function userRegister(input) {
    apiAuth
      .register(input.password, input.email)
      .then((res) => {
        history.push("/sign-in");
        setIsInfoTooltipStatus(true);
        return;
      })
      .catch((err) => {
        setIsInfoTooltipStatus(false);
        console.log(err);
      });
    setIsInfoTooltipOpen(true);
  }

  function userAuthorize(input) {
    apiAuth
      .authorize(input.password, input.email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        history.push("/main");
        setUserData({ ...userData, email: input.email });
        console.log(`then ${data.token}`);

        return;
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipStatus(false);
        setIsInfoTooltipOpen(true);
      });
  }
  function userRemove() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    setLoggedIn(false);
    setUserData("");
  }

  const [isInfoTooltipStatus, setIsInfoTooltipStatus] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState(false);

  function handleCardClick(url) {
    setSelectedCard(url);
    console.log(url);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsInfoTooltipOpen(false);
    console.log(true);
  }
  function handleUpdateAvatar(avatarUrl) {
    console.log(avatarUrl);
    api
      .editAvatar(avatarUrl)
      .then((dataUser) => {
        setCurrentUser(dataUser);
      })
      .catch((err) => console.log(err));
    closeAllPopups();
  }
  function handleUpdateUser(dataUser) {
    console.log(dataUser);
    api
      .renameUser(dataUser.name, dataUser.about)
      .then((dataUser) => {
        setCurrentUser(dataUser);
      })
      .catch((err) => console.log(err));
    closeAllPopups();
  }

  const [cards, setCards] = useState([]);
  useEffect(() => {
    api
      .getAllCards()
      .then((dataCard) => {
        setCards(dataCard);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAddPlaceSubmit(dataNewCard) {
    console.log(dataNewCard);
    api
      .addCard(dataNewCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err));
    closeAllPopups();
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards(cards.filter((i) => i._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      {" "}
      <div>
        <div className="page__content">
          <Header
            loggedIn={loggedIn}
            loggedOut={userRemove}
            userData={userData.email}
          />
          <Switch>
            <Route path="/sign-in">
              <Login onSubmit={userAuthorize} />
            </Route>
            <Route path="/sign-up">
              <Register onSubmit={userRegister} />
            </Route>
            <ProtectedRoute
              path="/main"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route exact path="/">
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <Footer />
        </div>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <InfoTooltip
          loggedIn={isInfoTooltipStatus}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
