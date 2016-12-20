define([
    'react', 'jquery', 'properties', 'toastr'
], function(React, $, properties, toastr) {

    var BootstrapButton = React.createClass({
        render: function() {
            return (
                <a {...this.props} href="javascript:;" role="button" className={(this.props.className || '')}>
                    {this.props.data}
                </a>
            );
        }
    });

    var CreateVpnBgp = React.createClass({
        onChangeFunction: function(e) {

            var ipv4Type = e.target.getAttribute("name");
            if (ipv4Type && ipv4Type == "ipv4Enable") {
                if (e.target.value == "Enable") {
                    this.setState({ipv4isEnabled: "true"});
                } else {
                    this.setState({ipv4isEnabled: "false"});
                }
            }

            var ipv6Type = e.target.getAttribute("name");
            if (ipv6Type && ipv6Type == "ipv6Enable") {
                if (e.target.value == "Enable") {
                    this.setState({ipv6isEnabled: "true"});
                } else {
                    this.setState({ipv6isEnabled: "false"});
                }
            }

            var restartType = e.target.getAttribute("name");
            if (restartType && restartType == "restartEnable") {
                if (e.target.value == "Enable") {
                    this.setState({restartisEnabled: "true"});
                } else {
                    this.setState({restartisEnabled: "false"});
                }
            }

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
                url: properties.vpnBgpIp,
                type: 'post',
                data: JSON.stringify(this.state.dataToBeSend),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! VPN is created")
                },
                error: function(data) {
                    toastr.error("Error! VPN is not created")
                }
            });
            this.props.close();
        },
        getInitialState: function() {
            return {
                dataToBeSend: {
                    "vpnName": "",
                    "vlan": {
                        "ipv4Enable": "",
                        "ipv4": "",
                        "ipv6Enable": "",
                        "ipv6": ""
                    },
                    "asn": {
                        "holdTime": "",
                        "restartEnable": "",
                        "restart": "",
                        "restartTime": "",
                        "routeTime": "",
                        "md5Key": ""
                    }
                },
                ipv4isEnabled: '',
                ipv6isEnabled: '',
                restartisEnabled: ''
            }
        },
        keyPressFunction: function(event) {
            var keycode = (event.keyCode
                ? event.keyCode
                : event.which);
            if (keycode == '13') {
                this.handleConfirm();
            }
            event.stopPropagation()
        },
        render: function() {
            confirmButton = (
                <BootstrapButton onClick={this.handleConfirm} className="btn  btn-primary btn-sm" data="Create New">
                    {this.props.confirm}
                </BootstrapButton>
            );
            return (
                <div className={"modal-content " + this.props.className}>
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.props.handleCancel}>
                            &times;</button>
                        <h3>{this.props.header}</h3>
                    </div>
                    <div className="modal-body">
                        <div>
                            <form>
                                <div className="form-group">
                                    <label for="vpnName">VPN Name:</label>
                                    <input type="text" className="form-control" id="vpnName"></input>
                                </div>
                                <div className="well well-sm ">VLAN</div>
                                <div className="form-group">
                                    <label for="ipv4">IPv4:</label>
                                    <div className="form-group">
                                        <div className="radio">
                                            <label for="ipv4Enable">
                                                <input type="radio" name="ipv4Enable" value="Enable" onChange={this.onChangeFunction}></input>Enable</label>
                                        </div>
                                        <div className="radio">
                                            <label for="ipv4Enable">
                                                <input type="radio" name="ipv4Enable" value="Disable" onChange={this.onChangeFunction}></input>Disable</label>
                                        </div>
                                    </div>
                                    <input type="text" placeholder="Enter /27 Network" id="ipv4" onChange={this.onChangeFunction} className={this.state.ipv4isEnabled == "true"
                                        ? "form-control"
                                        : "hidden"}></input>
                                </div>

                                <div className="form-group ">
                                    <label for="ipv6">IPv6:</label>
                                    <div className="form-group">
                                        <div className="radio">
                                            <label for="ipv6Enable">
                                                <input type="radio" name="ipv6Enable" value="Enable" onChange={this.onChangeFunction}></input>Enable</label>
                                        </div>
                                        <div className="radio">
                                            <label for="ipv6Enable">
                                                <input type="radio" name="ipv6Enable" value="Disable" onChange={this.onChangeFunction}></input>Disable</label>
                                        </div>
                                    </div>
                                    <input type="text" placeholder="Enter /64 Network" id="ipv6" onChange={this.onChangeFunction} className={this.state.ipv6isEnabled == "true"
                                        ? "form-control"
                                        : "hidden"}></input>
                                </div>
                                <div className="well well-sm ">ASN</div>
                                <div className="form-group ">
                                    <label for="holdTime">Hold Time:</label>
                                    <input type="text" className="form-control" id="holdTime" defaultValue="20" onChange={this.onChangeFunction}></input>
                                </div>
                                <div className="form-group">
                                    <label for="restart">Graceful Restart:</label>
                                    <div className="form-group">
                                        <div className="radio">
                                            <label for="restartEnable">
                                                <input type="radio" name="restartEnable" value="Enable" onChange={this.onChangeFunction}></input>Enable</label>
                                        </div>
                                        <div className="radio">
                                            <label for="restartEnable">
                                                <input type="radio" name="restartEnable" value="Disable" onChange={this.onChangeFunction}></input>Disable</label>
                                        </div>
                                    </div>
                                    <input type="text" id="restart" onChange={this.onChangeFunction} className={this.state.restartisEnabled == "true"
                                        ? "form-control"
                                        : "hidden"}></input>
                                </div>

                                <div className="form-group">
                                    <label for="restartTime" className={this.state.restartisEnabled == "true"
                                        ? ""
                                        : "hidden"}>Restart Time:</label>
                                    <input type="text" className={this.state.restartisEnabled == "true"
                                        ? "form-control"
                                        : "hidden"} id="restartTime" onChange={this.onChangeFunction} defaultValue="6"></input>
                                </div>
                                <div className="form-group">
                                    <label for="routeTime" className={this.state.restartisEnabled == "true"
                                        ? ""
                                        : "hidden"}>Stale Route Time:</label>
                                    <input type="text" className={this.state.restartisEnabled == "true"
                                        ? "form-control"
                                        : "hidden"} id="routeTime" onChange={this.onChangeFunction} defaultValue="120"></input>
                                </div>
                                <div className="form-group">
                                    <label for="md5Key">MD5 Key:</label>
                                    <input type="text" className="form-control" id="md5Key" onChange={this.onChangeFunction}></input>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div class="row">
                            <div class="col-md-12 section-divider-bottom">
                                {confirmButton}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
    return CreateVpnBgp;
});
