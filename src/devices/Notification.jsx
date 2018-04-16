import React from 'react';

class Notification extends React.Component {

    componentDidMount() {
        this.props.hide()
    }

    render() {
        return(
                <div className={`notification show`}>
                    <button className="delete" onClick={this.props.close}></button>
                    {this.props.message}
                </div>
        )
    }
}

export default Notification;