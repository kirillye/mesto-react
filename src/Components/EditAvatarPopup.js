import React from "react";
import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  checkLink,
  isLoadingForm,
  onUpdateAvatar,
  isOpen,
  onClose,
}) {
  const [formValid, setFormValid] = useState(false);
  const [linkFieldError, setLinkFieldError] = useState({
    falidField: false,
    textError: "",
  });
  const avatarRef = React.useRef();

  function handleClosePopup() {
    onClose();
    handleResetForm();
  }

  function handleResetForm() {
    avatarRef.current.value = "";
    setLinkFieldError({ textError: "", falidField: false });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
    handleResetForm();
  }

  useEffect(() => {
    if (linkFieldError.falidField) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [linkFieldError.falidField]);

  return (
    <PopupWithForm
      formValid={formValid}
      isLoadingForm={isLoadingForm}
      title="Обновить аватар"
      name="form-avatar"
      isOpen={isOpen}
      onClose={handleClosePopup}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__items">
        <div className="form__item">
          <input
            ref={avatarRef}
            name="userLinkImage"
            placeholder="Ссылка на картинку"
            type="url"
            className="popup__input"
            id="popup__user-link-avatar"
            required
            onChange={(e) => {
              checkLink(e, setLinkFieldError);
            }}
          />
          <span className="popup__form-item-error popup__form-item-error_field_userLinkImage">
            {linkFieldError.textError}
          </span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}
