import axios from "axios";
import React from "react";
import DeviceList from "./DeviceList";
import DeviceModal from "./DeviceModal";
import Notification from "../Notification";
import { connect } from "react-redux";
import {
  fetchDevices,
  newDevice,
  updateDevice,
  deleteDevice
} from "../../actions/deviceActions";
import { showModal } from "../../actions/modalActions.js";
import propTypes from "prop-types";

class DeviceBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false,
      isUpdated: false,
      isRemoved: false,
      isAdded: false
    };
    this.handleDeviceSubmit = this.handleDeviceSubmit.bind(this);
    this.handleDeviceDelete = this.handleDeviceDelete.bind(this);
    this.autoHideNotification = this.autoHideNotification.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.addDevice = this.addDevice.bind(this);
    this.updateDeviceList = this.updateDeviceList.bind(this);
  }

  componentDidMount() {
    this.props.fetchDevices();
  }

  handleDeviceSubmit(device) {
    this.props.newDevice(device);
  }

  handleDeviceDelete(id) {
    axios
      .delete(`${this.state.deviceUrl}/${id}`)
      .then(this.setState({ isRemoved: true }))
      .then(this.deleteDeviceFromList(id))
      .catch(err => {
        console.error(err);
      });
  }

  updateDeviceList(id, updatedDevice) {
    let devices = this.props.devices;
    devices.forEach(device => {
      if (device._id === id) {
        device.model = updatedDevice.model;
        device.system = updatedDevice.system;
        device.available = updatedDevice.available;
        device.holder = updatedDevice.holder;
      }
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

  addDevice(isAdded) {}

  render() {
    return (
      <div className="DeviceBox">
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
            onDeviceDelete={this.props.deleteDevice}
            onDeviceUpdate={this.props.updateDevice}
            data={this.props.devices}
            credential={this.props.credential}
          />
        </div>
        {this.props.credential ? (
          <div className="add">
            <div className="right">
              <span
                className="icon is-large button is-primary is-outlined is-rounded"
                onClick={this.props.showModal}
              >
                <i className="fa">&#xf067;</i>
              </span>
            </div>
            {this.props.isModal ? (
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

DeviceBox.propTypes = {
  fetchDevices: propTypes.func.isRequired,
  devices: propTypes.array.isRequired,
  newDevice: propTypes.func.isRequired,
  url: propTypes.string,
  isModal: propTypes.bool.isRequired,
  showModal: propTypes.func.isRequired,
  updateDevice: propTypes.func.isRequired,
  deleteDevice: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  devices: state.devices.items,
  newDevice: state.devices.item,
  url: state.devices.url,
  isModal: state.modal.isOpen
});

export default connect(mapStateToProps, {
  fetchDevices,
  newDevice,
  showModal,
  updateDevice,
  deleteDevice
})(DeviceBox);
