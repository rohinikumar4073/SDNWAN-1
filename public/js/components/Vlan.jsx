define([
    'react', 'jsx!components/VlanBody'
], function(React, VlanBody) {

    var Vlan = React.createClass({
        render: function() {
            return (
                <div>
                    <VlanBody className="container-fluid"/>
                </div>
            );
        }
    });

    return Vlan;
});
