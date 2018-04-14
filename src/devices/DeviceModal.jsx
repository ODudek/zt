import React from 'react';

class DeviceModal extends React.Component {
    constructor(props){
        super(props);
        this.state = { toBeUpdated: false, model: '', system: '', available: 'Niedostępne', holder: ''}; 
        this.closeModal = this.closeModal.bind(this);
        this.handleDeviceUpdate = this.handleDeviceUpdate.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleSystemChange = this.handleSystemChange.bind(this);
        this.handleAvailableChange = this.handleAvailableChange.bind(this);
        this.handleHolderChange = this.handleHolderChange.bind(this);
    }

    closeModal() {
        let $modal = document.querySelector('#modal');
        $modal.classList = 'modal';
        this.setState({ toBeUpdated: false })
        this.props.isUpdated(this.state.toBeUpdated)         
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
            this.setState({ available: $hiddenCheck.value })                                               
            $hiddenCheck.disabled = true;
        } else {
            this.setState({ available: e.target.value })               
            $hiddenCheck.disabled = false;          
        }
    }

    handleHolderChange(e) {
        this.setState({ holder: e.target.value })
    }

    handleDeviceUpdate(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        let model = (this.state.model) ? this.state.model : null;
        let system = (this.state.system) ? this.state.system : null;
        let available = (this.state.available) ? this.state.available : null;
        let holder = (this.state.holder) ? this.state.holder : null;
        let device = { model: model, system: system, available: available, holder: holder };
        this.props.onDeviceUpdate(id, device);
        this.setState({ toBeUpdated: false, model: '', system: '', available: 'Niedostępne', holder: ''}); 
        this.props.isUpdated(this.state.toBeUpdated) 
        console.log(this.state); 
    }

    render() {
        return(
            <div id="modal" className="modal is-active">
                        <div className="modal-background"></div>
                        <div className="modal-card">
                        <header className="modal-card-head">
                        <p className="modal-card-title">Edytuj urządzenie</p>
                        <button className="delete" aria-label="close" onClick={this.closeModal}></button>
                        </header>
                        <form onSubmit={this.handleDeviceUpdate}>
                            <section className="modal-card-body">
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
                                <div className="control">
                                    <label className="checkbox label">
                                        Dostępność:                                
                                        <input type="checkbox" name="available" value="Niedostępne" onChange={this.handleAvailableChange}/> 
                                        <input type="hidden" name="unavailable" value="Dostępne"/> 
                                    </label>  
                                </div>                          
                            </div>
                            </section>
                            <footer className="modal-card-foot">
                            <div className="field">
                                <input type="submit" value="Dodaj" className="button is-primary"/>
                            </div>
                            </footer>
                        </form>
                        
                        </div>
            </div>
        )
    }
}

export default DeviceModal;
