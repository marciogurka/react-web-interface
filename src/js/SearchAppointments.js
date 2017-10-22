var React = require('react');

var SearchAppointments = React.createClass({
    handleSort: function (e) {
        console.log(e);
        this.props.onReOrder(e.target.id, this.props.orderDirection)
    }, //handleSort function
    handleOrder: function (e) {
        this.props.onReOrder(this.props.orderBy, e.target.id)
    }, //handleOrder function
    render: function () {
        return (
            <div className="row">
                <div className="input-field col s12">
                    <i className="material-icons prefix">search</i>
                    <input id="icon_prefix" type="text" className="validate"/>
                    <label htmlFor="icon_prefix">Search Appointments</label>
                </div>
                <div className="col s12">
                    <div className="fixed-action-btn toolbar">
                        <a className="btn-floating btn-large red">
                            <i className="large material-icons">reorder</i>
                        </a>
                        <ul>
                            <li className="waves-effect waves-light"><a id="first_name" onClick={this.handleSort}> First Name { (this.props.orderBy === 'first_name') ? <i className="material-icons right">check</i> : null}</a></li>
                            <li className="waves-effect waves-light"><a id="last_name" onClick={this.handleSort}>Last Name { (this.props.orderBy === 'last_name') ? <i className="material-icons right">check</i> : null}</a></li>
                            <li className="waves-effect waves-light"><a id="type" onClick={this.handleSort}>Type { (this.props.orderBy === 'type') ? <i className="material-icons right">check</i> : null}</a></li>
                            <li className="waves-effect waves-light"><a id="asc" onClick={this.handleOrder}>Ascending { (this.props.orderDirection === 'asc') ? <i className="material-icons right">check</i> : null}</a></li>
                            <li className="waves-effect waves-light"><a id="desc" onClick={this.handleOrder}>Descending { (this.props.orderDirection === 'desc') ? <i className="material-icons right">check</i> : null}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});//SearchAppointments component

module.exports = SearchAppointments;