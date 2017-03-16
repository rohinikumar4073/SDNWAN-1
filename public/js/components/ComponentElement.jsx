
define([
    'jquery',
    'react',
    'reactDnd',
    'nx',
    'ActionPanel',
    'TopologyModel',
    'MainView',
    'TopologyView',
    'tooltip'
], function($, React, reactDnd) {

    var DragSource = reactDnd.DragSource;
    var PropTypes = React.PropTypes;
    var flag = true;
    var self = this;

    var ComponentSource = {

        beginDrag: function(props) {
            // Return the data describing the dragged item
            $(".layout-flex > .suggestions").hide()
            var item = {
                collection: props.collection
            };
            return item;
        }

    };

    function collect(connect, monitor) {
        return {connectDragSource: connect.dragSource(), isDragging: monitor.isDragging()}
    }

    var AddList = React.createClass({
        addEvent: function(e) {
            this.props.topologyModel(this.props.title, this.props.iconDetails);
            $(e.target).parent().parent('.context-menu').addClass('hidden')
        },
        render: function() {
            return (
                <div className={this.props.className}>
                    <ul className="contextUl">
                        <li onClick={this.addEvent} className="contextUlLi">Add</li>
                    </ul>
                </div>
            );
        }
    });

    var ComponentElement = React.createClass({

        componentDidMount: function() {},
        propTypes: {
            connectDragSource: PropTypes.func.isRequired,
            isDragging: PropTypes.bool.isRequired
        },
        getInitialState: function() {

            return {username: '', lastGistUrl: '', childVisible: false, selectedLinkClass: "", virtualLinkClass: "",};
        },

        contexMenu: function(e) {
            //alert("cont Menu");
            e.preventDefault();
            //this.props.shouldHide = true;
            this.setState({
                childVisible: !this.state.childVisible
            });
        },
        blurContexMenu: function(e) {
            e.preventDefault();
            //    this.setState({childVisible: false});
        },
        addEvent: function(e) {
            $(".layout-flex > .suggestions").hide()
            if (this.props.collection.name == "link") {
                var link = "";
                if (this.state.selectedLinkClass) {
                    this.setState({selectedLinkClass: ""});
                    link = "linkReset";
                    	$("#forLinkMode").hide();

                } else {
                    this.setState({selectedLinkClass: "selected-link-class"});
                    link = "linkSet";
                      $("#forLinkMode").show();
                }
                this.props.topologyModel(link, this.props.collection.className);
                return;
            }else  if (this.props.collection.name == "Virtual link") {
              debugger;
                    var link = "";
                    if (this.state.selectedLinkClass) {
                        this.setState({selectedLinkClass: ""});
                        link = "virtual_linkReset";
                        	$("#forLinkMode").hide();

                    } else {
                        this.setState({selectedLinkClass: "selected-link-class"});
                        link = "virtual_linkSet";
                          $("#forLinkMode").show();
                    }
                    this.props.topologyModel(link, this.props.collection.className);
                    return;

                }
                else if(this.props.collection.name == "Dynamic Bandwidth Link"){
                  var link = "";
                  if (this.state.selectedLinkClass) {
                      this.setState({selectedLinkClass: ""});
                      link = "dynamicBandwidth_linkReset";
                        $("#forLinkMode").hide();

                  } else {
                      this.setState({selectedLinkClass: "selected-link-class"});
                      link = "dynamicBandwidth_linkSet";
                        $("#forLinkMode").show();
                  }
                  this.props.topologyModel(link, this.props.collection.className);
                  return;
                }
            this.props.topologyModel(this.props.collection.name, this.props.collection.className);
        },
        render: function() {

            var connectDragSource = this.props.connectDragSource;
            var isDragging = this.props.isDragging;

            return connectDragSource(

                <div className="relativePos" onClick={this.addEvent}>
                    <div>
                        <div className={  this.state.selectedLinkClass} type="button" onContextMenu={this.contexMenu} onBlur={this.blurContexMenu} >
                            <i className={"fa " + this.props.collection.className} aria-hidden="true"></i>
                        </div>
                        <div>
                            {this.props.collection.name}
                        </div>
                    </div>

                </div>
            );
        }

    });
    return DragSource('RightMenu', ComponentSource, collect)(ComponentElement);

});
