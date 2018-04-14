import React from "react";
import DeviceForm from './DeviceForm';
import DeviceList from './DeviceList';
import Notification from './Notification';
import axios from 'axios';

class DeviceBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = { hide: false, data: [], isUpdated: false, type: 'is-success', isRemoved: false, isAdded: false}
        this.loadDevices = this.loadDevices.bind(this);
        this.handleDeviceSubmit = this.handleDeviceSubmit.bind(this);
        this.handleDeviceDelete = this.handleDeviceDelete.bind(this);
        this.handleDeviceUpdate = this.handleDeviceUpdate.bind(this);
        this.autoHideNotification = this.autoHideNotification.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
    }

    componentDidMount() {
        this.loadDevices();
        setInterval(this.loadDevices, this.props.pollInterval)
    }

    loadDevices() {
        axios
            .get(this.props.url)
            .then(res =>{
                this.setState({data: res.data})
            })
    }

    handleDeviceSubmit(device) {
        let devices = this.state.data;
        device._id = Date.now();
        let newDevices = devices.concat([device])
        this.setState({ data: newDevices })
        axios
            .post(this.props.url, device)
            .then(this.setState({isAdded: true}))
            .catch(err => {
                console.error(err);
            })
    }

    handleDeviceDelete(id) {
        axios
            .delete(`${this.props.url}/${id}`)
            .catch(err => {
                console.error(err);
            })
    }

    handleDeviceUpdate(id, device) {
        axios
            .put(`${this.props.url}/${id}`, device)
            .then(this.setState({isUpdated: true}))
            .catch(err => {
                console.error(err);
            })
    }

    autoHideNotification() {
        const ONE_SECOND = 1000;
        setTimeout(() => {
            this.setState({hide: true})
            this.setState({isUpdated: false})
        }, ONE_SECOND * 5);
    }

    closeNotification() {
        this.setState({isUpdated: false})
    }

    render() {
        return(
            <div className="DeviceBox">
                <section className="hero is-info">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                            Urządzenia
                            </h1>
                            <h2 className="subtitle">
                            Lista urządzeń zespołu testów
                            </h2>
                        </div>
                    </div>
                </section>
                <div className="container box-notification">
                {(this.state.isUpdated) ?
                        <Notification message="Zaktualizowano urządzenie" type={this.state.type} hide={this.autoHideNotification} close={this.closeNotification}/>
                :null}
                </div>
                <div className="container">
                    <DeviceList onDeviceDelete={ this.handleDeviceDelete } onDeviceUpdate={ this.handleDeviceUpdate } data={ this.state.data }/>
                </div>
                <DeviceForm onDeviceSubmit={ this.handleDeviceSubmit }/>                
            </div>
        )
    }
}

export default DeviceBox;
