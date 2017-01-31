define([
    'react',
    'jsx!components/BootstrapButton',
    'properties',
    'toastr',
    'react-jsonschema-form',
    'jquery'
], function(React, BootstrapButton, properties, toastr, Form, $) {
    var FBOSForm = Form.default;



  function MyCustomWidget() {
    return <input defaultValue={Date()} className="form-control" disabled="true" />;
  }



    var FBOSData = React.createClass({
            getInitialState: function() {

                return {
                  schema: {
                      "type": "object",
                      "properties": {
                        "templateInfo": {
                          "type": "object",
                          "title": "OS Information",
                          "properties": {
                            "name": {
                              "type": "string",
                              "title": "Name",
                              "minLength": 3,
                              "maxLength": 20
                            },
                            "revision": {
                              "type": "string",
                              "title": "Revision"
                            },
                            "lastUpdatedBy": {
                              "type": "string",
                              "title": "Last Updated By"
                            },
                            "status": {
                              "type": "string",
                              "title": "Status",
                              "enum": [
                                "Draft",
                                "Available",
                                "Decommissioned"
                              ]
                            },
                            "templateCategory": {
                              "type": "string",
                              "title": "Template Category"
                            },
                            "timeStamp": {
                              "type": "string",
                              "title": "Time Stamp"
                            }
                          },
                          "required": [
                            "name",
                            "revision",
                            "lastUpdatedBy"
                          ]
                        },
                          "osIdentifier": {
                              "type": "string",
                              "title": "OS Identifier/Label",
                              "minLength": 3,
                              "maxLength": 20
                          },
                          "osVersion": {
                              "type": "string",
                              "title": "OS Version",
                              "minLength": 3,
                              "maxLength": 20
                          },
                          "imageFileName": {
                              "type": "string",
                              "title": "Image File Name",
                              "minLength": 3,
                              "maxLength": 40
                          },
                          "orderablePartNumber": {
                              "type": "string",
                              "title": "Orderable Part Number",
                              "minLength": 3,
                              "maxLength": 40
                          },
                          "materialId": {
                              "type": "string",
                              "title": "Material ID (from Vz procurement system)",
                              "minLength": 3,
                              "maxLength": 40
                          },
                          "ofProtocolsSupported": {
                              "type": "string",
                              "title": "OF Protocols Supported",
                              "enum": [
                                  "OpenFlow10",
                                  "OpenFlow11",
                                  "OpenFlow12",
                                  "OpenFlow13",
                                  "OpenFlow14",
                                  "OpenFlow15"
                              ]
                          },
                          "linuxKernelVersion": {
                              "type": "string",
                              "title": "Linux Kernel Version",
                              "minLength": 3,
                              "maxLength": 40
                          },
                          "linuxDistributionBase": {
                              "type": "string",
                              "title": "Linux Distribution Base",
                              "minLength": 3,
                              "maxLength": 40
                          },
                          "enableLocalArpResponseProcessing": {
                              "type": "boolean",
                              "title": "Enable Local ARP Response Processing",
                              "default": true
                          },
                          "localArpResponseSubnetCoverage": {
                              "type": "array",
                              "title": "Local ARP Response Subnet Coverage",
                              "items": {
                                "type": "string"
                              }
                          },
                          "enableLocalIpv6NDResponseProcessing": {
                              "type": "boolean",
                              "title": "Enable Local IPv6 ND Response Processing",
                              "default": true
                          },
                          "localIpv6NDResponseSubnetCoverage": {
                              "type": "array",
                              "title": "Local IPv6 ND Response Subnet Coverage",
                              "items": {
                                "type": "string"
                              }
                          },
                          "flowHandlingMode": {
                            "title": "Flow Handling Mode",
                            "type": "string",
                            "enum": [
                              "Software Flow Allowed",
                              "Hardware Flow Only",
                              "Enable Packet Driven"
                            ],
                            "default": "Hardware Flow Only"
                          },
                          "groupHashFields": {
                            "title": "Group Hash Fields",
                            "type": "string",
                            "AnyOf":["nw src", "nw dst", "dl src", "dl dst"],
                            "default": "nw src, nw dst"
                          },
                          "globalLLDPEnable": {
                            "title": "Gloabl LLDP Enable",
                            "type": "boolean",
                            "default": true
                          },
                          "LLDPMsgTxHold": {
                            "title": "LLDP Msg Tx Hold",
                            "type": "string",
                            "minimum": "10",
                            "maximum": "255",
                            "default": "120"
                          },
                          "LLDPReinitDelay": {
                            "title": "LLDP Reinit Delay",
                            "type": "string",
                            "minimum": "1",
                            "maximum": "10",
                            "default": "2"
                          },
                          "LLDPTxDelay": {
                            "title": "LLDP Tx Delay",
                            "type": "string",
                            "minimum": "1",
                            "maximum": "10",
                            "default": "2"
                          },
                          "enableAlarm": {
                            "title": "Enable Alarm",
                            "type": "boolean",
                            "default": true
                          },
                          "alarmHighTemp": {
                              "type": "string",
                              "title": "Alarm High Temperature",
                              "minLength": 2,
                              "maxLength": 3
                          },
                          "alarmLowTemp": {
                              "type": "string",
                              "title": "Alarm Low Temperature",
                              "minLength": 2,
                              "maxLength": 3
                          },
                          "enableSFP": {
                            "title": "Enable SFP",
                            "type": "boolean",
                            "default": true
                          },
                          "SFPInventoryQueryInterval": {
                            "title": "SFP Inventory Query Interval",
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 60
                          },
                          "enableCounter": {
                            "title": "Enable Counter",
                            "type": "boolean",
                            "default": true
                          },
                          "counterQueryInterval": {
                            "title": "Counter Query Interval",
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 60
                          },
                          "enableHWFlowCounter": {
                            "title": "Enable HW Flow Counter",
                            "type": "boolean",
                            "default": true
                          },
                          "HWFlowCounterInterval": {
                            "title": "HW Flow Counter Interval",
                            "type": "integer",
                            "minimum": 0,
                            "maximum": 60
                          },
                          "TCAMPriority": {
                            "title": "TCAM Priority",
                            "type": "array",
                            "items": {
                              "properties": {
                                "matchConfiguration": {
                                  "title": "Match Configuration",
                                  "type": "string",
                                  "enum": [
                                    "IPv6 Full",
                                    "IPv6 64",
                                    "IPv6 src",
                                    "IPv4 dst",
                                    "IPv4",
                                    "mac"
                                  ]
                                },
                                "hardwareFlowStartIndex": {
                                  "title": "Hardware Flow Start Index",
                                  "type": "integer"
                                },
                                "hardwareFlowEndIndex": {
                                  "title": "Hardware Flow End Index",
                                  "type": "integer"
                                },
                                "hardwareFlowRegionSize": {
                                  "title": "Hardware Flow Region Size",
                                  "type": "integer"
                                }
                              }
                            }
                          },
                          "puppetAgentUtilized": {
                            "title": "Puppet Agent Utilized",
                            "type": "boolean",
                            "default": false
                          }
                      },
                      "dependencies": {
                        "enableLocalArpResponseProcessing": [
                          "localArpResponseSubnetCoverage"
                        ],
                        "enableLocalIpv6NDResponseProcessing": [
                          "localIpv6NDResponseSubnetCoverage"
                        ]
                      },
                      "additionalProperties": false
                  },
                  formData:{
                    "templateInfo": {
                      "templateCategory": "OS Template"
                    }
                  },
                  uiSchema: {
                  "templateInfo": {
                    "status": {
                      "ui:widget": "radio",
                      "ui:options": {
                        "inline": true
                      }
                    },
                    "timeStamp": {
                       "ui:widget": MyCustomWidget
                    },
                    "templateCategory": {
                      "ui:disabled": true
                    }
                  }
                },
            }
        },



    onSubmit: function(e) {
        this.handleConfirm(e.formData)
    },

    handleConfirm : function(data) {
        var self = this;
        $.ajax({
            url: properties.templateIp + "CreateOsTemplate",
            type: 'post',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.success("Success! OS template is created")
            },
            error: function(data) {
                toastr.error("Error! OS template is not created")
            }
        });
        this.props.close();
    },

    // onChange : function(totalSchema) {
    //     if (totalSchema.formData.osconfiguration.enableLocalArpResponse == true) {
    //         $(".localarp").show();
    //     } else if (totalSchema.formData.osconfiguration.enableLocalArpResponse == false) {
    //         $(".localarp").hide();
    //     };
    //
    //     if (totalSchema.formData.osconfiguration.enableLocalIpv6ArpResponse == true) {
    //         $(".localIpv6").show();
    //     } else if (totalSchema.formData.osconfiguration.enableLocalIpv6ArpResponse == false) {
    //         $(".localIpv6").hide();
    //     };
    // },
    render : function() {

        return (
            <div className={this.props.className}>
                <div className="modal-header">
                    <button type="button" className="close" onClick={this.props.handleCancel}>&times;</button>
                    <h3>{this.props.header}</h3>
                </div>
                <div className="modal-body">
                    <FBOSForm schema={this.state.schema} uiSchema={this.state.uiSchema} formData={this.state.formData} onChange={this.onChange} onError={errors => {
                        console.log("i am errors" + errors);
                    }} onSubmit={this.onSubmit}>
                        <div>
                            <button type="submit" className="btn  btn-primary btn-sm fixedbt">Create New
                            </button>
                        </div>
                    </FBOSForm>
                </div>
                <div className="modal-footer fixedspace"></div>
            </div>
        )
    }
});
return FBOSData;
});
