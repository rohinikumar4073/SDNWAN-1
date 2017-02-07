define([
    'react', 'reactDnd','jsx!components/BootstrapLink'
], function(React, reactDnd, BootstrapLink) {

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
        loadData:function(){
        this.props.onClick();
        this.refs["link"].openModal()
      },
        propTypes: {
            connectDragSource: PropTypes.func.isRequired,
            isDragging: PropTypes.bool.isRequired
        },
        render: function() {
            var connectDragSource = this.props.connectDragSource;
            var isDragging = this.props.isDragging;

            return connectDragSource(
                <div>
                  <ul>
                    <li onClick = {this.loadData}>
                        <a href = "#">{this.props.collection.name}</a>
                    </li>
                  </ul>
                  <BootstrapLink ref="link" data = {this.props.collection.name} className="hidden" collection = {this.props.templateCollection} heading={this.props.heading} template={this.props.template}/>
                </div>

            );
        }

    });
    return DragSource('TemplateElement', TemplateSource, collect)(TemplateElement);

});
