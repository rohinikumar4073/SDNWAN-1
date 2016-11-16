define([
    'react', 'jsx!components/Container',  'jsx!components/Policy','ReactRouter'
], function(React, Container,Policy,ReactRouter) {
     var Router=ReactRouter.Router;
          var Route=ReactRouter.Route;
          var browserHistory=  ReactRouter.browserHistory;
    var RoutingFile = React.createClass({
        render: function() {
            return (
              <Router history={browserHistory}>
                <Route path="/" component={Container}/>
                <Route path="index.html" component={Policy}/>

                </Router>
            );
        }
    });

    return RoutingFile;
});
