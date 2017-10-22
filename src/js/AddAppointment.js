var React = require('react');

var addAppointment = React.createClass({

    toggleAptDisplay: function () {
        this.props.handleToggle();
    },
    handleAdd: function(e){
        var tempItem = {
            first_name: this.refs.inputFirstName.value,
            last_name: this.refs.inputLastName.value,
            type: this.refs.inputType.value,
            ip_address: this.refs.inputIp.value,
            email: this.refs.inputEmail.value,
        }//tempItem

        e.preventDefault();
        this.props.addApt(tempItem);
    }
    ,
    render: function () {
        var displayAptBody = {
            display: this.props.bodyVisible ? 'block' : 'none'
        }
        return (
            <div className="row">
                <div className="col s12">
                    <a className="waves-effect waves-red btn-flat" onClick={ this.toggleAptDisplay }>
                        Add Appointment<i className="material-icons left">plus_one</i>
                    </a>
                    <div style={displayAptBody}>
                        <form className="col s12" onSubmit={ this.handleAdd }>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="first_name" ref="inputFirstName" type="text" className="validate"/>
                                    <label htmlFor="first_name">First Name</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="last_name" ref="inputLastName" type="text" className="validate"/>
                                    <label htmlFor="last_name">Last Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="type" ref="inputType" type="text" className="validate"/>
                                    <label htmlFor="type">Type</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="email" ref="inputEmail" type="email" className="validate"/>
                                    <label htmlFor="email">E-mail</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="ip" ref="inputIp" type="text" className="validate"/>
                                    <label htmlFor="ip">IP Address</label>
                                </div>
                                <div className="input-field col s6">
                                    <button type="submit" className="waves-effect waves-light btn light-green darken-4"><i className="material-icons left">save</i>save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );//return function
    }//render function
});

module.exports = addAppointment;