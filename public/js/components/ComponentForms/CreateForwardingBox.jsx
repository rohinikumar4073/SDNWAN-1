define([
    'react', 'jquery', 'properties', 'react-jsonschema-form', 'toastr'
], function(React, $, properties, Form, toastr) {
    var FormFB = Form.default;

    const schema = {
        "type": "object",
        "anyOf": [
            {
                "required": [
                    "name",
                    "network_domain",
                    "site_id",
                    "management_ipv4_address",
                    "default_gateway_ipv4_address",
                    "dns_name_server_ipv4_address_primary"
                ]
            }, {
                "required": [
                    "name",
                    "network_domain",
                    "site_id",
                    "management_ipv6_address",
                    "default_gateway_ipv6_address",
                    "dns_name_server_ipv6_address_primary"
                ]
            }, {
                "required": [
                    "name",
                    "network_domain",
                    "site_id",
                    "management_ipv4_address",
                    "default_gateway_ipv4_address",
                    "dns_name_server_ipv4_address_primary",
                    "management_ipv6_address",
                    "default_gateway_ipv6_address",
                    "dns_name_server_ipv6_address_primary"
                ]
            }
        ],
        "properties": {
            "name": {
                "type": "string",
                "title": "Device Name",
                "minLength": 3,
                "maxLength": 20
            },
            "network_domain": {
                "type": "string",
                "title": "Network Domain",
                "minLength": 3,
                "maxLength": 40
            },
            "site_id": {
                "type": "string",
                "title": "Site ID",
                "minLength": 3,
                "maxLength": 8
            },
            "location_description": {
                "type": "string",
                "title": "Location Description",
                "minLength": 3,
                "maxLength": 50
            },
            "node_group_id": {
                "type": "string",
                "title": "Node Group ID",
                "minLength": 3,
                "maxLength": 40
            },
            "management_ipv4_address": {
                "type": "string",
                "title": "Management IPv4 Address"
            },
            "default_gateway_ipv4_address": {
                "type": "string",
                "title": "Default Gateway IPv4 Address"
            },
            "dns_name_server_ipv4_address_primary": {
                "type": "string",
                "title": "DNS Name Server IPv4 Address Primary"
            },
            "dns_name_server_ipv4_address_secondary": {
                "type": "string",
                "title": "DNS Name Server IPv4 Address Secondary"
            },
            "management_ipv6_address": {
                "type": "string",
                "title": "Management IPv6 Address"
            },
            "default_gateway_ipv6_address": {
                "type": "string",
                "title": "Default Gateway IPv6 Address"
            },
            "dns_name_server_ipv6_address_primary": {
                "type": "string",
                "title": "DNS Name Server IPv6 Address Primary"
            },
            "dns_name_server_ipv6_address_secondary": {
                "type": "string",
                "title": "DNS Name Server IPv6 Address Secondary"
            }
        }

    };
    const uiSchema = {};
    const formData = {};

    var CreateFBComponent = React.createClass({
        getInitialState: function() {
            return {formData: this.props.formData}
        },
        onSubmit: function(e) {
          debugger;
            this.handleConfirm(e.formData)
        },
        handleCancel: function() {
            this.props.close();
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        },
        validate: function(formData, error) {
            var ipv4 = /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/;
            var ipv6 = /^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$/;
            if (formData["management_ipv4_address"]) {
                if (!formData["management_ipv4_address"].match(ipv4)) {
                    error["management_ipv4_address"].addError("Invalid Ip Address");
                    debugger;
                }
                if(formData["default_gateway_ipv4_address"]){
                  if (!formData["default_gateway_ipv4_address"].match(ipv4)) {
                      error["default_gateway_ipv4_address"].addError("Invalid Ip Address");
                  }
                }
                if(formData["dns_name_server_ipv4_address_primary"]){
                  if (!formData["dns_name_server_ipv4_address_primary"].match(ipv4)) {
                       error["dns_name_server_ipv4_address_primary"].addError("Invalid Ip Address");
                   }
                }
               if(formData["dns_name_server_ipv4_address_secondary"]){
                 if (!formData["dns_name_server_ipv4_address_secondary"].match(ipv4)) {
                     error["dns_name_server_ipv4_address_secondary"].addError("Invalid Ip Address");
                 }
               }
            }
            if (formData["management_ipv6_address"]) {
                if (!formData["management_ipv6_address"].match(ipv4)) {
                    error["management_ipv6_address"].addError("Invalid Ip Address");
                }
                if(formData["default_gateway_ipv6_address"]){
                  if (!formData["default_gateway_ipv6_address"].match(ipv4)) {
                      error["default_gateway_ipv6_address"].addError("Invalid Ip Address");
                  }
                }
                if(formData["dns_name_server_ipv6_address_primary"]){
                  if (!formData["dns_name_server_ipv6_address_primary"].match(ipv4)) {
                       error["dns_name_server_ipv6_address_primary"].addError("Invalid Ip Address");
                   }
                }
               if(formData["dns_name_server_ipv6_address_secondary"]){
                 if (!formData["dns_name_server_ipv6_address_secondary"].match(ipv4)) {
                     error["dns_name_server_ipv6_address_secondary"].addError("Invalid Ip Address");
                 }
               }
            }
            if(formData["management_ipv4_address"]){
              if(formData["default_gateway_ipv4_address"] == null){
                error["default_gateway_ipv4_address"].addError("Please fill these fields.")
              }
              if(formData["dns_name_server_ipv4_address_primary"] == null){
                error["dns_name_server_ipv4_address_primary"].addError("Please fill these fields.")
              }
              if(formData["dns_name_server_ipv4_address_secondary"] == null){
                error["dns_name_server_ipv4_address_secondary"].addError("Please fill these fields.")
              }
            }
            if(formData["management_ipv6_address"]){
              if(formData["default_gateway_ipv6_address"] == null){
                error["default_gateway_ipv6_address"].addError("Please fill these fields.")
              }
              if(formData["dns_name_server_ipv6_address_primary"] == null){
                error["dns_name_server_ipv6_address_primary"].addError("Please fill these fields.")
              }
              if(formData["dns_name_server_ipv6_address_secondary"] == null){
                error["dns_name_server_ipv6_address_secondary"].addError("Please fill these fields.")
              }
            }

          return error;
        },
        checkDuplicate: function(dat, fbname) {
            if (dat) {
                if (dat.nodes.length == 0) {
                    return true;
                }
                for (var i = 0; i < dat.nodes.length; i++) {
                    debugger;
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
        updateData: function() {
            if (this.props.submitMode != "Save") {
                var name = this.props.formData.name + "_forwardingData";
                var id = this.props.formData.id;
                var self = this;
                $.ajax({
                    url: properties.nodeIp + "/getKey?key=" + name,
                    type: 'get',
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        var formData = JSON.parse(data);
                        formData.id = id;
                        self.setState({"formData": formData});
                        console.log("Pushed the details.")

                    },
                    error: function(data) {
                        console.log("Error in saving details.")
                    }

                });

            } else {
                this.setState({"formData": {}});

            }
        },
        handleConfirm: function(data) {
            var self = this;
            var check = true;
            data.type = "fb-icon";
            var fbname = data.name;
            var dat;
            $.ajax({
                url: properties.getNativeTopologyData,
                type: 'get',
                contentType: "application/json; charset=utf-8",
                success: function(nodeData) {
                  if(!nodeData){
                    dat = {nodes: [], links: [], nodeSet: []};
                  }
                  else{
                    dat=JSON.parse(nodeData);
                  }
                    if(self.props.submitMode !== "Update"){
                      check = self.checkDuplicate(dat, fbname);
                    }
                    if (check) {
                        $.ajax({
                            url: properties.saveComponent,
                            type: 'post',
                            data: JSON.stringify(data),
                            contentType: "application/json; charset=utf-8",
                            success: function(datareturn) {
                                if (datareturn == "success") {
                                    if (self.props.submitMode == "Update") {
                                        toastr.success("Forwarding Box updated successfully");
                                        return;
                                    }
                                    self.props.topologyModel.createNode(data.name, self.props.iconType, self.props.coordinates);
                                    properties.addNode(data.name, self.props.iconType);
                                    self.props.close();
                                    toastr.success("Forwarding Box " + data.name + " added successfully");
                                    var logData =
                                        {
                                          "configuration": "Create Forwarding Box",
                                          "type": "success",
                                          "message": "Forwarding box created sucessfully!",
                                          "element": fbname
                                        }
                                    $.ajax({
                                      url: properties.saveLog,
                                      type: 'post',
                                      data: JSON.stringify(logData),
                                      contentType: "application/json; charset=utf-8",
                                      success: function(dataReturn){
                                        console.log("Log saved");
                                      },
                                      error: function(dataReturn){
                                        console.log("Log not saved");
                                      }
                                    })
                                } else {
                                    toastr.error("Error in adding Forwarding Box " + data.name + " ")

                                }
                            },
                            error: function(data) {
                              var logData =
                                  {
                                    "configuration": "Create Forwarding Box",
                                    "type": "Failure",
                                    "message": "Forwarding box created sucessfully!",
                                    "element": fbname
                                  }
                              $.ajax({
                                url: properties.saveLog,
                                type: 'post',
                                data: JSON.stringify(logData),
                                contentType: "application/json; charset=utf-8",
                                success: function(dataReturn){
                                  console.log("Log saved");
                                },
                                error: function(dataReturn){
                                  console.log("Log not saved");
                                }
                              })
                                toastr.error("Not able to add Forwarding Box")
                            }

                        });

                        var forwardingBoxData = {
                            value: data,
                            key: data.name + "_forwardingData"
                        }
                        $.ajax({
                            url: properties.nodeIp + "/saveKey",
                            type: 'post',
                            data: JSON.stringify(forwardingBoxData),
                            contentType: "application/json; charset=utf-8",
                            success: function(datareturn) {
                                console.log("saved the forwarding detials")
                            },
                            error: function(data) {
                                toastr.error("Not able to save forwarding detials")
                            }

                        });

                    } else {
                        toastr.error("Node already exists. Provide a different name");
                    }
                },
                error: function(data) {}

            });

            if (this.props.submitMode == "Update")
                this.props.topologyModel.updateNodeModel({name: data.name, formData: this.state.formData});
        },

        render: function() {
            return (
                <div className={"modal-content " + this.props.className}>
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.handleCancel}>
                            &times;</button>
                        <h3>{this.props.title}</h3>
                    </div>
                    <div className="modal-body">
                        <FormFB schema={schema} uiSchema={uiSchema} formData={this.state.formData} validate={this.validate} onChange={this.onChange} className="formFB" onSubmit={this.onSubmit} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit} showErrorList={false}>
                            <div>
                                <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                                <button onClick={this.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                            </div>
                        </FormFB>
                    </div>

                </div>

            );
        }
    });

    return CreateFBComponent;

});
