import React from "react";
import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  checkField,
  checkLink,
  isLoadingForm,
  onUpdateCards,
  isOpen,
  onClose,
}) {
  const [formValid, setFormValid] = useState(false);
  const [linkFieldError, setLinkFieldError] = useState({
    falidField: false,
    textError: "",
  });
  const [nameFieldError, setNameFieldError] = useState({
    falidField: false,
    textError: "",
  });
  const cardName = React.useRef();
  const cardImage = React.useRef();

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    const data = {
      articleTitle: cardName.current.value,
      linkImage: cardImage.current.value,
    };
    onUpdateCards(data);
    resetFormPopup();
  }

  function handleClosePopup() {
    onClose();
    resetFormPopup();
  }

  function resetFormPopup() {
    setLinkFieldError({ textError: "", falidField: false });
    setNameFieldError({ textError: "", falidField: false });
    cardName.current.value = "";
    cardImage.current.value = "";
  }

  useEffect(() => {
    if (nameFieldError.falidField && linkFieldError.falidField) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameFieldError.falidField, linkFieldError.falidField]);

  return (
    <PopupWithForm
      formValid={formValid}
      isLoadingForm={isLoadingForm}
      title="Новое место"
      name="form-article"
      isOpen={isOpen}
      onClose={handleClosePopup}
      onSubmit={handleAddPlaceSubmit}
    >
      <fieldset className="form__items">
        <div className="form__item">
          <input
            onChange={(e) => {
              checkField(e, 2, 30, setNameFieldError);
            }}
            ref={cardName}
            name="articleTitle"
            placeholder="Название"
            type="text"
            className="popup__input"
            id="popup__article-title"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="popup__form-item-error popup__form-item-error_field_articleTitle">
            {nameFieldError.textError}
          </span>
        </div>
        <div className="form__item">
          <input
            onChange={(e) => {
              checkLink(e, setLinkFieldError);
            }}
            ref={cardImage}
            name="linkImage"
            placeholder="Ссылка на картинку"
            type="url"
            className="popup__input"
            id="popup__article-link-image"
            required
          />
          <span className="popup__form-item-error popup__form-item-error_field_linkImage">
            {linkFieldError.textError}
          </span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
