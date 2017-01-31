define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr, Form) {
    var VpnPolicyForm = Form.default;
    const schema = {
        "type": "object",
        "properties": {
            "label": {
                "type": "string",
                "title": "Label"
            },
            "of13Vpns": {
                "type": "object",
                "title": "OF 13 VPNs",
                "properties": {

                    "vpn": {
                        "type": "array",
                        "title": "VPN",
                        "items": {
                            "type": "object",
                            "properties": {
                                "ingress-match": {
                                    "type": "string",
                                    "title": "Ingress Match"
                                },
                                "vpn-name": {
                                    "type": "string",
                                    "title": "VPN Name"
                                },
                                "vpn-version": {
                                    "type": "string",
                                    "title": "VPN Version"
                                },
                                "next-hop": {
                                    "type": "array",
                                    "title": "Next Hop",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "ip-address": {
                                                "type": "string",
                                                "title": "IP Address"
                                            }
                                        }
                                    }
                                },
                                "tunnel": {
                                    "type": "array",
                                    "title": "Tunnel",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "policy-id": {
                                                "type": "string",
                                                "title": "Policy ID"
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
    var CreateVpnPolicy = React.createClass({
        /*  onClick : function(e){
      console.log("test");
        },*/
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },

        handleConfirm: function(data) {
            var self = this;
            $.ajax({
                url: properties.vpnPolicyIp,
                type: 'post',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! VPN Policy is created")
                },
                error: function(data) {
                    toastr.error("Error! VPN Policy is not created")
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
                        <VpnPolicyForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={this.props.formData} onSubmit={this.onSubmit} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                                <button onClick={this.props.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                            </div>
                        </VpnPolicyForm>
                    </div>
                    <div className="modal-footer fixedspace"></div>
                </div>
            )
        }
    });
    return CreateVpnPolicy;
});