function Header({ logo }) {
  return (
    <header className="header">
      <div className="header__up">
        <a href="#">
          <img src={logo} alt="Логотип" className="logo" />
        </a>
      </div>
    </header>
  );
}

export default Header;
