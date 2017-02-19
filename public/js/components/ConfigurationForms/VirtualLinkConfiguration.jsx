define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr, Form) {
    var VirtualLinkConfiguration = Form.default;

    var VirtualLinkConfigurationClass = React.createClass({
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },
        handleConfirm: function(data) {
            var self = this;
            this.props.linkService.setVirtualLink(this.props.configurationEvents,this.props.currentNode);
            this.handleCancel();
        },
        getInitialState: function() {
            return {
                schema: {
                    "title": "Create Virtual Link",
                    "type": "array",
                    "items": {
                      "type":"object",
                        "properties": {

                            "vLan": {
                                "type": "string",
                                "title": "V LAN Tag"
                            },
                            "forwardingBoxData": {
                                "title": "FB Data",
                                "type": "object",
                                "properties": {
                                  "arp-ipv4":{
                                    "type":"string",
                                    "title":"ARP-IPV4"
                                  },  "arp-ipv6":{
                                      "type":"string",
                                      "title":"ARP-IPV6"
                                    },"tp-id":{
                                      "type":"string",
                                      "title":"TP ID"
                                    }
                                }
                            },
                            "hostData": {
                                "title": "Host Data",
                                "type": "object",
                                "properties": {
                                  "arp-ipv4":{
                                    "type":"string",
                                    "title":"ARP-IPV4"
                                  },  "arp-ipv6":{
                                      "type":"string",
                                      "title":"ARP-IPV6"
                                    },"tp-id":{
                                      "type":"string",
                                      "title":"TP ID"
                                    },"vpn-name":{
                                      "type":"string",
                                      "title":"VPN Name"
                                    }
                                }
                            }
                        }
                    }

                },
                uiSchema: {},
                formData: {}
            }
        },

        handleCancel: function() {
            $('#pageModal ').modal('hide')
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
                            <VirtualLinkConfiguration schema={this.state.schema} uiSchema={this.state.uiSchema} formData={this.state.formData} onSubmit={this.onSubmit} onError={errors => {
                                console.log("i am errors" + errors);
                            }} onSubmit={this.onSubmit}>
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
