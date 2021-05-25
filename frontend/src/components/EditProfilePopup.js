import React from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
function EditProfilePopup(props) {
  const currentUser = React.useContext(currentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="user"
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isOpen={props.isOpen}
    >
      <div name="userForm" id="userForm" className="popup__forms" noValidate>
        <input
          required
          value={name}
          onChange={handleNameChange}
          minLength="2"
          maxLength="40"
          type="text"
          id="userName"
          name="name"
          placeholder="Жак-Ив Кусто"
          className="popup__form-input popup__form-input_name"
        />
        <span id="userName-error" className=""></span>
        <input
          required
          value={description}
          onChange={handleDescriptionChange}
          minLength="2"
          maxLength="200"
          type="text"
          id="userJob"
          name="about"
          placeholder="Исследователь океана"
          className="popup__form-input popup__form-input_occupation"
        />
        <span id="userJob-error" className=""></span>
        <button
          className="popup__save-button"
          type="submit"
        >
          Сохранить
        </button>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
