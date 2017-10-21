var React = require('react');

var AptList = React.createClass({

    handleDelete: function () {
      this.props.onDelete(this.props.whichItem)
    },
    render: function () {
        return (
            <li className="collection-item">
                <div>
                    <a href="#!" className="secondary-content" onClick={this.handleDelete}><i className="material-icons">close</i></a>
                    <p>{this.props.singleItem.first_name} {this.props.singleItem.last_name}</p>
                    <p>E-mail: {this.props.singleItem.email}</p>
                    <p>Type: {this.props.singleItem.type}</p>
                </div>
            </li>
        )
    } // render function
}); //AptList

module.exports = AptList;
