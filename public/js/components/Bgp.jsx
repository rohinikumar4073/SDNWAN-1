define([
    'react', 'jsx!components/BgpBody'
], function(React, BgpBody) {

    var Bgp = React.createClass({
        render: function() {
            return (
                <div>

                    <BgpBody className="container-fluid"/>
                </div>
            );
        }
    });

    return Bgp;
});
