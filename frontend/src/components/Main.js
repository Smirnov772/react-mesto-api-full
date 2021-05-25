import React from "react";

import { currentUserContext } from "../contexts/CurrentUserContext";
import Card from "../components/Card";
function Main(props) {
  const currentUser = React.useContext(currentUserContext);
  

  const handleCardClick = (url) => {
    props.onCardClick(url);
  };

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
          
          <button
            className="profile__avatar-pencil"
            onClick={props.onEditAvatar}
            type="button"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            onClick={props.onEditProfile}
            type="button"
          />
          <p className="profile__occupation">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={props.onAddPlace}
          type="button"
        />
      </section>

      <section className="elements">
        {props.cards.map((item) => (
          <Card
            name={item.name}
            likes={item.likes}
            _id={item._id}
            key={item._id}
            src={item.link}
            ownerId={item.owner._id}
            handleClick={handleCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
