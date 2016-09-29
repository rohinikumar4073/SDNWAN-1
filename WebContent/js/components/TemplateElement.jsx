define(['react','reactDnd'], function(React,reactDnd) {

var DragSource =reactDnd.DragSource;
var PropTypes = React.PropTypes;


var TemplateSource = {
  beginDrag: function (props) {
    return {};
  }
};


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

 
  var TemplateElement = React.createClass({

 propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },
    render: function() {
var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

      return connectDragSource(



        <div>
        <button className="btn btn-default " type="button" onClick={this.props.onClick}>
        <i className={"fa "+this.props.collection.className} aria-hidden="true"></i>
        </button>
        <div>
        { this.props.collection.fb_device_name}
        </div>

        </div>);
    }



    });
  return DragSource('TemplateElement', TemplateSource, collect)(TemplateElement);


    });