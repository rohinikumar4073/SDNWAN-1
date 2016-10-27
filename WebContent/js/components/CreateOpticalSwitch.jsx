define([
    'react', 'jquery'
], function(React, $) {



  var BootstrapButton = React.createClass({
      render: function() {
          return (
              <a {...this.props} href="javascript:;" role="button" className={(this.props.className || '')}>
                  {this.props.data}
              </a>
          );
      }
  });

    var CreateOpticalSwitch = React.createClass({
      onChangeFunction: function(e) {
          this.setState({fbName: e.target.value});
      },
      getInitialState: function() {

          return {fbName: ""}

      },

      keyPressFunction: function(event) {

          var keycode = (event.keyCode
              ? event.keyCode
              : event.which);
          if (keycode == '13') {
              this.handleConfirm();
          }

      },
      handleCancel: function() {
          this.props.close();
          if (this.props.onCancel) {
              this.props.onCancel();
          }
      },
      handleConfirm: function() {
      if( this.props.iconType!="patch-panel"){
            this.props.topologyModel.createNode(this.state.fbName, this.props.iconType, this.props.coordinates);
            console.log("iconType" + this.props.iconType)
            this.props.close();
      }else{
      var node={}
       if (this.props.coordinates.x && this.props.coordinates.y) {
                  node.x = this.props.coordinates.x - 400;
                  node.y = this.props.coordinates.y - 90;
              } else {
                  node.x = Math.floor(Math.random() * 400);
                  node.y = Math.floor(Math.random() * 400);
              }

           this.props.topologyModel.createNode(this.state.fbName+"1", this.props.iconType, {x:node.x, y:node.y});
           this.props.topologyModel.createNode(this.state.fbName+"2", this.props.iconType, {x:node.x+100, y:node.y});
           var patchlink={
                                          source: this.state.fbName+"1",
                                          target: this.state.fbName+"2"

                                      }
                                      this.props.topologyModel.createLinkPatchPanel(patchlink)
              this.props.close();
      }




      },
        render: function() {
            return (


              <div  className={"modal-content "+this.props.className}>
                  <div className="modal-header">
                      <button type="button" className="close" onClick={this.handleCancel}>
                          &times;</button>
                      <h3>{this.props.title}</h3>
                  </div>
                  <div className="modal-body">
                      <form id="add-node-os">
                          <div className="form-group">
                              <label for="fbname">Name:</label>
                              <input onChange={this.onChangeFunction} onKeyDown={this.keyPressFunction} type="text" className="form-control" id="fb_name"></input>
                          </div>
                      </form>
                  </div>
                  <div className="modal-footer">
                      <div class="row">
                          <div class="col-md-12 section-divider-bottom">
                              <BootstrapButton onClick={this.handleConfirm} className="btn btn-sm btn-primary" data="Save"></BootstrapButton>
                              <BootstrapButton onClick={this.handleCancel} className="btn btn-sm btn-default" data="Cancel"></BootstrapButton>

                          </div>
                      </div>
                  </div>
              </div>

            );
        }
    });

    return CreateOpticalSwitch;

});
