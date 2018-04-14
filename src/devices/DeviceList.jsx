import React from "react";
import Device from './Device';

class DeviceList extends React.Component {
    render(){
        let deviceNodes = this.props.data.map(device => (                
            <Device key={ device['_id'] } uniqueID={ device['_id'] } onDeviceDelete={ this.props.onDeviceDelete } onDeviceUpdate={ this.props.onDeviceUpdate }>
            { device.model }{ device.system }{ device.available}{ device.holder }
            </Device>
        ))
        return(
            <div className="DeviceList">
            
                <table className="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Model</th>
                            <th>System</th>     
                            <th>Dostępność</th>                            
                            <th>Posiadacz</th>  
                            <th>Czynności</th>                                                                             
                        </tr>
                    </thead>
                    <tbody>
                        {deviceNodes}
                    </tbody>
                    
                </table>
                
            </div>
        )
    }
}

export default DeviceList;
