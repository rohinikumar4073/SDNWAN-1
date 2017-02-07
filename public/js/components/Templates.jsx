define([
    'react', 'jquery', 'jsx!components/Template', 'configurationEvents','properties'
], function(React, $, Template, configurationEvents, properties) {
    var Templates = React.createClass({
        getInitialState: function() {
            return {forwardingBox: [], hosts: [], elements: [], templateData: []};
        },

        componentDidMount: function() {
          var arrayData = [
              {
                "heading": "FB OS Template",
                "template":"DetailsFBOS",
                "data": [

                ]
              },{
                "heading": "FB Transiever Hardware Template",
                "template":"DetailsTransieverHardware",
                "data": [

                ]
              },{
                "heading": "FB Hardware Template",
                "template": "DetailsHardware",
                "data": [

                ]
              }
          ]
          this.setState({elements: arrayData});
            var getURL = properties.templateIp + "listAllTemplates";
            $.get(getURL,function(result){
              var index=0;
                      var elements=this.state.elements
              $.each(result, function(k, v) {

      //display the key and value pair
      if(elements[index] && elements[index].data)
        elements[index].data=v;
        this.setState({elements:elements})
        this.refs["template"+index].setCollection()
        index++;
        }.bind(this));

            }.bind(this));

            var self = this;


        },

        componentWillUnmount: function() {
            //this.serverRequest.abort();
        },

        render: function() {

            return (<div>
            {
              this.state.elements.map(function(element,index){
                return <Template heading={element.heading} collection={element.data}  template={element.template} index={index} ref={"template"+index} className="layout-flex"/>
                })
            }
            </div>
      );

        }

    });
    return Templates;
});
