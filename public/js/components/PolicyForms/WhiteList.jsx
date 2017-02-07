define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr, Form) {
    var WhiteListForm = Form.default;
    const schema = {
        "type": "object",
        "required": ["label"],

        "properties": {
            "label": {
                "type": "string",
                "title": "Label"
            },
            "of13Policies": {
                "type": "array",
                "title": "OF 13 Policies",
                "items": {
                    "type": "object",
                    "properties": {
                        "policies": {
                            "type": "object",
                            "title": "Policies",
                            "properties": {
                                "flow": {
                                    "type": "object",
                                    "title": "Flow",
                                    "properties": {
                                        "attribute": {
                                            "type": "string",
                                            "title": "Attribute - Kind"
                                        },

                                        "source": {
                                            "type": "string",
                                            "title": "Source"
                                        },
                                        "destination": {
                                            "type": "string",
                                            "title": "Destination"
                                        }
                                    }
                                },
                                "policy": {
                                    "type": "object",
                                    "title": "Policy",
                                    "properties": {
                                        "policyid": {
                                            "type": "string",
                                            "title": "Policy ID"
                                        },
                                        "policyverision": {
                                            "type": "string",
                                            "title": "Policy Version"
                                        },
                                        "priority": {
                                            "type": "integer",
                                            "title": "Priority"
                                        }
                                    }
                                },
                                "pathbundle": {
                                    "type": "array",
                                    "title": "Path Bundle",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "bundleid": {
                                                "type": "string",
                                                "title": "Bundle ID"
                                            },
                                            "role": {
                                                "type": "string",
                                                "title": "Role"
                                            },
                                            "contraintsdefault": {
                                                "type": "string",
                                                "title": "Contraints default use"
                                            },
                                            "contraintsmaxpath": {
                                                "type": "integer",
                                                "title": "Contraints max path cost"
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
        "of13Policies": {
            "ui:options": {
                "orderable": false
            },
            "items": {
                "policies": {
                    "classNames": "policiesCreate",
                    "flow": {
                        "attribute": {
                            "classNames": "col-sm-6"
                        },
                        "specification": {
                            "classNames": "col-sm-6"
                        },
                        "source": {
                            "classNames": "col-sm-6"
                        },
                        "destination": {
                            "classNames": "col-sm-6"
                        }
                    },

                    "policy": {
                        "policyid": {
                            "classNames": "col-sm-6"
                        },
                        "policyverision": {
                            "classNames": "col-sm-6"
                        },
                        "priority": {
                            "classNames": "col-sm-6"
                        }
                    },

                    "pathbundle": {
                        "classNames": "pathbundleCreate",
                        "ui:options": {
                            "orderable": false
                        },
                        "items": {
                            "bundleid": {
                                "classNames": "col-sm-6"
                            },
                            "role": {
                                "classNames": "col-sm-6"
                            },
                            "contraintsdefault": {
                                "classNames": "col-sm-6"
                            },
                            "contraintsmaxpath": {
                                "classNames": "col-sm-6"
                            }
                        }
                    }

                }
            }
        }
    };
    const formData = {};

    var CreateWhiteList = React.createClass({
        /*  onClick : function(e){
      console.log("test");
        },*/
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },
        mapperFunction: function(data) {
            var formatData = {}
            formatData.label = data.label;
            formatData.of13Policies = {
                policy: []
            };
            if(data.of13Policies)
            data.of13Policies.forEach(function(v, i) {
                var policyData = {
                    "flow-attributes": {
                        "kind": ""
                    },
                    "flow-spec": {
                        "destination": {
                            "ip-prefix": ""
                        },
                        "source": {
                            "ip-prefix": ""
                        }
                    },
                    "path-bundle": [],
                    "policy-id": "",
                    "policy-version": "",
                    "priority": 0
                }

                policyData["flow-attributes"]["kind"] = (v.policies.flow.attribute);
                policyData["flow-spec"]["destination"]["ip-prefix"] = v.policies.flow.destination;
                policyData["flow-spec"]["source"]["ip-prefix"] = v.policies.flow.source;
                policyData["policy-id"] = v.policies.policy.policyid;
                policyData["policy-version"] = v.policies.policy.policyverision;
                policyData["priority"] = v.policies.policy.priority;
                if(v.policies.pathbundle)
                v.policies.pathbundle.forEach(function(v, i) {
                    var pathBundle = {
                        "bundle-id": "",
                        "constraints": {
                            "default-use": "",
                            "max-path-cost": 0
                        },
                        "role": ""
                    }
                    pathBundle["bundle-id"] = v.bundleid;
                    pathBundle["constraints"]["default-use"] = v.contraintsdefault;
                    pathBundle["constraints"]["max-path-cost"] = v.contraintsmaxpath;
                    pathBundle["role"] = v.role;
                    policyData["path-bundle"].push(pathBundle)

                })

                formatData.of13Policies.policy.push(policyData)

            })

            return formatData;
        },
        handleConfirm: function(data) {
            var formattedData = this.mapperFunction(data)
            var self = this;
            $.ajax({
                url: properties.whiteListIp,
                type: 'post',
                data: JSON.stringify(formattedData),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! Whitelist Policy is created");
                    this.props.setHidden("whiteList");

                },
                error: function(data) {
                    toastr.error("Error! Whitelist Policy is not created")
                }

            });
        },
        getInitialState: function() {
            return {}
        },handleCancel:function(){
          this.props.setHidden("whiteList");

        },
        componentDidMount:function(){
this.props.formData={};
        },
        render: function() {
            return (
                <div className={this.props.className} >
                    <div className="modal-header">
                        <h3>{this.props.header}<button type="button" className="close" onClick={this.handleCancel}>
                            &times;
                        </button></h3>

                    </div>
                    <div className="modal-body">
                        <WhiteListForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={this.props.formData} onSubmit={this.onSubmit} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                                <button onClick={this.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
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
