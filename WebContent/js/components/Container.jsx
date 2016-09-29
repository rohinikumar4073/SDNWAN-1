define(['react','jsx!components/Body', 'jsx!components/Header','reactDnd','reactdndhtml5backend'], function(React,Body,Header,ReactDND,HTML5Backend) {
var DragDropContext = ReactDND.DragDropContext;

	var Container = React.createClass({
  render: function() {  
    return ( 
    	<div>
    	<Header className="container-fluid"/>
    	<Body className="container-fluid"/>
    	</div>
    	);
  } 
});

	return DragDropContext(HTML5Backend)(Container);
});