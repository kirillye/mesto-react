import { useEffect, useState } from "react";
import mainLogo from "../img/logo.svg";
import userAvatar from "../img/Avatar.png";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import RemoveCardPopup from "./RemoveCardPopup";

function App() {
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, openEditAvatar] = useState(false);
  const [isEditProfilePopupOpen, openEditProfile] = useState(false);
  const [isAddPlacePopupOpen, openAddPlace] = useState(false);
  const [isImagePopupOpen, openImagePopup] = useState(false);
  const [isAcceptPopupOpen, openAcceptPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentCardDelete, setCurrentCardDelete] = useState({});
  const [selectedCard, setSelectCard] = useState({ name: "", link: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const httpRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
  // const [linkFieldError, setLinkFieldError] = useState("  ");
  // const [nameFieldError, setNameFieldError] = useState("  ");

  function closeAllPopups() {
    openEditAvatar(false);
    openEditProfile(false);
    openAddPlace(false);
    openImagePopup(false);
    setSelectCard({ name: "", link: "" });
    openAcceptPopup(false);
  }

  function handleCardsChange(data) {
    setCards(data);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(err));
  }

  function handleCardDelete() {
    setIsLoadingForm(true);
    if (!currentCardDelete) {
      return;
    }
    api
      .removeCard(currentCardDelete._id)
      .then((res) => {
        closeAllPopups();
        setCards((state) =>
          state.filter((c) => !(c._id === currentCardDelete._id))
        );
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoadingForm(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoadingForm(true);
    api
      .sendUserInfo(data)
      .then((data) => {
        closeAllPopups();
        setCurrentUser(data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoadingForm(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoadingForm(true);
    api
      .sendUserAvatar(data)
      .then((data) => {
        closeAllPopups();
        setCurrentUser((state) => ({ ...state, avatar: data.avatar }));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoadingForm(false);
      });
  }

  function handleUpdateCards(data) {
    setIsLoadingForm(true);
    api
      .sendCard(data)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoadingForm(false);
      });
  }

  function handleEditAvatarClick(e) {
    openEditAvatar(true);
  }

  function handleEditProfileClick(e) {
    openEditProfile(true);
  }

  function handleAddPlaceClick(e) {
    openAddPlace(true);
  }

  function handleCardClick(link) {
    openImagePopup(true);
    setSelectCard(link);
  }

  function handleDeleteCard(data) {
    setCurrentCardDelete(data);
    openAcceptPopup(true);
  }

  // Функции валидации форм

  function linkHandler(e, setLinkFieldError) {
    if (httpRegex.test(String(e.target.value).toLocaleLowerCase())) {
      setLinkFieldError({
        textError: "",
        falidField: true,
      });
    } else if (e.target.value.length === 0) {
      setLinkFieldError({
        textError: "Поле пустое",
        falidField: false,
      });
    } else {
      setLinkFieldError({
        textError: "Ссылка не корректна",
        falidField: false,
      });
    }
  }

  function nameHandler(e, minLength = 1, maxLength = 150, setNameFieldError) {
    const value = e.target.value;
    if (value.length > maxLength) {
      setNameFieldError({
        textError: `Максимум ${maxLength} символов`,
        falidField: false,
      });
    } else if (value.length === 0) {
      setNameFieldError({
        textError: "Поле пустое",
        falidField: false,
      });
    } else if (value.length < minLength) {
      setNameFieldError({
        textError: `минимальное количество символов ${minLength}`,
        falidField: false,
      });
    } else if (value.length <= maxLength && value.length >= minLength) {
      setNameFieldError({
        textError: "",
        falidField: true,
      });
    } else {
      setNameFieldError({
        textError: "Данные не корректы..(",
        falidField: false,
      });
    }
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cards]) => {
        handleCardsChange(cards);
        setCurrentUser(userData);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header logo={mainLogo} />
      <Main
        isLoading={isLoading}
        avatar={userAvatar}
        onCardLike={handleCardLike}
        handleCardsChange={handleCardsChange}
        cards={cards}
        handleEditAvatarClick={handleEditAvatarClick}
        handleEditProfileClick={handleEditProfileClick}
        handleAddPlaceClick={handleAddPlaceClick}
        handleCardClick={handleCardClick}
        handleDeleteCard={handleDeleteCard}
      />
      <EditAvatarPopup
        checkLink={linkHandler}
        isLoadingForm={isLoadingForm}
        onUpdateAvatar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />
      <EditProfilePopup
        checkField={nameHandler}
        isLoadingForm={isLoadingForm}
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />
      <AddPlacePopup
        checkField={nameHandler}
        checkLink={linkHandler}
        isLoadingForm={isLoadingForm}
        onUpdateCards={handleUpdateCards}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />
      <RemoveCardPopup
        isLoadingForm={isLoadingForm}
        onDeleteCard={handleCardDelete}
        isOpen={isAcceptPopupOpen}
        onClose={closeAllPopups}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
