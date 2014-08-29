/**
 * @jsx React.DOM
 */

var CommentList = React.createClass({
	getInitialState: function() {
    	return {data: {}};
  	},
	componentDidMount: function() {
	    $.ajax({
	      url: "/cars",
	      dataType: 'json',
	      success: function(cars) {
	      	if (this.isMounted()) {
	        	this.setState({data: cars});
	    	}
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	},
	render: function() {
		var rows = [];
		if (this.state.data.length > 0) {
			this.state.data.forEach(function(car) {
				rows.push(<div>Make: {car.make}, Model: {car.model}, Year: {car.year}</div>);
			});
		}
		return (<div>{rows}</div>);
	}
});

React.renderComponent(
  <CommentList />,
  document.getElementById('content')
);