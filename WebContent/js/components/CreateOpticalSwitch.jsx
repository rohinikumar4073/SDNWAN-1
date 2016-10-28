define([
    'react', 'jquery','properties'
], function(React, $,properties) {



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
          this.setState({dataToBeSend.name: e.target.value});
      },
      getInitialState: function() {


                  return {dataToBeSend:{name: "", type: "optical-switch"}}

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
        var socket = properties.socket;
        var self=this;
        debugger;





         socket.emit('component-save',JSON.stringify(self.state.dataToBeSend));



            this.props.topologyModel.createNode(this.state.dataToBeSend.name, this.props.iconType, this.props.coordinates);
            console.log("iconType" + this.props.iconType)
            this.props.close();





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
                              <input onChange={this.onChangeFunction} onKeyDown={this.keyPressFunction} type="text" className="form-control" id="name"></input>
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
