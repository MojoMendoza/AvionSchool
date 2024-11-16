import "./Navigation.css";
import logo from "../../assets/logo.png";

function Navigation() {
  return (
    <div className="nav">
      <div className="left">
        <img className="bank-logo" src={logo} alt="bank logo" />
        <h2>CLUTCH BANK</h2>
      </div>
      <div className="right">
        <div className="toggler">
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="headerLinks">
          <p>My Profile</p>
          <p>Account</p>
          <p>Notifications</p>
          <p>Help</p>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
