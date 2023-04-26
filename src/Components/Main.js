import { useEffect, useState } from "react";
import { api } from "../utils/Api.js";
import Card from "./Card";
import Spinner from "./Spinner.js";

function Main({
  avatar,
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleCardClick,
  handleDeleteCard,
}) {
  const [userName, renameUser] = useState("");
  const [userDescription, setDesc] = useState("");
  const [userAvatar, setAvatar] = useState("");
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getUserInfo(), api.getCards()])
      .then((data) => {
        renameUser(data[0].name);
        setDesc(data[0].about);
        setAvatar(data[0].avatar);
        const cardsConfigFormServer = data[1];
        const results = cardsConfigFormServer.map((item) => ({
          name: item.name,
          link: item.link,
          likes: item.likes.length,
          likeUsers: item.likes,
          id: item._id,
          owner: item.owner,
        }));
        setCards(results);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main>
      <section className="person container">
        <div className="person__wrapper">
          <div className="person__info">
            <div
              className="person__image-cover"
              onClick={handleEditAvatarClick}
            >
              <img
                src={userAvatar}
                alt="Аватар пользователя"
                className="person__avatar"
              />
            </div>
            <div className="person__box">
              <div className="person__name-row">
                <h1 className="person__title">{userName}</h1>
                <button
                  type="button"
                  className="person__btn-edit"
                  onClick={handleEditProfileClick}
                />
              </div>
              <h2 className="person__sub-title">{userDescription}</h2>
            </div>
          </div>
          <button
            type="button"
            className="person__add-article"
            onClick={handleAddPlaceClick}
          />
        </div>
      </section>
      <section className="articles container">
        {isLoading ? (
          <Spinner />
        ) : (
          <ul className="articles__grid">
            {cards.map((item) => (
              <Card
                key={item.id}
                onCardClick={handleCardClick}
                openAcceptPopup={handleDeleteCard}
                item={item}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Main;
