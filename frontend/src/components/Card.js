import React from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";

export const cardsContext = React.createContext();

function Card(props) {
  const currentUser = React.useContext(currentUserContext);
  function handleClick() {
    props.handleClick({ src: props.src, name: props.name });
  }
  function handleLikeClick() {
    props.onCardLike(props);
  }
  function handleDeleteClick() {
    props.onCardDelete(props);
  }
  const isOwn = props.ownerId === currentUser._id;
  const cardDeleteButtonClassName = isOwn ? "block" : "none";
  const isLiked = props.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = isLiked ? "element__like_enable" : " ";
  return (
    <div className="element">
      <img
        className={`element__image ${props.card && "popup_active"}`}
        src={`${props.src}`}
        alt="Картинка"
        onClick={handleClick}
      />
      <p className="element__paragraph">{props.name}</p>
      <button
        className="element__remove"
        style={{ display: `${cardDeleteButtonClassName}` }}
        aria-label="Удалить карточку"
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <div className="element__like-conteiner">
        <button
          className={`element__like element__like_disable ${cardLikeButtonClassName}`}
          onClick={handleLikeClick}
          type="button"
        ></button>
        <p className="element__like-number">{props.likes.length}</p>
      </div>
    </div>
  );
}

export default Card;
