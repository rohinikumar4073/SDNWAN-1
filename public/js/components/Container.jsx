define([
    'react', 'jsx!components/Body','reactDnd', 'reactdndhtml5backend'
], function(React, Body,  ReactDND, HTML5Backend) {
    var DragDropContext = ReactDND.DragDropContext;

    var Container = React.createClass({

        render: function() {
        //  debugger;

            return (
                <div>

                    <Body refs="body" className="container-fluid"/>
                     </div>
            );
        }
    });

    return DragDropContext(HTML5Backend)(Container);
});
