var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var AptList = require('./AptList');

var MainInterface = React.createClass({
    getInitialState: function () {
        return {
            myAppointments: []
        }
    }, //getInitialState function

    componentDidMount: function(){
      this.serverRequest = $.get('./js/data.json', function (result){
          var tempApts = result;
          this.setState({
              myAppointments: tempApts
          }); //setting the state
        }.bind(this));
    }, //componentDidMount function

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },//componentWillUnmount function

    deleteMessage: function(item){
      var allApts = this.state.myAppointments;
      var newApts = _.without(allApts, item);
      this.setState({
          myAppointments: newApts
      }); //setState function
    },//deleteMessage function

    render: function () {
        var filteredApts = this.state.myAppointments;
        filteredApts = filteredApts.map(function (item, index) {
            return (
                <AptList key = {index}
                    singleItem = { item }
                    whichItem = { item }
                    onDelete = { this.deleteMessage }
                />
            )
        }.bind(this));
        return (
            <div className="interface">
                <ul className="collection" >
                    {filteredApts}
                </ul>
            </div>
        )
    } //render function
}); //MainInterface

ReactDOM.render(
    <MainInterface/>,
    document.getElementById('yourAppointments')
); //rendering to the DOM
