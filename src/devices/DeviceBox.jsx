import axios from "axios";
import React from "react";
import DeviceList from "./DeviceList";
import DeviceModal from "./DeviceModal";
import Header from "./Header";
import Notification from "./Notification";

class DeviceBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false,
      data: [],
      isUpdated: false,
      isRemoved: false,
      isAdded: false,
      isModalOpened: false,
      credential: false
    };
    this.loadDevices = this.loadDevices.bind(this);
    this.handleDeviceSubmit = this.handleDeviceSubmit.bind(this);
    this.handleDeviceDelete = this.handleDeviceDelete.bind(this);
    this.handleDeviceUpdate = this.handleDeviceUpdate.bind(this);
    this.autoHideNotification = this.autoHideNotification.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.openModal = this.openModal.bind(this);
    this.addDevice = this.addDevice.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  componentDidMount() {
    this.loadDevices();
  }

  loadDevices() {
    axios.get(this.props.url).then(res => {
      this.setState({ data: res.data });
    });
  }

  handleDeviceSubmit(device) {
    let devices = this.state.data;
    device._id = Date.now();
    let newDevices = devices.concat([device]);
    this.setState({ data: newDevices });
    axios
      .post(this.props.url, device)
      .then(this.setState({ isAdded: true }))
      .catch(err => {
        console.error(err);
      });
  }

  handleDeviceDelete(id) {
    axios
      .delete(`${this.props.url}/${id}`)
      .then(this.setState({ isRemoved: true }))
      .catch(err => {
        console.error(err);
      });
  }

  handleDeviceUpdate(id, device) {
    axios
      .put(`${this.props.url}/${id}`, device)
      .then(this.setState({ isUpdated: true }))
      .catch(err => {
        console.error(err);
      });
  }

  autoHideNotification() {
    const ONE_SECOND = 1000;
    setTimeout(() => {
      this.setState({ hide: true });
      this.setState({ isUpdated: false, isAdded: false, isRemoved: false });
    }, ONE_SECOND * 5);
  }

  closeNotification() {
    this.setState({ isUpdated: false, isAdded: false, isRemoved: false });
  }

  openModal() {
    this.setState({ isModalOpened: true });
  }

  addDevice(isAdded) {
    this.setState({ isModalOpened: isAdded });
  }

  logIn(credential) {
    this.setState({ credential: credential });
  }

  render() {
    return (
      <div className="DeviceBox">
        <Header credential={this.state.credential} onLogin={this.logIn} />
        <div className="container box-notification">
          {this.state.isUpdated ? (
            <Notification
              message="Zaktualizowano urządzenie"
              hide={this.autoHideNotification}
              close={this.closeNotification}
            />
          ) : null}
          {this.state.isAdded ? (
            <Notification
              message="Urządzenie zostało dodane do listy"
              hide={this.autoHideNotification}
              close={this.closeNotification}
            />
          ) : null}
          {this.state.isRemoved ? (
            <Notification
              message="Urządzenie zostało usunięte z listy"
              hide={this.autoHideNotification}
              close={this.closeNotification}
            />
          ) : null}
        </div>
        <div className="container">
          <DeviceList
            onDeviceDelete={this.handleDeviceDelete}
            onDeviceUpdate={this.handleDeviceUpdate}
            data={this.state.data}
            credential={this.state.credential}
          />
        </div>
        {this.state.credential ? (
          <div className="add">
            <div className="right">
              <span
                className="icon is-large button is-primary is-outlined is-rounded"
                onClick={this.openModal}
              >
                <i className="fa">&#xf067;</i>
              </span>
            </div>
            {this.state.isModalOpened ? (
              <DeviceModal
                onDeviceSubmit={this.handleDeviceSubmit}
                isAdded={this.addDevice}
                btnLabel="Dodaj"
                title="Dodaj urządzenie"
              />
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default DeviceBox;
