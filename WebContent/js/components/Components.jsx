define(['react','jquery','jsx!components/Component'], function(React,$,Component) {

var Components = React.createClass({
    getInitialState: function() {
      return {
        forwardingBox: [],
        hosts: [],
        elements:[]
      };
      },

      componentDidMount: function() {	
      console.log("Indide codm");
        var self = this;
        $.get(this.props.source, function(result) {
          var collection = JSON.parse(result);

          if (this.isMounted()) {
            this.setState({
              elements: collection
              });
          }
          }.bind(this));
        },

        componentWillUnmount: function() {
          this.serverRequest.abort();
          },

          render: function() {


            return (<div>
            {    
              this.state.elements.map(function(element,i){
                return <Component heading={element.heading} collection={element.data} key={i} className="layout-flex" topologyModel={this.props.topologyModel}/>
                }.bind(this))
            } 
            </div>
            );

          }



          });
          return Components;
               });
 