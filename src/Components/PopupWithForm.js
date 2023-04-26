function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  buttonText = "Сохранить",
  children,
}) {
  return (
    <>
      <div
        className={`popup popup_type_${name} ${isOpen ? "popup_opend" : ""}`}
      >
        <div className="popup__container">
          <button
            type="button"
            className="popup__btn-close"
            onClick={onClose}
          />
          <h2 className="popup__title">{title}</h2>
          <form
            action="#"
            className="popup__form form"
            name={name}
            noValidate=""
          >
            {children}
            <button type="submit" className="popup__btn">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
