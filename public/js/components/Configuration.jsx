define([
    'react', 'jsx!components/ConfigurationBody'
], function(React, ConfigurationBody) {

    var Configuration = React.createClass({
        render: function() {
            return (
                <div>

                    <ConfigurationBody className="container-fluid"/>
                </div>
            );
        }
    });

    return Configuration;
});
