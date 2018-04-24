import React from "react";
import DeviceModal from "./DeviceModal";
import { connect } from "react-redux";
import { showModal } from "../../actions/modalActions";
import {
  deleteDevice,
  updateDevice,
  getDevice
} from "../../actions/deviceActions";
import propTypes from "prop-types";

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toBeUpdated: false };
    this.deleteDevice = this.deleteDevice.bind(this);
    this.updateDevice = this.updateDevice.bind(this);
  }

  deleteDevice() {
    let id = this.props.uniqueID;
    this.removeDeviceFromArray(id, this.props.devices);
    this.props.deleteDevice(id, this.props.devices);
  }

  updateDevice() {
    let id = this.props.uniqueID;
    this.props.getDevice(id);
    this.props.showModal();
  }

  removeDeviceFromArray(id, array) {
    array.forEach(device => {
      if (device._id === id) {
        let index = array.indexOf(device);
        array.splice(index, 1);
      }
    });
  }

  render() {
    return (
      <tr>
        <td>{this.props.children[0]}</td>
        <td>{this.props.children[1]}</td>
        <td>{this.props.children[2]}</td>
        {this.props.credential ? (
          <td>
            <div className="buttons">
              <button
                href="#"
                onClick={this.updateDevice}
                className="button is-info is-outlined"
              >
                Aktualizuj
              </button>
              <button
                href="#"
                onClick={this.deleteDevice}
                className="button is-danger is-outlined"
              >
                Usuń
              </button>
            </div>
            {this.props.isModal ? (
              <DeviceModal/>
            ) : null}
          </td>
        ) : null}
      </tr>
    );
  }
}

Device.propTypes = {
  devices: propTypes.array.isRequired,
  showModal: propTypes.func.isRequired,
  isModal: propTypes.bool.isRequired,
  deleteDevice: propTypes.func.isRequired,
  updateDevice: propTypes.func.isRequired,
  getDevice: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  isModal: state.modal.isOpen,
  devices: state.devices.items
});

export default connect(mapStateToProps, {
  showModal,
  deleteDevice,
  updateDevice,
  getDevice
})(Device);
