var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var AptList = require('./AptList');
var AddAppointment = require('./AddAppointment');
var SearchAppointments = require('./SearchAppointments');

var MainInterface = React.createClass({
    getInitialState: function () {
        return {
            aptBodyVisible: false,
            orderBy: 'first_name',
            orderDirection: 'asc',
            queryText: '',
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

    toggleAddDisplay: function(){
        var tempVisibility = !this.state.aptBodyVisible;
        this.setState({
            aptBodyVisible: tempVisibility
        });
    }, //toggleAddDisplay function

    addItem: function(tempItem){
        var tempApts = this.state.myAppointments;
        tempApts.push(tempItem);
        this.setState({
            myAppointments: tempApts
        });
    }, //addItem function

    reOrder: function(orderBy, orderDir){
        this.setState({
            orderBy: orderBy,
            orderDirection: orderDir
        }) //setting state
    }, //reOrder function

    searchApts: function(searchText){
        this.setState({
            queryText: searchText
        }) //setting state
    }, //searchApts function

    render: function () {
        var filteredApts = [];
        var orderBy = this.state.orderBy;
        var orderDir = this.state.orderDirection;
        var queryText = this.state.queryText;
        var myAppointments = this.state.myAppointments;

        myAppointments.forEach(function (item){
           if(
               (item.first_name.toLowerCase().indexOf(queryText) != -1) ||
               (item.last_name.toLowerCase().indexOf(queryText) != -1) ||
               (item.type.toLowerCase().indexOf(queryText) != -1) ||
               (item.email.toLowerCase().indexOf(queryText) != -1) ||
               (item.ip_address.toLowerCase().indexOf(queryText) != -1)
           ) {
               filteredApts.push(item);
           }
        });

        filteredApts = _.orderBy(filteredApts, function (item) {
            return item[orderBy].toLowerCase();
        }, orderDir); //ordering using lodash

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
                <AddAppointment
                    bodyVisible = { this.state.aptBodyVisible }
                    handleToggle = { this.toggleAddDisplay }
                    addApt = { this.addItem }
                />
                <SearchAppointments
                    orderBy = { this.state.orderBy }
                    orderDirection = { this.state.orderDirection }
                    onReOrder = { this.reOrder }
                    onSearch = { this.searchApts }
                />
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
