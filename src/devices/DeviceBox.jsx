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
      credential: false,
      deviceUrl: `${this.props.url}/devices`
    };
    this.loadDevices = this.loadDevices.bind(this);
    this.handleDeviceSubmit = this.handleDeviceSubmit.bind(this);
    this.handleDeviceDelete = this.handleDeviceDelete.bind(this);
    this.handleDeviceUpdate = this.handleDeviceUpdate.bind(this);
    this.autoHideNotification = this.autoHideNotification.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.openModal = this.openModal.bind(this);
    this.addDevice = this.addDevice.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    this.loadDevices();
    this.checkCredential();
  }

  loadDevices() {
    axios.get(this.state.deviceUrl).then(res => {
      this.setState({ data: res.data });
    });
  }

  handleDeviceSubmit(device) {
    let devices = this.state.data;
    device._id = Date.now();
    let newDevices = devices.concat([device]);
    this.setState({ data: newDevices });
    axios
      .post(this.state.deviceUrl, device)
      .then(this.setState({ isAdded: true }))
      .catch(err => {
        console.error(err);
      });
  }

  handleDeviceDelete(id) {
    axios
      .delete(`${this.state.deviceUrl}/${id}`)
      .then(this.setState({ isRemoved: true }))
      .catch(err => {
        console.error(err);
      });
  }

  handleDeviceUpdate(id, device) {
    axios
      .put(`${this.state.deviceUrl}/${id}`, device)
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

  handleLogIn(login) {
    axios.post(`${this.props.url}/auth`, login).then(res => {
      if (res.data.success) {
        this.setState({ credential: true });
        this.storageUser(login);
      } else {
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
      <div className="DeviceBox">
        <Header
          credential={this.state.credential}
          handleLogIn={this.handleLogIn}
          handleLogOut={this.handleLogOut}
        />
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
