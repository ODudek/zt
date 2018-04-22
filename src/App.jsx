import React from "react";
import Header from "./components/Header";
import axios from "axios";
import Menu from "./components/Menu";
import { Provider } from "react-redux";
import store from "./store";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      credential: false,
      url: "http://localhost:3001/api",
      failLogIn: false
    };
    this.handleLogIn = this.handleLogIn.bind(this);
    this.checkCredential = this.checkCredential.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    this.checkCredential();
  }

  handleLogIn(login) {
    axios.post(`${this.state.url}/auth`, login).then(res => {
      if (res.data.success) {
        this.setState({ credential: true });
        this.setState({ failLogIn: false });
        this.storageUser(login);
      } else {
        this.setState({ failLogIn: true });
        this.setState({ credential: false });
      }
    });
  }

  storageUser(login) {
    localStorage.setItem("login", JSON.stringify(login));
  }

  destroyStorageUser() {
    localStorage.removeItem("login");
  }

  checkCredential() {
    let credential = localStorage.getItem("login");
    let objCredential = JSON.parse(credential);
    if (objCredential) {
      if (objCredential.login && objCredential.password) {
        this.setState({ credential: true });
      }
    } else {
      this.setState({ credential: false });
    }
  }

  handleLogOut() {
    this.destroyStorageUser();
    this.setState({ credential: false });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header
            failLogIn={this.state.failLogIn}
            credential={this.state.credential}
            handleLogIn={this.handleLogIn}
            handleLogOut={this.handleLogOut}
          />
          <Menu
            url={this.state.url}
            handleLogOut={this.handleLogOut}
            handleLogIn={this.handleLogIn}
            credential={this.state.credential}
          />
        </div>
      </Provider>
    );
  }
}

export default App;
