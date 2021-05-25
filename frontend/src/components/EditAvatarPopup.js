import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef(0);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isOpen={props.isOpen}
    >
      {" "}
      <div
        name="userAvatar"
        id="userAvatar"
        className="popup__forms"
        noValidate
      >
        <input
          required
          ref={avatarRef}
          id="urlAvatar"
          type="url"
          name="link"
          placeholder="Ссылка на аватар"
          className="popup__form-input"
        />
        <span id="avatar-error" className=""></span>
        <button className="popup__save-button" type="submit">
          Сохранить
        </button>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
