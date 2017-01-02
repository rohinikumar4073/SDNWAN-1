define([
    'react',
    'jsx!components/BootstrapButton',
    'properties',
    'toastr',
    'react-jsonschema-form',
    'jsx!components/Template',
     'jsx!components/DetailsElement'
], function(React, BootstrapButton, properties, toastr, Form, Template, DetailsElement) {
    var DetInsCreForm = Form.default;
    var DetInstanceFb = React.createClass({

        getInitialState: function() {

            return {
                collection: this.props.collection,
                schema: {
                    "title": "Device information",
                    "type": "object",

                    "properties": {
                        "site_id": {
                            "type": "string",
                            "title": "Site Id"
                        },
                        "fb_device_name": {
                            "type": "string",
                            "title": "FB Device Name"
                        },
                        "fb_groupid": {
                            "type": "string",
                            "title": "FB Group ID"
                        },
                        "forwarding_box_template": {
                            "type": "string",
                            "title": "FB Template"
                        },
                        "lldpEnablment": {
                            "type": "string",
                            "title": "LLDP Enablement",
                            "minLength": 3
                        },
                        "location_desc": {
                            "type": "string",
                            "title": "Location Description"
                        },
                        "network_domain": {
                            "type": "string",
                            "title": "Network Domain"
                        },
                        "dataPlaceConfiguration": {
                            "type": "object",
                            "title": "Data Place Configuration",
                            "properties": {
                                "adminCost": {
                                    "type": "string",
                                    "title": "Admin Cost"
                                },
                                "adminState": {
                                    "type": "string",
                                    "title": "Admin State"
                                },
                                "dacCableUtilized": {
                                    "type": "string",
                                    "title": "DAC Cable Utilized"
                                },
                                "dacUtilized": {
                                    "type": "string",
                                    "title": "DAC Utilized"
                                },
                                "description": {
                                    "type": "string",
                                    "title": "Description"
                                },
                                "enableFrameSupport": {
                                    "type": "string",
                                    "title": "Enable Frame Support"
                                },
                                "speed": {
                                    "type": "string",
                                    "title": "Speed"
                                },
                                "transceiverType": {
                                    "type": "string",
                                    "title": "Transceiver Type"
                                }
                            }
                        },
                        "management_configuration": {
                            "type": "object",
                            "title": "Management Configuration",
                            "properties": {
                                "agent_cert_name": {
                                    "type": "string",
                                    "title": "Agent Cert Name"
                                },
                                "default_gatewayIp": {
                                    "type": "string",
                                    "title": "Default Gateway IP"
                                },
                                "dns_name": {
                                    "type": "string",
                                    "title": "DNS Name"
                                },
                                "dns_serverIp": {
                                    "type": "string",
                                    "title": "Dns Server IP"
                                },
                                "ip_address": {
                                    "type": "string",
                                    "title": "IP Address"
                                },
                                "management_interface": {
                                    "type": "string",
                                    "title": "Management Interface"
                                }
                            }
                        },
                        "openFlowInfo": {
                            "type": "object",
                            "title": "Open Flow Information",
                            "properties": {
                                "allowPassiveCon": {
                                    "type": "string",
                                    "title": "Allow Passive Con"
                                },
                                "connectionProtocol": {
                                    "type": "string",
                                    "title": "Connection Protocol"
                                },
                                "dataPathId": {
                                    "type": "string",
                                    "title": "Data Path ID"
                                },
                                "failMode": {
                                    "type": "string",
                                    "title": "Fail Mode"
                                },
                                "masterControllerIp": {
                                    "type": "string",
                                    "title": "Master Controller IP"
                                },
                                "protocolVersion": {
                                    "type": "string",
                                    "title": "Protocol Version"
                                },
                                "slaveControllerIp": {
                                    "type": "string",
                                    "title": "Slave Controller IP"
                                }
                            }
                        },
                        "operatingSystemConfiguration": {
                            "type": "object",
                            "title": "Operating System Configuration",
                            "properties": {
                                "alarmHighTemp": {
                                    "type": "string",
                                    "title": "Alarm High Temp"
                                },
                                "alarmHistory": {
                                    "type": "string",
                                    "title": "Alarm History"
                                },
                                "alarmLowTemp": {
                                    "type": "string",
                                    "title": "Alarm Low Temp"
                                },
                                "fb_sfp_interval": {
                                    "type": "string",
                                    "title": "FB SFP Interval"
                                },
                                "interfceFlowCounterInt": {
                                    "type": "string",
                                    "title": "Interfce Flow Counter Int"
                                },
                                "enableLocalArpResponse": {
                                    "type": "string",
                                    "title": "Local ARP Response"
                                },
                                "localArpResponseCoverage": {
                                    "type": "string",
                                    "title": "Local ARP Response Coverage"
                                },
                                "enableLocalIpv6ArpResponse": {
                                    "type": "string",
                                    "title": "Local IPv6 ARP Response"
                                },
                                "localIpv6ArpResponseCoverage": {
                                    "type": "string",
                                    "title": "Local IPv6 ARP Response Coverage"
                                }
                            }
                        }
                    }
                },
                uiSchema: {
                    "ui:readonly": true
                },
                formData: {
                    "location_desc": "Test"
                }
            }
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
                        <DetInsCreForm schema={this.state.schema} uiSchema={this.state.uiSchema} formData={this.props.collection}>
                            <div>
                                <button type="submit" className="btn  btn-primary btn-sm fixedbt hideLink">Create New
                                </button>
                            </div>
                        </DetInsCreForm>

                    </div>

                </div>

            )
        }
    });
    return DetInstanceFb;
});
