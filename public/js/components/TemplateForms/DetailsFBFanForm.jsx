define([
    'react', 'jsx!components/BootstrapButton', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, BootstrapButton, properties, toastr, Form) {
    var DetFBFan = Form.default;
    const schema = {
        "type": "object",
        "properties": {
            "templateInfo": {
                "type": "object",
                "title": "Fan Information",
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
                    "status": {
                        "type": "string",
                        "title": "Status",
                        "enum": ["Draft", "Available", "Decommissioned"]
                    },
                    "templateCategory": {
                        "type": "string",
                        "title": "Template Category"
                    },
                    "timeStamp": {
                        "type": "string",
                        "title": "Time Stamp"
                    }
                }
            },
            "manufacturer": {
                "type": "string",
                "title": "Manufacturer"
            },
            "orderablePartNo": {
                "type": "string",
                "title": "Orderable Part Number"
            },
            "description": {
                "type": "string",
                "title": "Description"
            },
            "clei": {
                "type": "string",
                "title": "CLEI"
            },
            "materialId": {
                "type": "string",
                "title": "Material ID (from Vz procurement system)"
            },
            "airFlow": {
                "type": "string",
                "title": "Air Flow",
                "enum": ["Front-to-Back", "Back-to-Front"]
            }
        }
    };
    function MyCustomWidget() {
        return <input defaultValue={Date()} className="form-control" disabled="true"/>;
    }
    const uiSchema = {
        "ui:readonly": true,
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
        "airFlow": {
            "classNames": "greeting",
            "ui:widget": "radio",
            "ui:options": {
                "inline": true
            }
        }
    };

    const formData = {
        "templateInfo": {
            "templateCategory": "Fan Template"
        }
    };

    var DetFbFan = React.createClass({


        getInitialState: function() {

            return {  collection: this.props.collection}

        },
        componentDidMount: function() {
            this.setState({collection: this.props.collection});
        },
        componentWillUnmount: function() {
            //this.serverRequest.abort();
        },

        handleCancel: function() {
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        },
        render: function() {

            return (
                <div className={this.props.className}>
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.props.handleCancel}>
                            &times;
                        </button>
                        <h3>{this.props.header}</h3>
                    </div>
                    <div className="modal-body">

                        <DetFBFan schema={schema} uiSchema={uiSchema} formData={this.props.collection}>
                            <div>
                                <button type="submit" className="btn  btn-primary btn-sm fixedbt hideLink">Create New
                                </button>
                            </div>
                        </DetFBFan>

                    </div>

                </div>

            )
        }
    });
    return DetFbFan;
});
