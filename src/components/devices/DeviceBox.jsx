import React from "react";
import DeviceList from "./DeviceList";
import DeviceModal from "./DeviceModal";
import { connect } from "react-redux";
import {
  fetchDevices,
  createDevice,
  clearDevice,
  updateDevice
} from "../../actions/deviceActions";
import { showModal } from "../../actions/modalActions.js";
import propTypes from "prop-types";
import NotificationBox from "../notification/NotificationBox";

class DeviceBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeviceAdd = this.handleDeviceAdd.bind(this);
    this.handleDeviceUpdate = this.handleDeviceUpdate.bind(this);
    this.addDevice = this.addDevice.bind(this);
  }

  componentDidMount() {
    this.props.fetchDevices();
  }

  handleDeviceAdd(device) {
    this.props.createDevice(device, this.props.devices);
    device._id = Date.now();
    this.props.devices.push(device);
    setTimeout(this.props.fetchDevices, 100);
  }

  handleDeviceUpdate(id, device) {
    this.props.updateDevice(id, device);
    this.props.devices.concat([device]);
    setTimeout(this.props.fetchDevices, 100);
  }

  addDevice() {
    this.props.clearDevice();
    this.props.showModal();
  }

  render() {
    return (
      <div className="DeviceBox">
        <NotificationBox />
        <div className="container">
          <DeviceList />
        </div>
        {this.props.credential ? (
          <div className="add">
            <div className="right">
              <span
                className="icon is-large button is-primary is-outlined is-rounded"
                onClick={this.addDevice}
              >
                <i className="fa">&#xf067;</i>
              </span>
            </div>
            {this.props.isModal ? (
              <DeviceModal
                onDeviceAdd={this.handleDeviceAdd}
                onDeviceUpdate={this.handleDeviceUpdate}
                title="Dodaj urządzenie"
                btnLabel="Dodaj!"
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
  createDevice: propTypes.func.isRequired,
  clearDevice: propTypes.func.isRequired,
  isModal: propTypes.bool.isRequired,
  showModal: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  devices: state.devices.items,
  isModal: state.modal.isOpen,
  credential: state.auth.credential
});

export default connect(mapStateToProps, {
  fetchDevices,
  showModal,
  createDevice,
  clearDevice,
  updateDevice
})(DeviceBox);
