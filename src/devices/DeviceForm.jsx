import React from "react";

class DeviceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { model: '', system: '', available: 'Niedostępne', holder: ''};
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleSystemChange = this.handleSystemChange.bind(this);
        this.handleAvailableChange = this.handleAvailableChange.bind(this);
        this.handleHolderChange = this.handleHolderChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkCheckBox = this.checkCheckBox.bind(this);
    }

    handleModelChange(e) {
        this.setState({ model: e.target.value })
    }

    handleSystemChange(e) {
        this.setState({ system: e.target.value })
    }

    handleAvailableChange(e) {
        let $hiddenCheck = document.querySelector('[name="unavailable"]')        
        if(e.target.checked) {                
            this.setState({ available: e.target.value })                                               
            $hiddenCheck.disabled = false;
        } else {
            e.target.checked = false;        
            this.setState({ available: $hiddenCheck.value })               
            $hiddenCheck.disabled = true;          
        }
    }

    handleHolderChange(e) {
        this.setState({ holder: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        if(!this.state.model || !this.state.system || !this.state.holder) {
            return;
        }
        this.props.onDeviceSubmit({model: this.state.model, system: this.state.system, available: this.state.available, holder: this.state.holder})
        this.setState({ model: '', system: '', holder: ''})
        e.target.reset();   
        this.checkCheckBox()    
    }

    checkCheckBox() {
        let $check = document.querySelector('[name="available"]')
        $check.checked = true;
        this.setState({available: 'Dostępne'})
    }

    componentDidMount() {
        this.checkCheckBox()
    }

    render() {
        return(
            <footer className="footer">
                <div className="container">
                    <div className="content has-text-centered">
                        <form id="device-form" onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label htmlFor="model" className="label">Model urządzenia:</label>
                                <div className="control">
                                    <input type="text" name="model" onChange={this.handleModelChange} className="input" required/>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="system" className="label">System urządzenia:</label>
                                <div className="control">
                                    <input type="text" name="system" onChange={this.handleSystemChange} className="input" required/>   
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="holder" className="label">Kto posiada:</label>
                                <div className="control">
                                    <input type="text" name="holder" onChange={this.handleHolderChange} className="input" required/>
                                </div>
                            </div>                
                            <div className="field"> 
                                <div className="control has-text-centered">
                                    <label className="checkbox label">
                                        Dostępność:                                
                                        <input type="checkbox" name="available" value="Dostępne" onChange={this.handleAvailableChange}/> 
                                        <input type="hidden" name="unavailable" value="Niedostępne"/> 
                                    </label>  
                                </div>                          
                            </div>
                            <div className="field">
                                <input type="submit" value="Dodaj" className="button is-primary"/>
                            </div>
                        </form>
                    </div>
                </div>
            </footer>
        )
    }
}

export default DeviceForm;
