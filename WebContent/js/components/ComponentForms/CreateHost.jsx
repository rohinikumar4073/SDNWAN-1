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

    var CreateHost = React.createClass({

      onChangeFunction:function(e){
                   var parnetId=e.target.getAttribute("data-parentdata")
                    if(parnetId )
                    {
                      if(this.state.dataToBeSend[parnetId]){
                        this.state.dataToBeSend[parnetId][e.target.id]=e.target.value;
                        }else{
                         this.state.dataToBeSend[parnetId][e.target.id]=e.target.value;
                        }
                    }else{
                      this.state.dataToBeSend[e.target.id]=e.target.value;
                    }

    this.setState({
                dataToBeSend: this.state.dataToBeSend

                });
                 },
      keyPressFunction: function(event) {

          var keycode = (event.keyCode
              ? event.keyCode
              : event.which);
          if (keycode == '13') {
              this.handleConfirm();
          }

      },

        handleConfirm: function() {
          var self = this;
          $.ajax({
       url: properties.createHost,
       type: 'post',
       data: JSON.stringify(this.state.dataToBeSend),
       contentType: "application/json; charset=utf-8",
       success: function (data) {
         debugger;
         self.props.topologyModel.createNode(self.state.dataToBeSend['node-id'], self.props.iconType, self.props.coordinates);
         console.log("iconType" + self.props.iconType)
         self.props.close();
       }


       });
  this.props.close();
          },

          getInitialState: function() {

                                  return {
                                    dataToBeSend:
                                      {
                              "node-id": "",
                              "subnets": {
                                "staticSubnet": [
                                  {
                                    "subnetId": ""
                                  }
                                ]
                              },
                              "termination-point": [
                                {
                                  "host-port-name": "",
                                  "ip-address": [
                                    ""
                                  ],
                                  "tp-id": ""
                                }
                              ],
                              "type": ""
                            }
                                  }
                },

          handleCancel: function() {

              if (this.props.onCancel) {
                  this.props.onCancel();
              }
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
                      <form id="add-host-form">

                          <div >
                              <div className="form-group">
                                  <label for="nodeId">Node Id:</label>

                                  <input type="text"  onKeyDown={this.keyPressFunction}  className="form-control" id="node-id" onChange={this.onChangeFunction}></input>
                              </div>
                              <div className="form-group">
                                  <label for="subnets">Subnets</label>

                                  <input type="text" className="form-control" id="subnets"></input>
                              </div>
                              <div className="form-group">
                                  <label for="static-subnet">Static Subnet :</label>

                                  <input type="text" className="form-control" id="static-subnet"></input>
                              </div>
                              <div className="form-group">
                                  <label for="tp_id">TP ID:</label>

                                  <input type="text" className="form-control" id="tp_id"></input>
                              </div>
                              <div className="form-group">
                                  <label for="host-port-name">Host Port Name :</label>

                                  <input type="text" className="form-control" id="host-port-name"></input>
                              </div>
                              <div className="form-group">
                                  <label for="ip-address">IP Address :</label>

                                  <input type="text" className="form-control" id="ip-address"></input>
                              </div>
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

    return CreateHost;

});
