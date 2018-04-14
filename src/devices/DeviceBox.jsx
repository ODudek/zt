import React from "react";
import DeviceForm from './DeviceForm';
import DeviceList from './DeviceList';
import axios from 'axios';

class DeviceBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.store = [];
        this.loadDevices = this.loadDevices.bind(this);
        this.handleDeviceSubmit = this.handleDeviceSubmit.bind(this);
        this.handleDeviceDelete = this.handleDeviceDelete.bind(this);
        this.handleDeviceUpdate = this.handleDeviceUpdate.bind(this);
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
            .catch(err => {
                console.error(err);
            })
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
                <div className="container">
                    <DeviceList onDeviceDelete={ this.handleDeviceDelete } onDeviceUpdate={ this.handleDeviceUpdate } data={ this.state.data }/>
                </div>
                <DeviceForm onDeviceSubmit={ this.handleDeviceSubmit }/>                
            </div>
        )
    }
}

export default DeviceBox;
