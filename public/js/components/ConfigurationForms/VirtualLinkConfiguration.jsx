define([
    'react',
    'jquery',
    'properties',
    'toastr',
    'react-jsonschema-form',
    'axios','toastr'
], function(React, $, properties, toastr, Form, axios,toastr) {
    var VirtualLinkConfiguration = Form.default;
    var source;
    var target;
    var hostname;
    var VirtualLinkConfigurationClass = React.createClass({
        getInitialState: function() {
            var vpnHashMap = {};
            var vpnData = ["Choose a VPN"];
            this.props.vpnData.forEach(function(v, i) {
                vpnData.push(v.name);
                vpnHashMap[v.name] = v;
            })
            return {
                "vpnHashMap": vpnHashMap,
                schema: {
                    "type": "array",
                    "items": {
                      "required":["link-group-id","max-bandwidth","link-cost","vpn"],
                        "type": "object",
                        "properties": {
                            "vLan": {
                                "type": "string",
                                "title": "V LAN Tag"
                            },
                            "link-group-id": {
                                "type": "string",
                                "title": "Link group ID"
                            },
                            "max-bandwidth": {
                                "type": "number",
                                "title": "Maximum Bandwidth"
                            },
                            "link-cost": {
                                "type": "number",
                                "title": "Link Cost"
                            },
                            "link-validate": {
                                "type": "string",
                                "title": "Link Validate",
                                "enum": ["Validate", "Do Not Validate"]
                            },
                            "vpn": {
                                "type": "string",
                                "enum": vpnData,
                                "title": "Select VPN"
                            },
                            "vpn-ipv4": {
                                "title": "IPV6",
                                "type": "string",
                                "enum": []
                            },
                            "vpn-ipv6": {
                                "title": "IPV6",
                                "type": "string",
                                "enum": []
                            },
                            "reverseLink": {
                                "type": "object",
                                "title": "Reverse Link",
                                "properties": {
                                    "linkGroupId": {
                                        "title": "Link group ID",
                                            "type": "string"
                                    }
                                }
                            },
                            "forwardingBoxData": {
                                "title": "FB Data",
                                "type": "object",
                                "properties": {
                                    "fb-ipv4": {
                                        "title": "IPV4",
                                        "type": "string"
                                    },
                                    "fb-ipv6": {
                                        "title": "IPV6",
                                        "type": "string"
                                    },
                                    "fb-tp-id": {
                                        "type": "string",
                                        "title": "TP ID"
                                    }
                                }
                            },
                            "hostData": {
                                "title": "Host Data",
                                "type": "object",
                                "properties": {
                                    "hostIpv4": {
                                        "type": "array",
                                        "title": "IPV4",
                                        "items": {
                                            "type": "string"
                                        }
                                    },
                                    "hostIpv6": {
                                        "type": "array",
                                        "title": "IPV6",
                                        "items": {
                                            "type": "string"
                                        }
                                    },
                                    "hostTpId": {
                                        "type": "string",
                                        "title": "TP ID"
                                    }
                                }
                            }
                        }
                    }
                },
                uiSchema: {
                    "items": {
                        "reverseLink": {
                          "classNames": "col-sm-12",
                            "linkGroupId": {
                                "classNames": "col-sm-12",

                            }
                        },
                        "vLan": {
                            "classNames": "col-sm-4"
                        },
                        "link-group-id": {
                            "classNames": "col-sm-4"
                        },
                        "max-bandwidth": {
                            "classNames": "col-sm-4"
                        },
                        "vpn": {
                            "classNames": "col-sm-4"
                        },
                        "vpn-ipv4":{
                            "classNames": "col-sm-4"
                        },
                        "vpn-ipv6":{
                            "classNames": "col-sm-4"
                        },
                        "link-cost": {
                            "classNames": "col-sm-4"
                        },
                        "link-validate": {
                            "classNames": "col-sm-4"
                        },
                        "hostData": {
                            "classNames": "col-sm-6"
                        },
                        "forwardingBoxData": {
                            "classNames": "col-sm-6",

                        },
                        "hostData": {
                            "classNames": "col-sm-6",
                            "hostIpv4": {
                                "ui:options": {
                                    "orderable": false
                                }
                            },
                            "hostIpv6": {
                                "ui:options": {
                                    "orderable": false
                                }
                            }
                        }
                    }
                },
                formData: [
                    {
                        "vLan": "",
                        "vpn": "Choose a VPN"
                    }
                ]
            }
        },
        componentDidMount: function() {
            if (this.props.source.iconType =="fb-icon") {
                source = this.props.source.data;
                target = this.props.target;
            } else {
                source = this.props.target;
                target = this.props.source.data;
            }
            hostname = this.props.hostname;
            var self = this;
        },
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },
        handleConfirm: function(data) {
            var self = this;
            data.forEach(function(v,i){
              debugger;
              self.props.linkService.setVirtualLink(self.props,v);
            })
        },
        validate: function(formData, error) {
            var ipv4 = /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/;
            var ipv6 = /^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$/;
              for (var i = 0; i < formData.length; i++) {
                 debugger;
                  if (!formData[i]["forwardingBoxData"]["fb-ipv4"].match(ipv4)) {
                      error["forwardingBoxData"]["fb-ipv4"].addError("Invalid Ip Address");
                  }
                if (formData[i]["forwardingBoxData"]["fb-ipv6"] && !formData[i]["forwardingBoxData"]["fb-ipv6"].match(ipv6)) {

                  error["forwardingBoxData"]["fb-ipv6"].addError("Invalid Ip Address");
              }
              }
             formData.forEach(function(v,i){
               debugger;
               if(v.forwardingBoxData["fb-ipv4"]){
                 if (!v.forwardingBoxData["fb-ipv4"].match(ipv4)) {
                     error["forwardingBoxData"]["fb-ipv4"].addError("Invalid Ip Address");
                 }
               }
               if(v.forwardingBoxData["fb-ipv6"]){
                 if (!v.forwardingBoxData["fb-ipv6"].match(ipv6)) {
                       error["forwardingBoxData"]["fb-ipv6"].addError("Invalid Ip Address");
                 }
               }
             })
            return error;
        },
        onChange: function(e) {
            var self = this;
            var vLinkDataArr = [];
            var schema = JSON.parse(JSON.stringify(self.state.schema));
            e.formData.forEach(function(v, i) {
                if (v.vLan != "undefined") {
                    var fbTP = source + "." + v.vLan;
                    var hostTP = target + "." + v.vLan;
                      var ipv6Arr=[];
                    if(self.state.vpnHashMap[v.vpn])
                      ipv6Arr = self.state.vpnHashMap[v.vpn].ipv6;
                    if(ipv6Arr.indexOf("Choose Item")==-1)
                      ipv6Arr.splice(0,0,"Choose Item")
                    //schema.items.properties.forwardingBoxData.properties["fb-ipv6"].enum = ipv6Arr;
                    schema.items.properties["vpn-ipv6"].enum=ipv6Arr;
                    //    var ipv6Arr = ipv6.split("/");
                    //    if (ipv6Arr.length > 1) {
                    //        ipv6 = ipv6Arr[0] + "/" + (parseInt(ipv6Arr[1]) - 2);
                    //    }
                    var ipv4Arr=[];
                    if(self.state.vpnHashMap[v.vpn])
                      ipv4Arr = self.state.vpnHashMap[v.vpn].ipv4;
                      if(ipv4Arr.indexOf("Choose Item")==-1)
                        ipv4Arr.splice(0,0,"Choose Item")
                  //  schema.items.properties.forwardingBoxData.properties["fb-ipv4"].enum = ipv4Arr;
                  schema.items.properties["vpn-ipv4"].enum = ipv4Arr;
                  //  var ipv4 = self.state.vpnHashMap[v.vpn].ipv4[0];
                    //  var ipv4Arr = ipv4.split("/");
                    //  if (ipv4Arr.length > 1) {
                    //      ipv4 = ipv4Arr[0] + "/" + (parseInt(ipv4Arr[1]) - 2)
                    //
                    var vLinkData=JSON.parse(JSON.stringify(v))
                    vLinkData.forwardingBoxData=  {
                          "fb-tp-id": fbTP,
                          "fb-ipv6": v.forwardingBoxData["fb-ipv6"],
                          "fb-ipv4":  v.forwardingBoxData["fb-ipv4"]
                      },
                    vLinkData.hostData={
                          "hostTpId": hostTP,
                          "hostIpv6": v.hostData["hostIpv6"],
                          "hostIpv4": v.hostData["hostIpv4"]
                      },
                    vLinkDataArr.push(vLinkData)
                }
            })
            self.setState({formData: vLinkDataArr});
            self.setState({schema: schema});
        },
        handleCancel: function() {
            $('#pageModal').modal('hide')
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
                            <VirtualLinkConfiguration schema={this.state.schema} uiSchema={this.state.uiSchema} formData={this.state.formData} onChange={this.onChange} onSubmit={this.onSubmit} onError={errors => {
                                console.log("i am errors" + errors);
                            }}>
                                <div>
                                    <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                                    <button onClick={this.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                                </div>
                            </VirtualLinkConfiguration>
                        </div>
                    </div>
                </div>
            )
        }
    });
    return VirtualLinkConfigurationClass;
});
