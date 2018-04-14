import React from "react";
import DeviceBox from './devices/DeviceBox';

class App extends React.Component{
    render(){
        return(
            <div className="App">
            <DeviceBox
                url='http://localhost:3001/api/devices'
                pollInterval={1000} />
            </div>
        )
    }
}

export default App;