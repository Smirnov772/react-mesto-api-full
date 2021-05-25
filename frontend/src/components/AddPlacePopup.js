import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  console.log(props)
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleUrlChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Добавить место"
      name="add-card"
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isOpen={props.isOpen}
    >
      {" "}
      <div
        name="addCard"
        id="addCard"
        className="popup-add-card__forms popup__forms"
        noValidate
      >
        <input
          required
          value={name}
          onChange={handleNameChange}
          minLength="1"
          maxLength="40"
          id="cardName"
          type="text"
          name="name"
          placeholder="Имя нового места"
          className="popup__form-input"
        />
        <span id="cardName-error" className=""></span>
        <input
          required
          value={link}
          onChange={handleUrlChange}
          id="cardLink"
          type="url"
          name="link"
          placeholder="Ссылка на изображение"
          className="popup__form-input"
        />
        <span id="cardLink-error" className=""></span>
        <button
          className="popup-add-card__save-button popup__save-button"
          type="submit"
        >
          Создать
        </button>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
