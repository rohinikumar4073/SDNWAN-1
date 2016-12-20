define([
    'react', 'jquery', 'jsx!components/DetailsElement', 'jsx!components/BootstrapLink','jsx!components/BootstrapButton','jsx!components/BootstrapModal'
], function(React, $, DetailsElement, BootstrapLink, BootstrapButton, BootstrapModal) {

    var Details = React.createClass({

        render: function() {

            return (

                <div className="details">

                    <DetailsElement data={this.props.collection.templateInfo.revision} labelData="Revision"/>
                    <DetailsElement data={this.props.collection.templateInfo.lastUpdatedBy} labelData="Last Updated By"/>
                    <DetailsElement data={this.props.collection.templateInfo.timeStamp} labelData="Time Stamp"/>
                    <DetailsElement data={this.props.collection.templateInfo.status} labelData="Status"/>
                    <BootstrapLink data="View Details" heading={this.props.heading} template={'FBFan'}/>


                </div>

            );
        }
    });

    return Details;

});
