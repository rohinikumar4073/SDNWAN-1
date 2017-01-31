define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr, Form) {
    var WhiteListForm = Form.default;
    const schema = {
        "type": "object",
        "properties": {
            "label": {
                "type": "string",
                "title": "Label"
            },
            "of13Policies": {
                "type": "object",
                "title": "OF 13 Policies",
                "properties": {
                    "policy": {
                        "type": "array",
                        "title": "Policy",
                        "items": {
                            "type": "object",
                            "properties": {
                                "flow-attributes": {
                                    "type": "object",
                                    "title": "Flow Attributes",
                                    "properties": {
                                        "kind": {
                                            "type": "string",
                                            "title": "Kind"
                                        }
                                    }
                                },
                                "flow-spec": {
                                    "type": "object",
                                    "title": "Flow Specification",
                                    "properties": {
                                        "destination": {
                                            "type": "object",
                                            "title": "Destination",
                                            "properties": {
                                                "ip-prefix": {
                                                    "type": "string",
                                                    "title": "Dstination IP Prefx"
                                                }
                                            }
                                        },
                                        "source": {
                                            "type": "object",
                                            "title": "Source",
                                            "properties": {
                                                "ip-prefix": {
                                                    "type": "string",
                                                    "title": "Source IP Prefix"
                                                }
                                            }
                                        }
                                    }
                                },
                                "policy-id": {
                                    "type": "string",
                                    "title": "Policy ID"
                                },
                                "policy-version": {
                                    "type": "string",
                                    "title": "Policy Version"
                                },
                                "priority": {
                                    "type": "integer",
                                    "title": "Priority"
                                },
                                "path-bundle": {
                                    "type": "array",
                                    "title": "Path Bundle",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "bundle-id": {
                                                "type": "string",
                                                "title": "Bundle ID"
                                            },
                                            "role": {
                                                "type": "string",
                                                "title": "Role"
                                            },
                                            "constraints": {
                                                "type": "object",
                                                "title": "Constraints",
                                                "properties": {
                                                    "default-use": {
                                                        "type": "string",
                                                        "title": "Default Use"
                                                    },
                                                    "max-path-cost": {
                                                        "type": "integer",
                                                        "title": "Maximum Path Cost"
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
    const uiSchema = {};
    const formData = {};

    var CreateWhiteList = React.createClass({
        /*  onClick : function(e){
      console.log("test");
        },*/
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },

        handleConfirm: function(data) {
            var self = this;
            $.ajax({
                url: properties.whiteListIp,
                type: 'post',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! Whitelist Policy is created")
                },
                error: function(data) {
                    toastr.error("Error! Whitelist Policy is not created")
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
                        <WhiteListForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={this.props.formData} onSubmit={this.onSubmit} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                                <button onClick={this.props.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                            </div>
                        </WhiteListForm>
                    </div>
                    <div className="modal-footer fixedspace"></div>
                </div>
            )
        }
    });
    return CreateWhiteList;

});
