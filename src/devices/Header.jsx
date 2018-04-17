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
        {!this.props.credential ? <LoginBox credential={this.props.credential}/> : null}
      </div>
    );
  }
}

export default Header;
