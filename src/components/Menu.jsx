import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DeviceBox from "./devices/DeviceBox";
import React from "react";
import BacklogBox from "./backlog/BacklogBox";
import InProgressBox from "./in-progress/InProgressBox";
import HolidayBox from "./holiday/HolidayBox";

class Menu extends React.Component {
  constructor() {
    super();
    this.changeClass = this.changeClass.bind(this);
  }
  clearActive() {
    let $activeElements = document.querySelectorAll(".is-active");
    $activeElements.forEach(active => {
      active.classList = "";
    });
  }
  changeClass(e) {
    let a = e.target;
    let parent = a.parentNode;
    this.clearActive();
    parent.classList = "is-active";
  }
  render() {
    return (
      <Router>
        <div>
          <div className="tabs">
            <ul>
              <li className="is-active" onClick={this.changeClass}>
                <Link to="/">Urządzenia</Link>
              </li>
              <li onClick={this.changeClass}>
                <Link to="/backlog">Backlog</Link>
              </li>
              <li onClick={this.changeClass}>
                <Link to="/in-progress">W trakcie realizacji</Link>
              </li>
              <li onClick={this.changeClass}>
                <Link to="/holiday">Urlopy</Link>
              </li>
            </ul>
          </div>
          <Route
            onChange={this.isActive}
            exact={true}
            path="/"
            render={() => (
              <DeviceBox
                url={this.props.url}
                handleLogOut={this.props.handleLogOut}
                handleLogIn={this.props.handleLogIn}
                credential={this.props.credential}
              />
            )}
          />
          <Route
            exact
            path="/backlog"
            render={() => (
              <BacklogBox
                url={this.props.url}
                credential={this.props.credential}
              />
            )}
          />
          <Route
            exact
            path="/in-progress"
            render={() => (
              <InProgressBox
                url={this.props.url}
                credential={this.props.credential}
              />
            )}
          />
          <Route
            exact
            path="/holiday"
            render={() => (
              <HolidayBox
                url={this.props.url}
                credential={this.props.credential}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default Menu;
