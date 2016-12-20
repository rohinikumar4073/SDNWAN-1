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

    var CreateBgpSession = React.createClass({
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
                url: properties.vpnBgpSessionIp,
                type: 'post',
                data: JSON.stringify(this.state.dataToBeSend),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
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
                    "vpnName": "",
                    "ipv4": {
                        "ipv4Enable":"",
                        "routerNameIpv4": "",
                        "portIpv4": "",
                        "ipAddressIpv4": "",
                        "bfdIpv4": "",
                        "multiplierIpv4": "",
                        "minIntervalIpv4": ""
                    },
                    "ipv6": {
                        "ipv6Enable":"",
                        "routerNameIpv6": "",
                        "portIpv6": "",
                        "ipAddressIpv6": "",
                        "bfdIpv6": "",
                        "multiplierIpv6": "",
                        "minIntervalIpv6": ""
                    }
                },
                ipv4isEnabled: ''
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
                                  <div className="well well-sm ">IPv4</div>
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
                                <div className="form-group">
                                    <label for="routerNameIpv4" className={this.state.ipv4isEnabled == "true"
                                        ? ""
                                        : "hidden"}>Router Name:</label>
                                    <input type="text"  id="routerNameIpv4" className={this.state.ipv4isEnabled == "true"
                                        ? "form-control"
                                        : "hidden"}></input>
                                </div>
                                <div className="form-group">
                                    <label for="portIpv4" className={this.state.ipv4isEnabled == "true"
                                        ? ""
                                        : "hidden"}>Port:</label>
                                    <input type="text"  id="portIpv4" className={this.state.ipv4isEnabled == "true"
                                        ? "form-control"
                                        : "hidden"}></input>
                                </div>
                                <div className="form-group ">
                                    <label for="ipAddressIpv4" className={this.state.ipv4isEnabled == "true"
                                        ? ""
                                        : "hidden"}>IP Address:</label>
                                    <input type="text"  id="ipAddressIpv4" className={this.state.ipv4isEnabled == "true"
                                        ? "form-control"
                                        : "hidden"}></input>
                                </div>

                                <div className="form-group">
                                    <label for="bfdIpv4" className={this.state.ipv4isEnabled == "true"
                                        ? ""
                                        : "hidden"}>BFD:</label>
                                    <input type="text" id="bfdIpv4" onChange={this.onChangeFunction} className={this.state.ipv4isEnabled == "true"
                                        ? "form-control"
                                        : "hidden"}></input>
                                </div>

                                <div className="form-group">
                                    <label for="multiplierIpv4">Multiplier:</label>
                                    <input type="text" className="form-control" id="multiplierIpv4" onChange={this.onChangeFunction}></input>
                                </div>
                                <div className="form-group">
                                    <label for="minIntervalIpv4">Minimum Interval:</label>
                                    <input type="text" className="form-control" id="minIntervalIpv4" onChange={this.onChangeFunction}></input>
                                </div>

                                <div className="well well-sm ">IPv6</div>
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
                                <div className="form-group">
                                    <label for="routerNameIpv6" className={this.state.ipv6isEnabled == "true"
                                        ? ""
                                        : "hidden"}>Router Name:</label>
                                    <input type="text" className="form-control" id="routerNameIpv6" onChange={this.onChangeFunction} className={this.state.ipv6isEnabled == "true"
                                        ? "form-control"
                                        : "hidden"}></input>
                                </div>
                                <div className="form-group ">
                                    <label for="portIpv6" className={this.state.ipv6isEnabled == "true"
                                        ? ""
                                        : "hidden"}>Port:</label>
                                    <input type="text" className="form-control" id="portIpv6" onChange={this.onChangeFunction} className={this.state.ipv6isEnabled == "true"
                                        ? "form-control"
                                        : "hidden"}></input>
                                </div>
                                <div className="form-group ">
                                    <label for="ipAddressIpv6" className={this.state.ipv6isEnabled == "true"
                                        ? ""
                                        : "hidden"}>IP Address:</label>
                                    <input type="text" className="form-control" id="ipAddressIpv6" onChange={this.onChangeFunction} className={this.state.ipv6isEnabled == "true"
                                        ? "form-control"
                                        : "hidden"}></input>
                                </div>

                                <div className="form-group">
                                    <label for="bfdIpv6" className={this.state.ipv6isEnabled == "true"
                                        ? ""
                                        : "hidden"}>BFD:</label>
                                    <input type="text" className="form-control" id="bfdIpv6" onChange={this.onChangeFunction} className={this.state.ipv6isEnabled == "true"
                                        ? "form-control"
                                        : "hidden"}></input>
                                </div>

                                <div className="form-group">
                                    <label for="multiplierIpv6">Multiplier:</label>
                                    <input type="text" className="form-control" id="multiplierIpv6" onChange={this.onChangeFunction}></input>
                                </div>
                                <div className="form-group">
                                    <label for="minIntervalIpv6">Minimum Interval:</label>
                                    <input type="text" className="form-control" id="minIntervalIpv6" onChange={this.onChangeFunction}></input>
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
    return CreateBgpSession;
});
