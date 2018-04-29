import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import NotificationBox from "../notification/NotificationBox";

class HolidayBox extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    if (e.target.nodeName === "TD") {
      console.log(e.target);
    }
  }
  render() {
    let getYear = new Date().getFullYear();
    return (
      <div className="container">
        <NotificationBox />
        <h1 className="has-text-centered is-size-2">
          Plany urlopowe ZT na rok {getYear}
        </h1>
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th />
              <th>Styczeń</th>
              <th>Luty</th>
              <th>Marzec</th>
              <th>Kwiecień</th>
              <th>Maj</th>
              <th>Czerwiec</th>
              <th>Lipiec</th>
              <th>Sierpień</th>
              <th>Wrzesień</th>
              <th>Październik</th>
              <th>Listopad</th>
              <th>Grudzień</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={this.props.credential ? this.onClick : null}>
              <th>Olek</th>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <th>Norbert</th>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <th>Kamil</th>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <th>Michał</th>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

HolidayBox.propTypes = {};

const mapStateToProps = state => ({
  credential: state.auth.credential
});

export default connect(mapStateToProps, {})(HolidayBox);
