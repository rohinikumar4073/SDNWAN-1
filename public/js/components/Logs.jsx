define([
    'react', 'jsx!components/LogBody'
], function(React, LogBody) {

    var Logs = React.createClass({
        render: function() {
            return (
                <div>
                    <LogBody className="container-fluid"/>
                </div>
            );
        }
    });
    return Logs;
});
