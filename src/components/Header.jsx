import React from "react";
import LoginBox from "./LoginBox";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { logOut } from "../actions/authActions";

class Header extends React.Component {
  constructor() {
    super();
    this.destroyStorageUser = this.destroyStorageUser.bind(this);
  }

  destroyStorageUser() {
    this.props.logOut();
    localStorage.removeItem("login");
  }

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
          <LoginBox />
        ) : (
          <div className="log-out">
            <button className="button" onClick={this.destroyStorageUser}>
              Wyloguj
            </button>
          </div>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  credential: propTypes.bool.isRequired,
  logOut: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  credential: state.auth.credential
});

export default connect(mapStateToProps, { logOut })(Header);
