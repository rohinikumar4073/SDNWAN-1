define([
    'react',
    'toastr',
    'properties',
    'jsx!components/MultiLayeredLayout',
    'jsx!components/DesignLayout'
], function(React,toastr,properties,MultiLayeredLayout,DesignLayout) {

    var RightMenu = React.createClass({

        getInitialState: function() {

            return {showData: true, sourceData: "", destination: "",mainView:null,multiLayered:false};

        },
        pushTopology:function(){
       var top=properties.getTopologyPush();
       $.ajax({
       url: properties.pushTopology,
       type: 'post',
       data: JSON.stringify(top),
       contentType: "application/json; charset=utf-8",
       success: function (data) {
           toastr.success("Topology is pushed successfully")
       }
      })

      },
      saveTopology:function(){
      var top=properties.getTopologyPush();
      $.ajax({
      url: properties.pushTopology,
      type: 'post',
      data: JSON.stringify(top),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
         toastr.success("Topology is saved successfully")
      }
      })

      },
        setMultiLayered:function(){
            this.setState( { multiLayered :!this.state.multiLayered});

        },

        createLink: function() {
            this.props.createLink($("#source").val(), $("#destination").val());
        },
        render: function() {

            return (

                <div className={(this.props.className || '')}>
                  <div className="float-actions">

                  <button type="button" className="btn btn-primary btn-sm "  onClick={this.pushTopology} >Push</button>
                    <button type="button" className={this.state.multiLayered ? "btn btn-primary  btn-sm":"btn btn-default  btn-sm" }  onClick={this.setMultiLayered}  ><i className="fa fa-clone" aria-hidden="true"></i>
  </button>

              		<button type="button" className="btn btn-default btn-sm"
              			 onClick={this.saveTopology}>Save</button>
                 </div>
                  { !this.state.multiLayered ? <DesignLayout  topologyModel={this.props.topologyModel} topologyModelController={this.props.topologyModelController}/> : <MultiLayeredLayout /> }


                </div>
            );
        }
    });

    return RightMenu;

});
