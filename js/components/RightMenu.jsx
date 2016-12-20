define([
    'react', 'toastr', 'properties', 'jsx!components/MultiLayeredLayout', 'jsx!components/DesignLayout','configurationEvents'
], function(React, toastr, properties, MultiLayeredLayout, DesignLayout,configurationEvents) {

    var RightMenu = React.createClass({

        getInitialState: function() {

            return {showData: true, sourceData: {sourceName:"",sourceType:"",portData:""}, destination: "", mainView: null, multiLayered: false};

        },
        componentDidMount:function(){
          configurationEvents.setDom(this);
        },
        pushTopology: function() {
            var top = properties.getTopologyPush();
            this.props.topologyModel.setTopology()
            var topologyData = properties.getTopologyData();
            localStorage.setItem("topologyData", JSON.stringify(topologyData))
            $.ajax({
                url: properties.pushTopology,
                type: 'post',
                data: JSON.stringify(top),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Topology is pushed successfully")
                }
            })

        },
        saveTopology: function() {
            var top = properties.getTopologyPush();
            $.ajax({
                url: properties.pushTopology,
                type: 'post',
                data: JSON.stringify(top),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Topology is saved successfully")
                }
            })

        },
        setMultiLayered: function() {
            this.setState({
                multiLayered: !this.state.multiLayered
            });

        },

        createLink: function() {
            this.props.createLink($("#source").val(), $("#destination").val());
        },
        clearSource:function(){
          configurationEvents.setSourceSelected(false);
          this.state.sourceData={}
          this.setState(this.state)
        },
        render: function() {

            return (

                <div className={(this.props.className || '')}>

                          <div id="forLinkMode" className="link-text-style" hidden>
                            <h3 className="linktext">Link Mode On</h3>
                            <h4>Selected Source</h4>
                            <div><span className="left">Name </span><span className="center" >:</span><span  className="right">{this.state.sourceData.sourceName}</span></div>
                            <div><span className="left">Type </span><span  className="center">:</span><span  className="right">{this.state.sourceData.sourceType}</span></div>
                              <div><span className="left">Port </span><span  className="center">:</span><span  className="right">{this.state.sourceData.portData}</span></div>
                              <a href="#" className="clrSrc" onClick={this.clearSource}> Clear Source </a>
                        </div>

                    <div className="float-actions">
                      <button type="button" title="MultiLayered View" className={this.state.multiLayered
                          ? "btn btn-primary btn-sm"
                          : "btn btn-default btn-sm"} onClick={this.setMultiLayered}>
                          <i className="fa fa-clone" aria-hidden="true"></i>
                      </button>

                        <button type="button" className="btn btn-primary btn-sm "title="Push Topology" onClick={this.pushTopology}>Push</button>

                        <button type="button" className="btn btn-default btn-sm"  title="Save Topology" onClick={this.saveTopology}>Save</button>
                    </div>

                    {!this.state.multiLayered
                        ? <DesignLayout topologyModel={this.props.topologyModel} topologyModelController={this.props.topologyModelController}/>
                        : <MultiLayeredLayout/>}

                </div>
            );
        }
    });

    return RightMenu;

});
