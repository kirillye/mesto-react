function Card({ onCardClick, openAcceptPopup, item }) {
  function handleClick() {
    onCardClick(item);
  }

  return (
    <li className="articles__item">
      <button
        type="button"
        className="articles__icon-trush"
        onClick={openAcceptPopup}
      />
      <img
        src={item.link}
        alt="Картинка записи"
        className="articles__image"
        onClick={handleClick}
      />
      <div className="articles__item-body">
        <h2 className="articles__title">{item.name}</h2>
        <div className="articles__likes-menu">
          <button type="button" className="articles__icon-like" />
          <span className="articles__likes">{item.likes}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
