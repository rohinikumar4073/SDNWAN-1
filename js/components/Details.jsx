define([
    'react', 'jquery', 'jsx!components/DetailsElement', 'jsx!components/BootstrapLink'
], function(React, $, DetailsElement, BootstrapLink) {

    var Details = React.createClass({
        render: function() {
            return (
                <div className="details">

                    <DetailsElement data={this.props.collection.fb_groupid} labelData="FB Group Id"/>
                    <DetailsElement data={this.props.collection.forwarding_box_template} labelData="FB Box tempalte"/>
                    <DetailsElement data={this.props.collection.network_domain} labelData="Network Domain"/>
                    <DetailsElement data={this.props.collection.site_id} labelData="Site ID"/>
                    <DetailsElement data={this.props.collection.location_desc} labelData="Location Desc"/>
                    <DetailsElement data={this.props.collection.location_desc} labelData="Location Desc"/>
                    <BootstrapLink data="View Details"/>

                </div>
            );
        }
    });

    return Details;

});
