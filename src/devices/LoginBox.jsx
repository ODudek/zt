import React from "react";

class LoginBox extends React.Component {
  constructor() {
    super();
    this.state = { login: '', password: '', logIn: false };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLoginChange(e) {
    this.setState({login: e.target.value})
  }

  handlePasswordChange(e) {
      this.setState({password: e.target.value})
  }

  handleLogin(e) {
    e.preventDefault();
    console.log(this.state);
    this.setState({logIn: true})
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
                className="input"
                type="text"
                placeholder="Login"
                onChange={this.handleLoginChange}
              />
            </div>
            <div className="field">
              <input
                className="input"
                type="password"
                placeholder="Hasło"
                onChange={this.handlePasswordChange}
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

export default LoginBox;
