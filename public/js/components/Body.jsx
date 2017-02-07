define([
    'react',
    'jquery',
    'jsx!components/LeftMenu',
    'jsx!components/RightMenu',
    'jsx!components/BootstrapLinkCommon','configurationEvents',
    'TopologyModel'
], function(React, $, LeftMenu, RightMenu, BootstrapLinkCommon,configurationEvents) {

    var Body = React.createClass({
        getInitialState: function() {
            return {bootstrapTitle: "", iconType: "", coordinates: {},multiLayered:false,formData:{},submitMode:"Save"};
        },
        topologyModel: new com.cisco.TopologyModel(),
        setMultiLayered:function (data) {
          this.setState({multiLayered:data});
        },
        createLink: function(s, d) {

            this.topologyModel.createLink({source: s, target: d});

        },
        topologyModelController: function(coordinates, data) {
            if (data.collection.name == "link") {
                return;
            }

                        this.setState({
                            bootstrapTitle: "Add " + data.collection.name,
                            iconType: data.collection.className,  submitMode:"Save",
                            coordinates: coordinates,formData:{}
                        },this.refs.modal.open)

        },
        topologyModelControllerLinkMode: function(title, iconDetails) {
            if (title == "linkSet") {
                this.topologyModel.setLinkMod();
                return;
            } else if (title == "linkReset") {
                this.topologyModel.resetLinkMod();
                return;
            }
            this.setState({
                bootstrapTitle: "Add " + title,
                iconType: iconDetails,
                 submitMode:"Save",
                coordinates: {},
                formData:{}
            },this.refs.modal.open)

        },
        toggleElement: function() {
            if ($(".left-menu").hasClass("toggle-show")) {
              $(".n-topology ,svg").width($(window).width()-31)
              $(".left-menu").removeClass("toggle-show").addClass("toggle-hide").hide();
                $(".right-menu").addClass("col-xs-12").removeClass('col-xs-10');
                $(".toggle-left-menu button").removeClass("pull-right").removeClass("left-position");
                $(".toggle-left-menu i").removeClass("fa-caret-left").addClass("fa-caret-right");
            } else {
                $(".left-menu").removeClass("toggle-hide").addClass("toggle-show").show();
                $(".right-menu").removeClass("col-xs-12").addClass('col-xs-10');
                $(".toggle-left-menu button").addClass("pull-right").addClass("left-position");
                $(".toggle-left-menu i").removeClass("fa-caret-right").addClass("fa-caret-left");
                $(".n-topology,svg ").width($("#layout").width())

            }
        },
        render: function() {
            return (
                <div className={(this.props.className || '')}>
                    <div className="row">
                      <LeftMenu  className={ !this.state.multiLayered ? "col-xs-2 left-menu toggle-show" :"hidden"}  topologyModel={this.topologyModelControllerLinkMode}></LeftMenu>
                    <div className={!this.state.multiLayered ? "toggle-left-menu col-xs-2":"hidden"}>
                        <button className="btn btn-default  pull-right left-position" type="button" onClick={this.toggleElement} aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-caret-left" aria-hidden="true"></i>
                        </button>
                      </div>
                        <RightMenu setMultiLayered={this.setMultiLayered} ref="RightMenu" className={this.state.multiLayered ? "col-xs-12 right-menu ":"col-xs-10 right-menu "} topologyModel={this.topologyModel} createLink={this.createLink} topologyModelController={this.topologyModelController}></RightMenu>
                        <BootstrapLinkCommon ref="modal" title={this.state.bootstrapTitle} submitMode={this.state.submitMode}   formData={this.state.formData} iconType={this.state.iconType} coordinates={this.state.coordinates} topologyModel={this.topologyModel}/>

                    </div>
                </div>
            );
        },
        componentDidMount: function() {
          configurationEvents.setBodyReference(this);
            var height = $(window).height();
            $(".left-menu  ").height(height - 73);

        }
    });

    return Body;
});
