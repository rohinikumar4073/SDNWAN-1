define([
    'react', 'jsx!components/PolicyBody'
], function(React, PolicyBody) {

    var Policy = React.createClass({
        render: function() {
            return (
                <div>

                    <PolicyBody className="container-fluid"/>
                </div>
            );
        }
    });

    return Policy;
});
