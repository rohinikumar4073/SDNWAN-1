define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr, Form) {
    var SchedulePolicyForm = Form.default;
    const schema = {
        "type": "object",
        "properties": {
            "schedulePolicyInput": {
                "type": "object",
                "title":"Schedule Policy",
                "properties": {
                    "service_id": {
                        "type": "string",
                        "title": "Service ID"
                    },
                    "schedule": {
                        "type": "object",
                        "title": "Schedule",
                        "properties": {
                            "start_date_time": {
                                "type": "string",
                                "title": "Start Date Time"
                            },
                            "end_date_time": {
                                "type": "string",
                                "title": "End Date Time"
                            }
                        }
                    },
                    "connections": {
                        "type": "array",
                        "title": "Connections",
                        "items":{
                          "type":"object",
                        "properties": {
                            "conn-grp-id": {
                                "type": "string",
                                "title": "Connection Group ID"
                            },
                            "type": {
                                "type": "string",
                                "title": "Type"
                            },
                            "a-endpoints": {
                                "type": "string",
                                "title": "A Endpoints"
                            },
                            "z-endpoints": {
                                "type": "string",
                                "title": "Z Endpoints"
                            },
                            "min_bw": {
                                "type": "string",
                                "title": "Minimum Bandwidth"
                            },
                            "max_bw": {
                                "type": "string",
                                "title": "Maximum Bandwidth"
                            },
                            "link_group_a_z": {
                                "type": "string",
                                "title": "Link Group A-Z"
                            },
                            "link_group_z_a": {
                                "type": "string",
                                "title": "Link Group Z-A"
                            },
                            "verify": {
                                "type": "boolean",
                                "title": "Verify"
                            }
                        }
                      }
                    },
                    "policies": {
                        "type": "object",
                        "title": "Policies",
                        "properties": {
                            "policy_id": {
                                "type": "string",
                                "title": "Policy ID"
                            },
                            "flow_spec": {
                                "type": "object",
                                "title": "Flow Specification",
                                "properties": {
                                    "source_prefix": {
                                        "type": "string",
                                        "title": "Source Prefix"
                                    },
                                    "destination_prefix": {
                                        "type": "string",
                                        "title": "Destination Prefix"
                                    }
                                }
                            },
                            "flow_attributes": {
                                "type": "object",
                                "title": "Flow Attributes",
                                "properties": {
                                    "bidirectional": {
                                        "type": "boolean",
                                        "title": "Bidirectional"
                                    }
                                }
                            },
                            "path_bundle_list": {
                                "type": "object",
                                "title": "Path Bundle List",
                                "properties": {
                                    "bundle_id": {
                                        "type": "string",
                                        "title": "Bundle ID"
                                    },
                                    "Role": {
                                        "type": "string",
                                        "title": "Role"
                                    },
                                    "constraints": {
                                        "type": "object",
                                        "title": "Constraints",
                                        "properties": {
                                            "max_path_cost": {
                                                "type": "integer",
                                                "title": "Maximum Path Cost"
                                            },
                                            "element_policy": {
                                                "type": "object",
                                                "title": "Element Policy",
                                                "properties": {
                                                    "id": {
                                                        "type": "string",
                                                        "title": "ID"
                                                    },
                                                    "type": {
                                                        "type": "string",
                                                        "title": "Type"
                                                    },
                                                    "use": {
                                                        "type": "string",
                                                        "title": "Use"
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
        }
    };

    const uiSchema = {
      "schedulePolicyInput":{
        "connections":{
          "verify":{
            "ui:widget":"radio"
          }
        }

      }

    };
    const formData = {

    };
    var CreateSchedulePolicy= React.createClass({
        /*  onClick : function(e){
      console.log("test");
        },*/
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },

        handleConfirm: function(data) {
            var self = this;
            $.ajax({
                url: properties.schedulePolicyIp,
                type: 'post',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! Schedule Policy is created");
                    this.props.setHidden("schedulePolicy");
                },
                error: function(data) {
                    toastr.error("Error! Schedule Policy is not created")
                }

            });
        },handleCancel:function(){
          this.props.setHidden("schedulePolicy");

        },
        getInitialState: function() {
            return {}
        },
        render: function() {
            return (
                <div className={this.props.className}>
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.handleCancel}>
                            &times;
                        </button>
                        <h3>{this.props.header}</h3>
                    </div>
                    <div className="modal-body">
                    <SchedulePolicyForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={formData} onSubmit={this.onSubmit} onError={errors => {
                        console.log("i am errors" + errors);
                    }} onSubmit={this.onSubmit}>
                        <div>
                            <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                            <button onClick={this.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                        </div>
                    </SchedulePolicyForm>
                    </div>
                    <div className="modal-footer fixedspace"></div>
                </div>
            )
        }
    });
    return CreateSchedulePolicy;
});
