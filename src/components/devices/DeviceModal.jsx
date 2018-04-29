import React from "react";
import { connect } from "react-redux";
import { showModal, hideModal } from "../../actions/modalActions";
import propTypes from "prop-types";

class DeviceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
      model: "",
      system: "",
      holder: ""
    };
    this.closeModal = this.closeModal.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.buildNewDevice = this.buildNewDevice.bind(this);
  }

  closeModal() {
    let $modal = document.querySelector("#modal");
    $modal.classList = "modal";
    this.props.hideModal();
  }

  buildNewDevice() {
    let model = this.state.model ? this.state.model : null;
    let system = this.state.system ? this.state.system : null;
    let holder = this.state.holder ? this.state.holder : null;
    let device = {
      model: model,
      system: system,
      holder: holder
    };
    return device;
  }

  submitForm(e) {
    e.preventDefault();
    let device = this.buildNewDevice();
    if (this.state.isUpdate) {
      let id = this.props.device._id;
      this.props.onDeviceUpdate(id, device);
      this.closeModal();
    } else {
      this.props.onDeviceAdd(device);
      this.closeModal();
    }
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  fillModal() {
    if (this.props.device._id) {
      this.setState({
        model: this.props.device.model,
        system: this.props.device.system,
        holder: this.props.device.holder,
        isUpdate: true
      });
    } else {
      this.setState({
        model: "",
        system: "",
        holder: "",
        isUpdate: false
      });
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.fillModal();
    }, 500);
  }

  render() {
    return (
      <div id="modal" className="modal is-active show">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.title}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.closeModal}
            />
          </header>
          <form onSubmit={this.submitForm}>
            <section className="modal-card-body">
              <div className="field">
                <label htmlFor="model" className="label">
                  Model urządzenia:
                </label>
                <div className="control">
                  <input
                    type="text"
                    name="model"
                    onChange={this.onInputChange}
                    className="input"
                    required
                    value={this.state.model}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="system" className="label">
                  System urządzenia:
                </label>
                <div className="control">
                  <input
                    type="text"
                    name="system"
                    onChange={this.onInputChange}
                    className="input"
                    required
                    value={this.state.system}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="holder" className="label">
                  Kto posiada:
                </label>
                <div className="control">
                  <input
                    type="text"
                    name="holder"
                    onChange={this.onInputChange}
                    className="input"
                    required
                    value={this.state.holder}
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <div className="field">
                <input
                  type="submit"
                  value={this.props.btnLabel}
                  className="button is-primary"
                />
              </div>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}

DeviceModal.propTypes = {
  isModal: propTypes.bool.isRequired,
  showModal: propTypes.func.isRequired,
  hideModal: propTypes.func.isRequired,
  device: propTypes.object
};

const mapStateToProps = state => ({
  isModal: state.modal.isOpen,
  device: state.devices.item
});

export default connect(mapStateToProps, { showModal, hideModal })(DeviceModal);
