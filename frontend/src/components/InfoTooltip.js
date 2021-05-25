import React from "react";
import authLogoOk from "../images/authLogoOk.svg";
import authLogoError from "../images/authLogoError.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_active"}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          aria-label="Закрыть попап"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="info-tooltip__logo"
          src={props.loggedIn ? authLogoOk : authLogoError}
          alt="Удачно"
        />
        <p className="info-tooltip__paragraph ">
          {props.loggedIn
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
