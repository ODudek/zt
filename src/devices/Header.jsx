import React from "react";
import LoginBox from "./LoginBox";

class Header extends React.Component {
  render() {
    return (
      <div className="hero is-info">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Urządzenia</h1>
            <h2 className="subtitle">Lista urządzeń zespołu testów</h2>
          </div>
        </div>
        {!this.props.credential ? (
          <LoginBox
            credential={this.props.credential}
            handleLogIn={this.props.handleLogIn}
          />
        ) : (
          <div className="log-out">
            <button className="button" onClick={this.props.handleLogOut}>
              Wyloguj
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
