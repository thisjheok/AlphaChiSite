import './Header.css'

const Header = () => {
  return (
    <div className="Header">
      <div className="Header-logo">
        ALPHACHI
      </div>
      <div className="Header-icons">
        <div className="Header-alarm">
          <img src="/img/icons/Bell.svg" alt="alarm"/>
        </div>
        <div className="Header-user">
          <img src="/img/icons/User.svg" alt="user"/>
        </div>
      </div>
    </div>
  );
};

export default Header;
