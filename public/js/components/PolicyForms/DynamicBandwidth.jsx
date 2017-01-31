define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr, Form) {

    var BandwidthForm = Form.default;
    const schema = {
        "type": "object",
        "properties": {
            "label": {
                "type": "string",
                "title": "Label"
            },
            "dynBw": {
                "type": "object",
                "properties": {
                    "dynamic-bandwidth": {
                        "type": "object",
                        "title": "Dynamic Bandwidth",
                        "properties": {
                            "packet-optical-policies": {
                                "type": "object",
                                "title": "Packet Optical Policies",
                                "properties": {
                                    "packet-optical-policy": {
                                        "type": "array",
                                        "title": "Packet Optical Policy",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "a-endpoints": {
                                                    "type": "array",
                                                    "title": "A-Endpoints",
                                                    "items": {
                                                        "type": "object",
                                                        "properties": {
                                                            "node-id": {
                                                                "type": "string",
                                                                "title": "Node ID"
                                                            }
                                                        }
                                                    }
                                                },
                                                "z-endpoints": {
                                                    "type": "array",
                                                    "title": "Z-Endpoints",
                                                    "items": {
                                                        "type": "object",
                                                        "properties": {
                                                            "node-id": {
                                                                "type": "string",
                                                                "title": "Node ID"
                                                            }
                                                        }
                                                    }
                                                },
                                                "link-group-a-z": {
                                                    "type": "string",
                                                    "title": "Link Group A-Z"
                                                },
                                                "link-group-z-a": {
                                                    "type": "string",
                                                    "title": "Link Group Z-A"
                                                },
                                                "optical-path-options": {
                                                    "type": "string",
                                                    "title": "Optical Path Options"
                                                },
                                                "policy-id": {
                                                    "type": "string",
                                                    "title": "Policy ID"
                                                },
                                                "validate": {
                                                    "type": "string",
                                                    "title": "Validate"
                                                },
                                                "max-bandwidth": {
                                                    "type": "object",
                                                    "title": "Maximum Bandwidth",
                                                    "properties": {
                                                        "unit": {
                                                            "type": "string",
                                                            "title": "Unit"
                                                        },
                                                        "value": {
                                                            "type": "integer",
                                                            "title": "Value"
                                                        }
                                                    }
                                                },
                                                "min-bandwidth": {
                                                    "type": "object",
                                                    "title": "Minimum Bandwidth",
                                                    "properties": {
                                                        "unit": {
                                                            "type": "string",
                                                            "title": "Unit"
                                                        },
                                                        "value": {
                                                            "type": "integer",
                                                            "title": "Value"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "resource-allocation": {
                                "type": "object",
                                "title": "Resource Allocation",
                                "properties": {
                                    "threshold-settings": {
                                        "type": "object",
                                        "title": "Threshold Settings",
                                        "properties": {
                                            "allocation-priority": {
                                                "type": "string",
                                                "title": "Allocation Priority"
                                            },
                                            "threshold": {
                                                "type": "array",
                                                "title": "Threshold",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "add-thresh": {
                                                            "type": "integer",
                                                            "title": "Add Threshold"
                                                        },
                                                        "drop-thresh": {
                                                            "type": "integer",
                                                            "title": "Drop Threshold"
                                                        },
                                                        "links-count": {
                                                            "type": "string",
                                                            "title": "Links Count"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "switches": {
                                "type": "object",
                                "title": "Switches",
                                "properties": {
                                    "switch": {
                                        "type": "array",
                                        "title": "Switch",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "ports": {
                                                    "type": "array",
                                                    "title": "Ports",
                                                    "items": {
                                                        "type": "string"
                                                    }
                                                },
                                                "switch-id": {
                                                    "type": "string",
                                                    "title": "Switch ID"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    const uiSchema = {};
    const formData = {};



    var CreateBandwidth = React.createClass({
        /*  onClick : function(e){
      console.log("test");
        },*/
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },

        handleConfirm: function(data) {
            var self = this;
            $.ajax({
                url: properties.getDynamicIp,
                type: 'post',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! Dynamic Bandwidth Policy is created")
                },
                error: function(data) {
                    toastr.error("Error! Dynamic Bandwidth Policy is not created")
                }

            });
            this.props.close();
        },
        getInitialState: function() {
            return {}
        },
        render: function() {
            return (
                <div className={"modal-content " + this.props.className}>
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.props.handleCancel}>
                            &times;
                        </button>
                        <h3>{this.props.header}</h3>
                    </div>
                    <div className="modal-body">
                        <BandwidthForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={this.props.formData} onSubmit={this.onSubmit} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                                <button onClick={this.props.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                            </div>
                        </BandwidthForm>
                    </div>
                    <div className="modal-footer fixedspace"></div>
                </div>
            )
        }
    });
    return CreateBandwidth;

});
