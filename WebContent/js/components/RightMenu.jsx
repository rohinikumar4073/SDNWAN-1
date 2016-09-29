
  define(['react','reactDnd','nx','ActionPanel','TopologyModel','MainView','TopologyView'], function(React,reactDnd) {
  var global=nx.global;

var DropTarget =reactDnd.DropTarget;
var PropTypes = React.PropTypes;

var flag=true;
var dropTargetData = {



  drop: function (props, monitor, component) {
  console.log("Dropped")
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
   
    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};
function collect(connect, monitor) {
console.log(monitor.isOver())
console.log("CanDorop"+monitor.canDrop())

  return {
     connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

 var RightMenu = React.createClass({
 	propTypes: {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  },getInitialState: function() {


        return { showData: true,sourceData:"",destination:""};

        },componentDidMount:function(){

     var model=this.props.topologyModel;
    var Shell = nx.define(nx.ui.Application, {
        methods: {
            start: function () {
                var mainView = new com.cisco.MainView();
                
                mainView.attach(this);
                mainView.model(model);
            }, getContainer: function () {
                if (this.container()) {
                    return new nx.dom.Element(document.getElementById("layout"));
                } else {
                    return new nx.dom.Element(document.getElementById("layout"));
                }
 
            }
        }
    });

    /**
     * create application instance
     */
    var shell = new Shell();

    /**
     * invoke start method
     */
    shell.start();



  },
  componentWillReceiveProps: function (nextProps) {
      this.setState({ showData: false }); 
      if(flag){
/**
 * 
 */


      flag=false;
      }

console.log( nextProps.isOver)
    if (!this.props.isOver && nextProps.isOver) {
      // You can use this as enter handler
      console.log("Over")
    }

    if (this.props.isOver && !nextProps.isOver) {
      // You can use this as leave handler
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  },createLink:function() {
this.props.createLink($("#source").val(),$("#destination").val());
},
    render: function() {
    	    var connectDropTarget = this.props.connectDropTarget;
   var x = this.props.x;
    var y = this.props.y;
    var connectDropTarget = this.props.connectDropTarget;
      return connectDropTarget(

        <div className={(this.props.className || '') } >
<div className="col-xs-12">
	<div className="form-group col-xs-3">
   	 <label for="source">Source :</label>
    	<input type="soruce" className="form-control" id="source"></input>
  	</div>
  	<div className="form-group  col-xs-3">
    		<label for="destination">Destination:</label>
    		<input type="destination" className="form-control" id="destination"></input>
 		 </div>
  <div className="col-xs-3">
 		 <button type="submit" className="btn btn-default  " onClick={this.createLink}>Submit</button>
</div>
</div>
 <div className="layout-flex col-xs-12" id="layout">
         
        </div>  
        </div>
        );
    }
    });

  return DropTarget('RightMenu', dropTargetData, collect)(RightMenu);


    });
