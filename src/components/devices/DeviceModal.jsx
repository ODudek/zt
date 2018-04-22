import React from "react";
import { connect } from "react-redux";
import { showModal, hideModal } from "../../actions/modalActions";
import propTypes from "prop-types";

class DeviceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      model: "",
      system: "",
      available: "Niedostępne",
      holder: "",
      isAdded: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleDeviceUpdate = this.handleDeviceUpdate.bind(this);
    this.handleAvailableChange = this.handleAvailableChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  closeModal() {
    let $modal = document.querySelector("#modal");
    $modal.classList = "modal";
    this.props.hideModal();
  }

  handleAvailableChange(e) {
    let $hiddenCheck = document.querySelector('[name="unavailable"]');
    if (e.target.checked) {
      this.setState({ available: e.target.value });
      $hiddenCheck.disabled = false;
    } else {
      e.target.checked = false;
      this.setState({ available: $hiddenCheck.value });
      $hiddenCheck.disabled = true;
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  buildNewDevice() {
    let model = this.state.model ? this.state.model : null;
    let system = this.state.system ? this.state.system : null;
    let available = this.state.available ? this.state.available : null;
    let holder = this.state.holder ? this.state.holder : null;
    let device = {
      model: model,
      system: system,
      available: available,
      holder: holder
    };
    return device;
  }

  handleDeviceUpdate(e) {
    e.preventDefault();
    let device = this.buildNewDevice();
    let id = this.props.uniqueID;
    if (this.props.isUpdated) {
      this.props.onDeviceUpdate(id, device);
      this.setState({
        toBeUpdated: false,
        model: "",
        system: "",
        available: "Niedostępne",
        holder: ""
      });
    } else {
      this.props.onDeviceSubmit(device);
      this.setState({
        toBeUpdated: false,
        model: "",
        system: "",
        available: "Niedostępne",
        holder: ""
      });
      this.closeModal();
    }
  }

  checkCheckBox() {
    let $check = document.querySelector('[name="available"]');
    $check.checked = true;
    this.setState({ available: "Dostępne" });
  }

  componentDidMount() {
    if (this.props.device) {
      this.setState({
        model: this.props.device[0],
        system: this.props.device[1],
        holder: this.props.device[3]
      });
      if (this.props.device[2] === "Dostępne") {
        this.setState({ available: this.props.device[2] });
        this.checkCheckBox();
      }
    } else {
      this.checkCheckBox();
    }
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
          <form onSubmit={this.handleDeviceUpdate}>
            <section className="modal-card-body">
              <div className="field">
                <label htmlFor="model" className="label">
                  Model urządzenia:
                </label>
                <div className="control">
                  <input
                    type="text"
                    name="model"
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                    className="input"
                    required
                    value={this.state.holder}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="checkbox label">
                    Dostępność:
                    <input
                      type="checkbox"
                      name="available"
                      value="Dostępne"
                      onChange={this.handleAvailableChange}
                    />
                    <input
                      type="hidden"
                      name="unavailable"
                      value="Niedostępne"
                    />
                  </label>
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
  hideModal: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  isModal: state.modal.isOpen
});

export default connect(mapStateToProps, { showModal, hideModal })(DeviceModal);
