define([
    'react',
    'jquery',
    'properties',
    'toastr',
    'react-jsonschema-form',
    'axios',
    'services/NodeService'
], function(React, $, properties, toastr, Form, axios, NodeService) {
    var CloneFbForm = Form.default;
    const schema = {
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "title": "Name"
            }

        }
    };
    const uiSchema = {};
    const formData = {};
    var CreateClone = React.createClass({
        /*  onClick : function(e){
      console.log("test");
        },*/
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },
        getData: function(key) {
            return axios.get(properties.nodeIp + "/getKey?key=" + key);
        },
        saveNodeData: function(data) {
            return axios.post(properties.nodeIp + '/saveKey', data)
        },
        saveFbBackendData:function(data){
          return axios.get(properties.rmsIp + data.oldFb+"/clone/"+data.newFb)

        },
        savePortData: function(data, ports) {
          if(ports)
            data.ports = ports;
            axios.post(properties.saveComponent, data);
        },
        handleConfirm: function(data) {
            var self = this;
            var check = true;
            data.type = "fb-icon";
            var fbname = data.name;
            axios.get(properties.getNativeTopologyData).then(function(response) {
                var check = self.checkDuplicate(response.data, fbname);
                if (check) {
                    switch (this.props.node.get("iconType")) {
                        case "fb-icon":
                          axios.get(properties.nodeIp + "/getKey?key=" + self.props.node.get("label") + "_forwardingData").then(function(response) {
                          var formData = response.data;
                          formData.name = fbname;
                          axios.all([
                              self.saveNodeData({
                                  value: formData,
                                  key: fbname + "_forwardingData"
                              }),
                              self.saveFbBackendData({oldFb:self.props.node.get("label"),newFb:fbname})
                          ]).then(axios.spread(function(response1, response2) {
                              // Both requests are now complete
                              var coordinates = {
                                  x: self.props.node.get("x") - 5,
                                  y: self.props.node.get("y")
                              }
                              self.props.topologyModel.createNode(fbname, self.props.node.get("iconType"), coordinates,true);
                              toastr.success("Forwarding Box  " + fbname + "cloned  successfully");
                              var logData = {
                                  "configuration": "Cloned Forwarding Box",
                                  "type": "success",
                                  "message": "Forwarding Box cloned sucessfully!",
                                  "element": formData.host_name
                              }
                              $('#pageModal ').modal('hide');
                              NodeService.saveLog(logData)
                          }));
                          });

                        break;

                            break;
                        case "host":
                            axios.get(properties.nodeIp + "/getKey?key=" + self.props.node.get("label") + "_host").then(function(response) {
                              var formData = response.data;
                              formData.host_name = fbname;
                              var portsArray=NodeService.convertHostDatatoPorts(formData)
                              axios.all([
                                  self.saveNodeData({
                                      value: formData,
                                      key: fbname + "_host"
                                  }),
                                  self.savePortData(portsArray)
                              ]).then(axios.spread(function(response1, response2) {
                                  // Both requests are now complete
                                  var coordinates = {
                                      x: self.props.node.get("x") - 5,
                                      y: self.props.node.get("y")
                                  }
                                  self.props.topologyModel.createNode(fbname, self.props.node.get("iconType"), coordinates,true);
                                  toastr.success("Host " + fbname + "cloned  successfully");
                                  var logData = {
                                      "configuration": "Cloned Host Switch",
                                      "type": "success",
                                      "message": "Host cloned sucessfully!",
                                      "element": formData.host_name
                                  }
                                  $('#pageModal ').modal('hide');
                                  NodeService.saveLog(logData)
                              }));
                              });

                            break;
                        case "optical-switch":
                            axios.get(properties.nodeIp + "/getKey?key=" + self.props.node.get("label") + "_opticalData").then(function(response) {
                                var formData = response.data;
                                formData.name = fbname;
                                var portsArray = NodeService.convertOpticalPorttoStrings(formData.listOfPorts, fbname);
                                axios.all([
                                    self.saveNodeData({
                                        value: formData,
                                        key: fbname + "_opticalData"
                                    }),
                                    self.savePortData(formData, portsArray)
                                ]).then(axios.spread(function(response1, response2) {
                                    // Both requests are now complete
                                    var coordinates = {
                                        x: self.props.node.get("x") - 5,
                                        y: self.props.node.get("y")
                                    }
                                    self.props.topologyModel.createNode(fbname, self.props.node.get("iconType"), coordinates,true);
                                    toastr.success("Optical Switch " + fbname + "cloned  successfully");
                                    var logData = {
                                        "configuration": "Cloned Optical Switch",
                                        "type": "success",
                                        "message": "Optical Switch Cloned sucessfully!",
                                        "element": formData.name
                                    }
                                    $('#pageModal ').modal('hide');
                                    NodeService.saveLog(logData)
                                }));
                            });

                            break;
                        default:

                    }
                } else {
                    toastr.error("Node already exists. Provide a different name");

                }

            }.bind(this));
        },
        getInitialState: function() {
            return {formData: this.props.formData}
        },
        checkDuplicate: function(dat, fbname) {
            console.log("Inside duplicates")
            if (dat) {
                if (dat.nodes.length == 0) {
                    return true;
                }
                for (var i = 0; i < dat.nodes.length; i++) {
                    if (dat.nodes[i].label == fbname) {
                        return false;
                    } else if (i == dat.nodes.length - 1) {
                        return true;
                    } else {
                        continue;
                    }
                }
            } else {
                return true;
            }

        },
        handleCancel: function() {
            $('#pageModal ').modal('hide')
        },
        render: function() {
            return (
                <div className="modal-dialog">
                    <div className={"modal-content " + this.props.className}>
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.handleCancel}>
                                &times;
                            </button>
                            <h3>{this.props.header}</h3>
                        </div>
                        <div className="modal-body">
                            <CloneFbForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={this.props.formData} onSubmit={this.onSubmit} onError={errors => {
                                console.log("i am errors" + errors);
                            }} onSubmit={this.onSubmit}>
                                <div>
                                    <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                                    <button onClick={this.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                                </div>
                            </CloneFbForm>
                        </div>
                    </div>
                </div>
            )
        }
    });
    return CreateClone;
});
