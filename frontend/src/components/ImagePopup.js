import React from "react";
function ImagePopup(props) {
  return (
    <div className={`big-image popup ${props.card && "popup_active"}`}>
      <div className="big-image__content">
        <img className="big-image__item" src={`${props.card.src}`} alt="#" />
        <p className="big-image__name">{`${props.card.name}`}</p>
        <button
          className="big-image__close popup__close-button"
          aria-label="Закрыть картинку"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
