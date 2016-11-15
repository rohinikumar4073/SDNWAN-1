define([
    'react', 'jsx!components/PolicyBody', 'jsx!components/Header'
], function(React, PolicyBody, Header) {

    var Policy = React.createClass({
        render: function() {
            return (
                <div>
                    <Header className="container-fluid"/>
                    <PolicyBody className="container-fluid"/>
                </div>
            );
        }
    });

    return Policy;
});
