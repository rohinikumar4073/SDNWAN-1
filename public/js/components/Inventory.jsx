define([
    'react', 'jsx!components/InventoryBody'
], function(React, InventoryBody) {

    var Inventory = React.createClass({
        render: function() {
            return (
                <div>
                    <InventoryBody className="container-fluid"/>
                </div>
            );
        }
    });
    return Inventory;
});
