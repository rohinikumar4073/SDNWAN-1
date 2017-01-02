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
    var TunnelData = React.createClass({
        render: function() {
            return (
                <div className="power">
                    <div className="form-group">
                        <label for="policy-id">Policy ID #{this.props.index}:</label>
                        <input type="text" className="form-control" id="policy-id" onChange={this.onChangeFunction}></input>
                    </div>

                </div>
            )
        }
    });
    var NextHopData = React.createClass({
        render: function() {
            return (
                <div className="power">
                    <div className="form-group">
                        <label for="ip-address">IP Address #{this.props.index}:</label>
                        <input type="text" className="form-control" id="ip-address" onChange={this.onChangeFunction}></input>
                    </div>
                </div>
            )
        }
    });
    var CreateVpnPolicy = React.createClass({
        onChangeFunction: function(e) {
            var tunnel = e.target.getAttribute("id");
            if (tunnel && tunnel == "tunnel") {
                var val = e.target.value;
                this.state.tunnelData = [];
                for (var i = 0; i < val; i++) {
                    this.state.tunnelData.push(i);
                }
            }
            var nextHop = e.target.getAttribute("id");
            if (nextHop && nextHop == "next-hop") {
                var val = e.target.value;
                this.state.nextHopData = [];
                for (var i = 0; i < val; i++) {
                    this.state.nextHopData.push(i);
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
                url: properties.vpnPolicyIp,
                type: 'post',
                data: JSON.stringify(this.state.dataToBeSend),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! VPN policy is created")
                },
                error: function(data) {
                    toastr.error("Error! Dynamic VPN is not created")
                }
            });
            this.props.close();
        },
        getInitialState: function() {
            return {
                tunnelData: [],
                nextHopData: [],
                dataToBeSend: {

                    "vpn": [
                        {
                            "ingress-match": "",
                            "next-hop": [
                                {
                                    "ip-address": ""
                                }
                            ],
                            "tunnel": [
                                {
                                    "policy-id": ""
                                }
                            ],
                            "vpn-name": "",
                            "vpn-version": ""
                        }
                    ]

                }
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
                                  <label for="label">Label:</label>
                                  <input type="text" className="form-control" id="label"></input>
                              </div>
                                <div className="form-group">
                                    <label for="ofl3-vpns">OF 13 VPNs:</label>
                                </div>
                                <div className="form-group">
                                    <label for="vpn-name">VPN Name:</label>
                                    <input type="text" className="form-control" id="vpn-name"></input>
                                </div>
                                <div className="form-group ">
                                    <label for="vpn-version">VPN Version:</label>
                                    <input type="text" className="form-control" id="vpn-version"></input>
                                </div>
                                <div className="form-group ">
                                    <label for="ingress-match">Ingress Match:</label>
                                    <input type="text" className="form-control" id="ingress-match"></input>
                                </div>
                                <div className="form-group">
                                    <label for="tunnel">Tunnel:</label>
                                    <input type="text" className="form-control" id="tunnel" onChange={this.onChangeFunction}></input>
                                </div>
                                {this.state.tunnelData.map(function(element, i) {
                                    return <TunnelData index={i + 1}/>
                                })
}
                                <div className="form-group">
                                    <label for="next-hop">Next Hop:</label>
                                    <input type="text" className="form-control" id="next-hop" onChange={this.onChangeFunction}></input>
                                </div>
                                {this.state.nextHopData.map(function(element, i) {
                                    return <NextHopData index={i + 1}/>
                                })
}
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
    return CreateVpnPolicy;
});
