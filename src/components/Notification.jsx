import React from "react";

class Notification extends React.Component {
  componentDidMount() {
    this.props.hide();
  }

  render() {
    return (
      <div className={`notification show is-primary`}>
        <button className="delete" onClick={this.props.close} />
        {this.props.message}
      </div>
    );
  }
}

export default Notification;
