define([
    'react',
    'jquery',
    'jsx!components/LeftMenu',
    'jsx!components/RightMenu',
    'jsx!components/BootstrapLinkCommon',
    'TopologyModel'
], function(React, $, LeftMenu, RightMenu, BootstrapLinkCommon) {

    var Body = React.createClass({
        getInitialState: function() {
            return {bootstrapTitle: "", iconType: "", coordinates: {}}
        },
        topologyModel: new com.cisco.TopologyModel(),
        createLink: function(s, d) {

            this.topologyModel.createLink({source: s, target: d});

        },
        topologyModelController: function(coordinates, data) {
            if (data.collection.name == "link") {
                return;
            }
            this.refs.modal.open();

            this.setState({
                bootstrapTitle: "Add " + data.collection.name,
                iconType: data.collection.className,
                coordinates: coordinates
            })
        },
        topologyModelControllerLinkMode: function(title, iconDetails) {
            if (title == "linkSet") {
                this.topologyModel.setLinkMod();
                return;
            } else if (title == "linkReset") {
                this.topologyModel.resetLinkMod();
                return;
            }
            this.setState({coordinates: {}})
            this.refs.modal.open();
            console.log("iconDetails" + iconDetails);

            this.setState({
                bootstrapTitle: "Add " + title,
                iconType: iconDetails
            })
        },
        toggleElement: function() {
            console.log("Leftmenu toggle")
            if ($(".left-menu").hasClass("toggle-show")) {
              $(".n-topology ,svg").width($(window).width()-31)
              $(".left-menu").removeClass("toggle-show").addClass("toggle-hide").hide();
                $(".right-menu").addClass("col-xs-12").addClass("col-lg-12").addClass("col-md-12").removeClass("col-xs-9").removeClass("col-lg-9").removeClass('col-md-8');
                $(".toggle-left-menu button").removeClass("pull-right").removeClass("left-position");
                $(".toggle-left-menu i").removeClass("fa-caret-left").addClass("fa-caret-right");
            } else {
                $(".left-menu").removeClass("toggle-hide").addClass("toggle-show").show();
                $(".right-menu").removeClass("col-xs-12").removeClass("col-lg-12").removeClass("col-md-12").addClass("col-xs-9").addClass("col-lg-9").addClass('col-md-8');
                $(".toggle-left-menu button").addClass("pull-right").addClass("left-position");
                $(".toggle-left-menu i").removeClass("fa-caret-right").addClass("fa-caret-left");
                $(".n-topology,svg ").width($("#layout").width())

            }
        },
        render: function() {
            return (
                <div className={(this.props.className || '')}>
                    <div className="row">
                        <LeftMenu className="col-xs-4 col-md-4 col-lg-3 left-menu toggle-show" topologyModel={this.topologyModelControllerLinkMode}></LeftMenu>
                        <div className="toggle-left-menu col-xs-4 col-md-4 col-lg-3">
                            <button className="btn btn-default  pull-right left-position" type="button" onClick={this.toggleElement} aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-caret-left" aria-hidden="true"></i>
                            </button>
                        </div>
                        <RightMenu className="col-xs-8 col-md-8 col-lg-9 right-menu " topologyModel={this.topologyModel} createLink={this.createLink} topologyModelController={this.topologyModelController}></RightMenu>
                        <BootstrapLinkCommon ref="modal" title={this.state.bootstrapTitle} iconType={this.state.iconType} coordinates={this.state.coordinates} topologyModel={this.topologyModel}/>

                    </div>
                </div>
            );
        },
        componentDidMount: function() {
            //console.log("Inside component mount");
            var height = $(window).height();
            $(".left-menu ,.right-menu ").height(height - 89);

        }
    });

    return Body;
});
