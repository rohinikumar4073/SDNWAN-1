define([
    'react', 'jquery'
], function(React, $) {

    var DetailsElement = React.createClass({
        render: function() {
            return (
                <div className="details-element">
                    <span className="labelData">{this.props.labelData}</span>
                    <span>:</span>
                    <span className="data">{this.props.data}</span>
                </div>
            );
        }
    });

    return DetailsElement;
});
