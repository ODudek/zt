import React from "react";
import DeviceModal from "./DeviceModal";

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toBeUpdated: false };
    this.deleteDevice = this.deleteDevice.bind(this);
    this.updateDevice = this.updateDevice.bind(this);
    this.isUpdated = this.isUpdated.bind(this);
  }

  updateDevice(e) {
    e.preventDefault();
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }

  deleteDevice(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onDeviceDelete(id);
  }

  isUpdated(isUpdated) {
    this.setState({ toBeUpdated: isUpdated });
  }

  render() {
    return (
      <tr>
        <td>{this.props.children[0]}</td>
        <td>{this.props.children[1]}</td>
        <td>{this.props.children[2]}</td>
        <td>{this.props.children[3]}</td>
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
            {this.state.toBeUpdated ? (
              <DeviceModal
                uniqueID={this.props.uniqueID}
                isUpdated={this.isUpdated}
                onDeviceUpdate={this.props.onDeviceUpdate}
                device={this.props.children}
                btnLabel="Zaktualizuj"
                title="Aktualizuj urządzenie"
              />
            ) : null}
          </td>
        ) : null}
      </tr>
    );
  }
}

export default Device;
