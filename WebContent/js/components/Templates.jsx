define([
    'react', 'jquery', 'jsx!components/Template'
], function(React, $, Template) {
    var Templates = React.createClass({
        getInitialState: function() {
            return {forwardingBox: [], hosts: [], elements: []};
        },

        componentDidMount: function() {
            var self = this;
            var arrayData = [
                {

                  "heading": "FB Instance Creation",
                  "template":"FBForm",
                  "data": [

                  ]
                },{
                  "heading": "FB Fan Template",
                  "template":"FBFan",
                  "data": [

                  ]
                },{
                  "heading": "FB OS Template",
                  "template":"FBOS",
                  "data": [

                  ]
                },{
                  "heading": "FB Powersupply Template",
                  "data": [

                  ]
                },{
                  "heading": "FB Template",
                  "data": [

                  ]
                },{
                  "heading": "FB Transiever Template",
                  "data": [

                  ]

                }
            ]
            this.setState({elements: arrayData});

        },

        componentWillUnmount: function() {
            this.serverRequest.abort();
        },

        render: function() {

            return (<div>
            {
              this.state.elements.map(function(element,i){
                return <Template heading={element.heading} collection={element.data}  template={element.template} key={i} className="layout-flex"/>
                })
            }
            </div>
      );

        }

    });
    return Templates;
});
