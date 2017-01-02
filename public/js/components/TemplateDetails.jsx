define([
    'react',
    'jquery',
    'jsx!components/DetailsElement',
    'jsx!components/BootstrapLink',
    'jsx!components/BootstrapButton',
    'jsx!components/BootstrapModal',
], function(React, $, DetailsElement, BootstrapLink, BootstrapButton, BootstrapModal) {

    var InsDetails = React.createClass({
        getInitialState: function() {
          var arrayData =
              {
                  "heading": "Details FB Fan",
                  "template": "DetailsFBFan",
                  "data": []
              };

                return {elements:arrayData};
        },
        componentDidMount: function() {

        },

        render: function() {

            return (

                <div className="details">

                    <DetailsElement data={this.props.collection.templateInfo.revision} labelData="Revision"/>
                    <DetailsElement data={this.props.collection.templateInfo.lastUpdatedBy} labelData="Last Updated By"/>
                    <DetailsElement data={this.props.collection.templateInfo.timeStamp} labelData="Time Stamp"/>
                    <DetailsElement data={this.props.collection.templateInfo.status} labelData="Status"/>
                  <BootstrapLink data="View Details" collection = {this.props.collection} heading={this.state.elements.heading} template={this.state.elements.template}/>

                </div>

            );
        }
    });

    return InsDetails;

});
