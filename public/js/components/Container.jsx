define([
    'react', 'jsx!components/Body','reactDnd', 'reactdndhtml5backend','react-progress-bar-plus'
], function(React, Body,  ReactDND, HTML5Backend, ProgressBar) {
    var DragDropContext = ReactDND.DragDropContext;

    var Container = React.createClass({
      getInitialState() {
         return {
           value: 100
         };
       },
    
        render: function() {
        //  debugger;

            return (
                <div>
                  <ProgressBar percent={this.state.value} spinner={false} autoIncrement={true}/>
                    <Body refs="body" className="container-fluid"/>

                     </div>
            );
        }
    });

    return DragDropContext(HTML5Backend)(Container);
});
