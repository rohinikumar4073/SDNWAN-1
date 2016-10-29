define([
    'react', 'jquery','properties','toastr'
], function(React, $,properties,toastr) {



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
                   var isList=e.target.getAttribute("list")
                    if(parnetId )
                    {if(this.state.dataToBeSend[parnetId] && isList && isList=="true"){
                      var dataJson={};
                      dataJson[e.target.id]=e.target.value;
                      this.state.dataToBeSend[parnetId][0][e.target.id]=e.target.value;
                    }else if(this.state.dataToBeSend[parnetId] ){
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
event.stopPropagation()
      },

        handleConfirm: function() {
          if(!this.state.dataToBeSend['node-id']){
            toastr.error("Please enter host name")
            return
          }
          if(!this.state.dataToBeSend['termination-point'][0]['host-port-name']){
            toastr.error("Please enter host port name")
            return
          }
          var self = this;
          var postURL = properties.rmsIp +
              this.state.dataToBeSend['node-id'] +
              "/port/add";

              jsonData = {
                  "fb_ip": "",
                  "is_dac": "",
                  "name": this.state.dataToBeSend['termination-point'][0]['host-port-name'],
                  "speed": "",
                  "trunks": [""],
                  "type": "",
                  "vlan_mode": ""
              }

          $
              .ajax({
                  url: postURL,
                  method: 'POST',
                  data: JSON.stringify(jsonData),
                  contentType: "application/json; charset=utf-8",
                  success: function(data) {
                    toastr.success("Port added successfully")
                  },
                  error: function(data) {
                    toastr.error("Not able to add port")
                  }
              });

          $.ajax({
       url: properties.createHost,
       type: 'post',
       data: JSON.stringify(this.state.dataToBeSend),
       contentType: "application/json; charset=utf-8",
       success: function (data) {
         self.props.topologyModel.createNode(self.state.dataToBeSend["node-id"], self.props.iconType, self.props.coordinates);
         console.log("iconType" + self.props.iconType)
         self.props.close();
         properties.addNode(self.state.dataToBeSend["node-id"],self.props.iconType)

         toastr.success("Host added successfully")

       },
       error: function(data) {
         toastr.error("Not able to add host")
       }


       });
  this.props.close();
          },

          getInitialState: function() {

                                  return {
                                    hostName:"",
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
                      <form id="add-node-host">

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

                                  <input type="text" className="form-control" onChange={this.onChangeFunction} data-parentdata="termination-point" list="true"id="host-port-name"></input>
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
