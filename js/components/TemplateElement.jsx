define([
    'react', 'reactDnd'
], function(React, reactDnd) {

    var DragSource = reactDnd.DragSource;
    var PropTypes = React.PropTypes;

    var TemplateSource = {
        beginDrag: function(props) {
            return {};
        }
    };

    function collect(connect, monitor) {
        return {connectDragSource: connect.dragSource(), isDragging: monitor.isDragging()}
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
                    <span onClick={this.props.onClick} className="templatedata">
                        {this.props.collection.name}
                    </span>
                </div>
            );
        }

    });
    return DragSource('TemplateElement', TemplateSource, collect)(TemplateElement);

});
