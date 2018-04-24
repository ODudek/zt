import React from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { logIn, logOut } from "./actions/authActions";

class App extends React.Component {
  constructor() {
    super();
    this.checkCredential = this.checkCredential.bind(this);
  }

  componentDidMount() {
    this.checkCredential();
  }

  checkCredential() {
    let credential = localStorage.getItem("login");
    let objCredential = JSON.parse(credential);
    if (objCredential) {
      if (objCredential.login && objCredential.password) {
        this.props.logIn();
      }
    } else {
      this.props.logOut();
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Menu credential={this.props.credential} />
      </div>
    );
  }
}

App.propTypes = {
  credential: propTypes.bool.isRequired,
  logIn: propTypes.func.isRequired,
  logOut: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  credential: state.auth.credential
});

export default connect(mapStateToProps, { logIn, logOut })(App);
