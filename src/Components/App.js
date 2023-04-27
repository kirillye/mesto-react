import { useState } from "react";
import mainLogo from "../img/logo.svg";
import userAvatar from "../img/Avatar.png";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";

function App() {
  const [isEditAvatarPopupOpen, openEditAvatar] = useState(false);
  const [isEditProfilePopupOpen, openEditProfile] = useState(false);
  const [isAddPlacePopupOpen, openAddPlace] = useState(false);
  const [isImagePopupOpen, openImagePopup] = useState(false);
  const [isAcceptPopupOpen, openAcceptPopup] = useState(false);
  const [selectedCard, setSelectCard] = useState("");

  return (
    <>
      <Header logo={mainLogo} />
      <Main
        avatar={userAvatar}
        handleEditAvatarClick={(e) => {
          openEditAvatar(true);
        }}
        handleEditProfileClick={(e) => {
          openEditProfile(true);
        }}
        handleAddPlaceClick={(e) => {
          openAddPlace(true);
        }}
        handleCardClick={(link) => {
          openImagePopup(true);
          setSelectCard(link);
        }}
        handleDeleteCard={() => {
          openAcceptPopup(true);
        }}
      />
      <PopupWithForm
        title="Обновить аватар"
        name="form-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={() => {
          openEditAvatar(false);
        }}
      >
        <fieldset className="form__items">
          <div className="form__item">
            <input
              name="userLinkImage"
              placeholder="Ссылка на картинку"
              type="url"
              className="popup__input"
              id="popup__user-link-avatar"
              required
            />
            <span className="popup__form-item-error popup__form-item-error_field_userLinkImage"></span>
          </div>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        title="Редактировать профиль"
        name="form-user"
        isOpen={isEditProfilePopupOpen}
        onClose={() => {
          openEditProfile(false);
        }}
      >
        <fieldset className="form__items">
          <div className="form__item">
            <input
              name="userName"
              defaultValue="User name"
              type="text"
              className="popup__input popup__input_content_name"
              required=""
              minLength={2}
              maxLength={40}
            />
            <span className="popup__form-item-error popup__form-item-error_field_userName" />
          </div>
          <div className="form__item">
            <input
              name="userJob"
              defaultValue="User About"
              type="text"
              className="popup__input popup__input_content_job"
              required=""
              minLength={2}
              maxLength={200}
            />
            <span className="popup__form-item-error popup__form-item-error_field_userJob" />
          </div>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        name="form-article"
        isOpen={isAddPlacePopupOpen}
        onClose={() => {
          openAddPlace(false);
        }}
      >
        <fieldset className="form__items">
          <div className="form__item">
            <input
              name="articleTitle"
              placeholder="Название"
              type="text"
              className="popup__input"
              id="popup__article-title"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="popup__form-item-error popup__form-item-error_field_articleTitle"></span>
          </div>
          <div className="form__item">
            <input
              name="linkImage"
              placeholder="Ссылка на картинку"
              type="url"
              className="popup__input"
              id="popup__article-link-image"
              required
            />
            <span className="popup__form-item-error popup__form-item-error_field_linkImage"></span>
          </div>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        title="Вы уверены ?"
        name="accept"
        buttonText="Да"
        isOpen={isAcceptPopupOpen}
        onClose={() => {
          openAcceptPopup(false);
        }}
      ></PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={() => {
          openImagePopup(false);
        }}
        isOpen={isImagePopupOpen}
      />
      <Footer />
    </>
  );
}

export default App;
