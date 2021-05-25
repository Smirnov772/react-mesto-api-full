export const popupUser = document.querySelector(".popup-user");
export const popupUserOpenButton = document.querySelector(
  ".profile__edit-button"
);
export const popupUserCloseButton = document.querySelector(
  ".popup__close-button"
);

export const userName = document.querySelector(".profile__name");
export const userJob = document.querySelector(".profile__occupation");
export const formElement = document.querySelector(".popup__container");
export const nameInput = formElement.querySelector(".popup__form-input_name");
export const jobInput = formElement.querySelector(
  ".popup__form-input_occupation"
);

export const bigImage = document.querySelector(".big-image");
export const bigImageItem = document.querySelector(".big-image__item");
export const bigImageName = bigImage.querySelector(".big-image__name");
export const closebuttonBigImage = document.querySelector(".big-image__close");

export const popupAddCard = document.querySelector(".popup-add-card");
export const CardForm = popupAddCard.querySelector(
  ".popup-add-card__container"
);
export const openAddCard = document.querySelector(".profile__add-button");
export const closeAddCard = popupAddCard.querySelector(
  ".popup-add-card__close-button"
);
export const cardLinkFormInput = popupAddCard.querySelector(
  ".popup-add-card__form-input_link"
);
export const cardNameFormInput = popupAddCard.querySelector(
  ".popup-add-card__form-input_place"
);
export const avatarEdit = document.querySelector(".popup-avatar");
export const avatarEditOpen = document.querySelector(".profile__avatar");
export const avatarLink = avatarEdit.querySelector(".popup__avatar-input");
export const cardsElement = document.querySelector(".elements");
export const popupRemove = document.querySelector(".popup-remove");
export const cardRemoveButton = document.querySelector(".element__remove");

export const likeCounter = cardsElement.querySelector(".element__like-number");

export const enableValidation = {
  formSelector: ".popup__forms",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__error_visible",
};
