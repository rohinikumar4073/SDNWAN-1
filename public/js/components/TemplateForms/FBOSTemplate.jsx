define([
    'react',
    'jsx!components/BootstrapButton',
    'properties',
    'toastr',
    'react-jsonschema-form',
    'jquery'
], function(React, BootstrapButton, properties, toastr, Form, $) {
    var FBOSForm = Form.default;
    function MyCustomWidget(props) {
        return <input defaultValue={Date()} className="form-control" disabled="true"/>;
    };
    function HiddenFeild(props) {
        return <div className="form-group">
            <input type="text" className="Test" hidden="true"></input>
        </div>

    };

    var FBOSData = React.createClass({
        getInitialState: function() {

            return {
                schema: {
                    "type": "object",
                    "properties": {
                        "templateInfo": {
                            "type": "object",
                            "title": "Template Information",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "title": "Name"
                                },
                                "revision": {
                                    "type": "string",
                                    "title": "Revision"
                                },
                                "lastUpdatedBy": {
                                    "type": "string",
                                    "title": "Last Updated By"
                                },
                                "timeStamp": {
                                    "type": "string",
                                    "title": "Time Stamp"
                                },
                                "status": {
                                    "type": "string",
                                    "title": "Status",
                                    "enum": ["Draft", "Available", "Decommissioned"]
                                },
                                "templateCategory": {
                                    "type": "string",
                                    "title": "Template Category"
                                }
                            },
                            "required": ["name"]
                        },
                        "osIdentifierOS": {
                            "type": "string",
                            "title": "OS Identifier/Label"
                        },
                        "manufacturerOS": {
                            "type": "string",
                            "title": "Manufacturer"
                        },
                        "versionOS": {
                            "type": "string",
                            "title": "Version"
                        },
                        "imageFileNameOS": {
                            "type": "string",
                            "title": "Image File Name"
                        },
                        "orderablePartNumberOS": {
                            "type": "string",
                            "title": "Orderable Part Number"
                        },
                        "descriptionOS": {
                            "type": "string",
                            "title": "Description"
                        },
                        "materialIdOS": {
                            "type": "string",
                            "title": "Material ID (from Vz procurement system)"
                        },
                        "openFlowVersionOS": {
                            "type": "string",
                            "title": "OpenFlow Protocol Version(s) Supported",
                            "enum": ["1.3", "1.5"]
                        },
                        "linuxVersionOS": {
                            "type": "string",
                            "title": "Linux kernel version"
                        },
                        "linuxBaseOS": {
                            "type": "string",
                            "title": "Linux Distribution base"
                        },
                        "osconfiguration": {
                            "type": "object",
                            "title": "OS Configuration",
                            "properties": {
                                "enableLocalArpResponse": {
                                    "type": "boolean",
                                    "title": "Enable Local ARP Response Processing"
                                },
                                "localArpResponseCoverage": {
                                    "type": "string",
                                    "title": "Local ARP Response Subnet Coverage"
                                },
                                "enableLocalIpv6ArpResponse": {
                                    "type": "boolean",
                                    "title": "Enable Local IPv6 ND Response Processing"
                                },
                                "localIpv6ArpResponseCoverage": {
                                    "type": "string",
                                    "title": "Local IPv6 ND Response Subnet Coverage"
                                },
                                "queryInterval": {
                                    "type": "string",
                                    "title": "FB & SFP Inventory Query Interval(sec)"
                                },
                                "interfaceInterval": {
                                    "type": "string",
                                    "title": "Interface and Flow Counter Query Interval(sec)"
                                },
                                "alarmHistory": {
                                    "type": "string",
                                    "title": "Alarm History",
                                    "enum": ["Enabled", "Disabled"]
                                },
                                "alarmHigh": {
                                    "type": "string",
                                    "title": "Alarm High Temperature(F Degrees)"
                                },
                                "alarmLow": {
                                    "type": "string",
                                    "title": "Alarm Low Temperature(F Degrees)"
                                },
                                "puppet": {
                                    "type": "boolean",
                                    "title": "Puppet Agent Utilized"
                                }
                            }
                        }
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
                    },
                    "openFlowVersionOS": {
                        "ui:widget": "radio",
                        "ui:options": {
                            "inline": true
                        }
                    },
                    "osconfiguration": {
                        "enableLocalArpResponse": {
                            "ui:widget": "radio"
                        },
                        "localArpResponseCoverage": {
                            "classNames": "localarp"
                        },
                        "enableLocalIpv6ArpResponse": {
                            "ui:widget": "radio"
                        },
                        "localIpv6ArpResponseCoverage": {
                            "classNames": "localIpv6"
                        },
                        "alarmHistory": {
                            "ui:widget": "radio"
                        },
                        "puppet": {
                            "ui:widget": "radio"
                        }

                    }
                },
                formData: {
                    "templateInfo": {
                        "templateCategory": "FBOS"
                    }
                }
            }
        },

        onSubmit: function(e) {

            this.handleConfirm(e.formData)

        },

        handleConfirm: function(data) {
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

        onChange: function(totalSchema) {
            if (totalSchema.formData.osconfiguration.enableLocalArpResponse == true) {
                $(".localarp").show();
            } else if (totalSchema.formData.osconfiguration.enableLocalArpResponse == false) {
                $(".localarp").hide();
            };

            if (totalSchema.formData.osconfiguration.enableLocalIpv6ArpResponse == true) {
                $(".localIpv6").show();
            } else if (totalSchema.formData.osconfiguration.enableLocalIpv6ArpResponse == false) {
                $(".localIpv6").hide();
            };
        },
        render: function() {

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
                    <div className="modal-footer fixedspace">
                    </div>
                </div>
            )
        }
    });
    return FBOSData;
});
