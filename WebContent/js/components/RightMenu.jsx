define([
    'react',
    'reactDnd',
    'toastr',
    'properties',
    'nx',
    'ActionPanel',
    'TopologyModel',
    'MainView',
    'TopologyView'
], function(React, reactDnd,toastr,properties) {
    var global = nx.global;

    var DropTarget = reactDnd.DropTarget;
    var PropTypes = React.PropTypes;

    var flag = true;
    var dropTargetData = {

        drop: function(props, monitor, component) {
            console.log("Dropped")
            props.topologyModelController(monitor.getClientOffset(), monitor.getItem());

            // Obtain the dragged item

            // You can also do nothing and return a drop result,
            // which will be available as monitor.getDropResult()
            // in the drag source's endDrag() method
            return {moved: true};
        }
    };
    function collect(connect, monitor) {
        console.log(monitor.isOver())
        console.log("CanDorop" + monitor.getItemType())

        return {
            connectDropTarget: connect.dropTarget(),
            // You can ask the monitor about the current drag state:
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({shallow: true}),
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
        },
        getInitialState: function() {

            return {showData: true, sourceData: "", destination: "",mainView:null};

        },
        componentDidMount: function() {
            var self=this;
            var model = this.props.topologyModel;
            var Shell = nx.define(nx.ui.Application, {
                methods: {
                    start: function() {
                    mainView  = new com.cisco.MainView();

                        mainView.attach(this);
                        mainView.model(model);
                        self.setState({mainView:mainView})
                    },
                    getContainer: function() {
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
        pushTopology:function(){
       var top=properties.getTopologyPush();
       $.ajax({
       url: properties.pushTopology,
       type: 'post',
       data: JSON.stringify(top),
       contentType: "application/json; charset=utf-8",
       success: function (data) {
           toastr.success("Topology is added successfully")
       }
     })

      },
      saveTopology:function(){
     var top=properties.getTopologyPush();
     $.ajax({
     url: properties.pushTopology,
     type: 'post',
     data: JSON.stringify(top),
     contentType: "application/json; charset=utf-8",
     success: function (data) {
         toastr.success("Topology is saved successfully")
     }
   })

    },
        componentWillReceiveProps: function(nextProps) {
            this.setState({showData: false});
            if (flag) {
                /**
 *
 */

                flag = false;
            }

            console.log(nextProps.isOver)
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
        },
        createLink: function() {
            this.props.createLink($("#source").val(), $("#destination").val());
        },
        render: function() {
            var x = this.props.x;
            var y = this.props.y;
            var connectDropTarget = this.props.connectDropTarget;
            return connectDropTarget(

                <div className={(this.props.className || '')}>
                  <div className="float-actions">
                  <button type="button" className="btn btn-primary btn-sm "  onClick={this.pushTopology} >Push</button>
              		<button type="button" className="btn btn-default btn-sm"
              			 onClick={this.saveTopology}>Save</button>
                  </div>
                    <div className="layout-flex " id="layout">

                    </div>
                </div>
            );
        }
    });

    return DropTarget('RightMenu', dropTargetData, collect)(RightMenu);

});
