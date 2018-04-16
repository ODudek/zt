import React from "react";
import Device from './Device';

class DeviceList extends React.Component {
    constructor(){
        super();
        this.state = {sortToggle: true}
        this.sort = this.sort.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    sort (arr, index, direction, event) {
        let rows, switching, i, shouldSwitch;
        const table = event.target.closest('table')        
   switching = true;
  while (switching) {
    switching = false;
     rows = table.getElementsByTagName("TR");
    for (i = 1; i < (rows.length - 1); i++) {
       shouldSwitch = false;
      let x = rows[i].getElementsByTagName("TD")[index];
      let y = rows[i + 1].getElementsByTagName("TD")[index];
      if(direction === "upper") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
      } else {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
    }

    handleSort (e) {
        let arr = Array.from(e.target.parentNode.children)
        let index = arr.indexOf(e.target)
        if(this.state.sortToggle){
        this.sort(arr, index, "upper", e)            
        this.setState({sortToggle: !this.state.sortToggle})            
        } else {
        this.sort(arr, index, "lower", e)            
        this.setState({sortToggle: !this.state.sortToggle})                        
        }
    }

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
                            <th onClick={this.handleSort}>Model</th>
                            <th onClick={this.handleSort}>System</th>     
                            <th onClick={this.handleSort}>Dostępność</th>                            
                            <th onClick={this.handleSort}>Posiadacz</th>  
                            <th onClick={this.handleSort}>Czynności</th>                                                                             
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
