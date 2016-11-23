define([
    'react', 'jsx!components/BootstrapButton', 'properties', 'toastr'
], function(React, BootstrapButton, properties, toastr) {

    var FormData = React.createClass({
        onChangeFunction: function(e) {
            debugger;
            var parnetId = e.target.getAttribute("data-parentdata")
            if (parnetId) {
                if (this.state.dataToBeSend[parnetId]) {
                    this.state.dataToBeSend[parnetId][e.target.id] = e.target.value;
                } else {
                    this.state.dataToBeSend[parnetId][e.target.id] = e.target.value;
                }
            } else {
                this.state.dataToBeSend[e.target.id] = e.target.value;
            }

            this.setState({dataToBeSend: this.state.dataToBeSend});
        },
        handleConfirm: function() {
            var self = this;
            $.ajax({
                url: properties.templateIp + "CreateInstances",
                type: 'post',
                data: JSON.stringify(this.state.dataToBeSend),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! A new instance is successfully created")
                },
                error: function(data) {
                    toastr.error("Error! Could not create an instance")
                    if (self.props.onConfirm) {
                        self.props.onConfirm(self.state.dataToBeSend);
                    }
                }

            });
            this.props.close();

        },
        getInitialState: function() {

            return {
                dataToBeSend: {
                    "dataPlaceConfiguration": {
                        "adminCost": "",
                        "adminState": "",
                        "dacCableUtilized": "",
                        "dacUtilized": "",
                        "description": "",
                        "enableFrameSupport": "",
                        "speed": "",
                        "transceiverType": ""
                    },
                    "fb_device_name": "",
                    "fb_groupid": "",
                    "forwarding_box_template": "",
                    "lldpEnablment": "",
                    "location_desc": "",
                    "management_configuration": {
                        "agent_cert_name": "",
                        "default_gatewayIp": "",
                        "dns_name": "",
                        "dns_serverIp": "",
                        "ip_address": "",
                        "management_interface": ""
                    },
                    "network_domain": "",
                    "openFlowInfo": {
                        "allowPassiveCon": "",
                        "connectionProtocol": "",
                        "dataPathId": "",
                        "failMode": "",
                        "masterControllerIp": "",
                        "protocolVersion": "",
                        "slaveControllerIp": ""
                    },
                    "operatingSystemConfiguration": {
                        "alarmHighTemp": "",
                        "alarmHistory": "",
                        "alarmLowTemp": "",
                        "enableLocalArpResponse": "",
                        "enableLocalIpv6ArpResponse": "",
                        "fb_sfp_interval": "",
                        "interfceFlowCounterInt": "",
                        "localArpResponseCoverage": "",
                        "localIpv6ArpResponseCoverage": "",
                        "puppetAgentUtilizad": ""
                    },
                    "site_id": ""
                }
            }

        },

        handleCancel: function() {
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        },

        render: function() {
            confirmButton = (
                <BootstrapButton onClick={this.handleConfirm} className="btn  btn-primary btn-sm" data="Create New">
                    {this.props.confirm}
                </BootstrapButton>
            );

            return (
                <div className={this.props.className}>
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.props.handleCancel}>
                            &times;
                        </button>
                        <h3>{this.props.header}</h3>
                    </div>
                    <div className="modal-body">

                        <div id="accordion">
                            <div className="panel-group">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#collapseFB" aria-expanded="true">Device Information</a>
                                        </h4>
                                    </div>
                                    <div id="collapseFB" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <form>
                                                <div className="form-group">
                                                    <label for="site_id">Site ID:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="site_id"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="fb_devicename">FB Device Name:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="fb_device_name"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="fb_groupid">FB Group ID:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="fb_groupid"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="fb_template">FB Template:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="forwarding_box_template"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="lldpEnablment">LLDP Enablement:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="lldpEnablment"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="locationDesc">Location Description:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="location_desc"></input>
                                                </div>

                                                <div className="form-group">
                                                    <label for="network_domain">Network Domain:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="network_domain"></input>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#collapse1" aria-expanded="true">Data Place Configuration</a>
                                        </h4>
                                    </div>
                                    <div id="collapse1" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <form>
                                                <div className="form-group">
                                                    <label for="adminCost">Admin Cost:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="adminCost" data-parentData="dataPlaceConfiguration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="adminState">Admin State:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="adminState" data-parentData="dataPlaceConfiguration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="dacCableUtilized">DAC Cable Utilized:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="dacCableUtilized" data-parentData="dataPlaceConfiguration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="dacUtilized">DAC Utilized:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="dacUtilized" data-parentData="dataPlaceConfiguration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="description">Description:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="description" data-parentData="dataPlaceConfiguration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="enableFrameSupport">Enable Frame Support:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="enableFrameSupport" data-parentData="dataPlaceConfiguration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="speed">Speed:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="speed" data-parentData="dataPlaceConfiguration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="transceiverType">Transceiver Type:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="transceiverType" data-parentData="dataPlaceConfiguration"></input>
                                                </div>

                                            </form>
                                        </div>

                                    </div>
                                </div>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#collapse3" aria-expanded="true">Management Configuration
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="collapse3" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <form>
                                                <div className="form-group">
                                                    <label for="agentCertName">Agent Cert Name:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="agent_cert_name" data-parentData="management_configuration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="default_gatewayIp">Default Gateway IP:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="default_gatewayIp" data-parentData="management_configuration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="dns_name">DNS Name:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="dns_name" data-parentData="management_configuration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="dns_serverIp">Dns Server IP:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="dns_serverIp" data-parentData="management_configuration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="ip_address">IP Address:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="ip_address" data-parentData="management_configuration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="management_interface">Management Interface:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="management_interface" data-parentData="management_configuration"></input>
                                                </div>

                                            </form>
                                        </div>

                                    </div>
                                </div>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#collapse4" aria-expanded="true">Open Flow Information</a>
                                        </h4>
                                    </div>
                                    <div id="collapse4" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <form>
                                                <div className="form-group">
                                                    <label for="allowPassiveCon">Allow Passive Con:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="allowPassiveCon" data-parentData="openFlowInfo"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="connectionProtocol">Connection Protocol:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="connectionProtocol" data-parentData="openFlowInfo"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="dataPathId">Data Path ID:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="dataPathId" data-parentData="openFlowInfo"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="failMode">Fail Mode:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="failMode" data-parentData="openFlowInfo"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="masterControllerIp">Master Controller IP:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="masterControllerIp" data-parentData="openFlowInfo"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="protocolVersion">Protocol Version:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="protocolVersion" data-parentData="openFlowInfo"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="slaveControllerIp">Slave Controller IP:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="slaveControllerIp" data-parentData="openFlowInfo"></input>
                                                </div>

                                            </form>
                                        </div>

                                    </div>
                                </div>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#collapse5" aria-expanded="true">Operating System Configuration</a>
                                        </h4>
                                    </div>
                                    <div id="collapse5" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <form>

                                                <div className="form-group">
                                                    <label for="alarmHighTemp">Alarm High Temp:</label>
                                                    <input type="text" className="form-control" id="alarmHighTemp" data-parentData="operatingSystemConfiguration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="alarmHistory">Alarm History:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="alarmHistory" data-parentData="operatingSystemConfiguration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="alarmLowTemp">Alarm Low Temp:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="alarmLowTemp" data-parentData="operatingSystemConfiguration"></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="fb_sfp_interval">FB SFP Interval:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="fb_sfp_interval" data-parentData="operatingSystemConfiguration"></input>
                                                </div>

                                                <div className="form-group">
                                                    <label for="interfceFlowCounterInt">Interfce Flow Counter Int:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="interfceFlowCounterInt" data-parentData="operatingSystemConfiguration"></input>
                                                </div>

                                                <div className="form-group">
                                                    <label for="localArpResponse">Local ARP Response:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="localArpResponse" data-parentData="operatingSystemConfiguration"></input>
                                                </div>

                                                <div className="form-group">
                                                    <label for="localArpResponseCoverage">Local ARP Response Coverage:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="localArpResponseCoverage" data-parentData="operatingSystemConfiguration"></input>
                                                </div>

                                                <div className="form-group">
                                                    <label for="localIpv6ArpResponse">Local IPv6 ARP Response:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="localIpv6ArpResponse" data-parentData="operatingSystemConfiguration"></input>
                                                </div>

                                                <div className="form-group">
                                                    <label for="localIpv6ArpResponseCoverage">Local IPv6 ARP Response Coverage:</label>
                                                    <input onChange={this.onChangeFunction} type="text" className="form-control" id="localIpv6ArpResponseCoverage" data-parentData="operatingSystemConfiguration"></input>
                                                </div>

                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <div className="row">
                            <div className="col-md-12 section-divider-bottom">
                                {confirmButton}
                            </div>
                        </div>
                    </div>
                </div>

            )
        }
    });
    return FormData;
});
