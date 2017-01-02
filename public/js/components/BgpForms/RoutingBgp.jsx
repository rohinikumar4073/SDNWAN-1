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

    var CreateRoutingBgp = React.createClass({
        onChangeFunction: function(e) {

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
                url: properties.bgpRoutingIp,
                type: 'post',
                data: JSON.stringify(this.state.dataToBeSend),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                  console.log("Sravani   "+data)
                    toastr.success("Success! Routing Policy is created")
                },
                error: function(data) {
                    toastr.error("Error! Routing Policy is not created")
                }
            });
            this.props.close();
        },
        getInitialState: function() {
            return {
                dataToBeSend: {
                    "appName": "",
                    "hostName": "",
                    "asn": "",
                    "ipv4Ip": "",
                    "ipv6Ip": "",
                    "primary": ""
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
                                    <label for="appName">Routing App Name:</label>
                                    <input type="text" className="form-control" id="appName" onChange={this.onChangeFunction}></input>
                                </div>

                                <div className="form-group">
                                    <label for="hostName">Host Name:</label>
                                    <input type="text" className="form-control" id="hostName" onChange={this.onChangeFunction}></input>
                                </div>
                                <div className="form-group ">
                                    <label for="asn">ASN:</label>
                                    <input type="text" className="form-control" id="asn" onChange={this.onChangeFunction}></input>
                                </div>
                                <div className="form-group ">
                                    <label for="ipv4Ip">IPv4 Management IP:</label>
                                    <input type="text" className="form-control" id="ipv4Ip" onChange={this.onChangeFunction}></input>
                                </div>
                                <div className="form-group">
                                    <label for="ipv6Ip">IPv6 Management inspect:</label>
                                    <input type="text" className="form-control" id="ipv6Ip" onChange={this.onChangeFunction}></input>
                                </div>

                                <div className="form-group">
                                    <label for="primary">Primary/Backup:</label>
                                    <input type="text" className="form-control" id="primary" onChange={this.onChangeFunction}></input>
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
    return CreateRoutingBgp;
});
