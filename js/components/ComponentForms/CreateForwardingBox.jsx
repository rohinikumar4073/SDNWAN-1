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

    var CreateFBComponent = React.createClass({
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
            event.stopPropagation()
      },
      handleCancel: function() {
          this.props.close();
          if (this.props.onCancel) {
              this.props.onCancel();
          }
      },
      handleConfirm: function() {

            this.props.topologyModel.createNode(this.state.fbName, this.props.iconType, this.props.coordinates);
            console.log("iconType" + this.props.iconType)
            this.props.close();
            properties.addNode(this.state.fbName,this.props.iconType)




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
                      <form id="add-node-form">
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

    return CreateFBComponent;

});
