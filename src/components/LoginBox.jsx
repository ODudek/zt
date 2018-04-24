import React from "react";
import hash from "js-md5";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { logIn } from "../actions/authActions";

class LoginBox extends React.Component {
  constructor() {
    super();
    this.state = { login: "", password: "" };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLoginChange(e) {
    this.setState({ login: e.target.value });
  }

  handlePasswordChange(e) {
    let hashPassword = hash.update(e.target.value).hex();
    this.setState({ password: hashPassword });
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.logIn(this.state);
    this.storageUser(this.state);
  }

  storageUser(login) {
    localStorage.setItem("login", JSON.stringify(login));
  }

  render() {
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">Panel logowania</p>
        </header>
        <form onSubmit={this.handleLogin}>
          <div className="card-content">
            <div className="field">
              <input
                className={`input ${this.props.failLogIn ? "is-danger" : null}`}
                type="text"
                placeholder="Login"
                onChange={this.handleLoginChange}
                required
              />
            </div>
            <div className="field">
              <input
                className={`input ${this.props.failLogIn ? "is-danger" : null}`}
                type="password"
                placeholder="Hasło"
                onChange={this.handlePasswordChange}
                required
              />
            </div>
          </div>
          <footer className="card-footer">
            <button
              type="submit"
              className="card-button button is-primary is-outlined"
            >
              Zaloguj
            </button>
          </footer>
        </form>
      </div>
    );
  }
}

LoginBox.propTypes = {
  credential: propTypes.bool.isRequired,
  logIn: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  credential: state.auth.credential
});

export default connect(mapStateToProps, { logIn })(LoginBox);
