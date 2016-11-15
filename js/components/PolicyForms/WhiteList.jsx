define([
    'react', 'jquery', 'properties','toastr'
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

    var CreateWhiteList = React.createClass({
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
                url: properties.whiteListIp,
                type: 'post',
                data: JSON.stringify(this.state.dataToBeSend),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! Whitelist policy is created")
                },
                error: function(data) {
                    toastr.error("Error! Whitelist policy is not created")
                }
          });
          this.props.close();



        },
        getInitialState: function() {

            return {
                dataToBeSend: {
                    "flow-attributes": {
                        "bandwidth-limit": -1,
                        "kind": "",
                        "traffic-priority": -1
                    },
                    "flow-spec": {
                        "destination": {
                            "ip-prefix": "",
                            "ipPrefix": ""
                        },
                        "source": {
                            "ip-prefix": "",
                            "ipPrefix": ""
                        }
                    },
                    "path-bundle": [
                        {
                            "bundle-id": "",
                            "bundleId": "",
                            "constraints": {
                                "default-use": "",
                                "defaultUse": "",
                                "element-policy": [
                                    {
                                        "id": "",
                                        "type": "",
                                        "use-override": ""
                                    }
                                ],
                                "max-path-cost": "",
                                "maxPathCost": "",
                                "segment-policy": [{}]
                            },
                            "role": ""
                        }
                    ],
                    "policy-id": "",
                    "priority": -1
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
                            <BootstrapButton
                            onClick={this.handleConfirm}
                            className="btn  btn-primary btn-sm" data="Create New">
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

                            <div className="well well-sm ">Configure Packet Policy</div>

                            <div className="form-group">
                                <label for="policyId">Policy ID:</label>
                                <input type="text" className="form-control" id="policyId"></input>
                            </div>

                            <div className="form-group ">
                                <label for="policyPripority">Policy Pripority:</label>
                                <input type="text" className="form-control" id="policyPripority"></input>
                            </div>

                            <div className="well well-sm">Flow Spec</div>

                            <div className="form-group ">

                                <label for="source">Source:</label>
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="source"></input>Prefix</label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="source"></input>Node</label>
                                </div>
                            </div>

                            <div className="form-group">

                                <label for="destination">Destination:</label>
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="destination"></input>Prefix</label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="destination"></input>Node</label>
                                </div>
                            </div>

                            <div className="form-group ">
                                <label for="ipProtocol">IP Protocol:</label>
                                <input type="text" className="form-control" id="ipProtocol"></input>
                            </div>

                            <div className="form-group">
                                <label for="sourcePort">Source Port Range:</label>
                                <input type="text" className="form-control" id="sourcePort"></input>
                            </div>

                            <div className="form-group">
                                <label for="destPort">Destination Port Range:</label>
                                <input type="text" className="form-control" id="destPort"></input>
                            </div>

                            <div className="well well-sm ">Flow Attributes</div>

                            <div className="form-group">

                                <div className="radio">
                                    <label for="unidirec">
                                        <input type="radio" name="unidirec"></input>Unidirectional</label>
                                </div>
                                <div className="radio">
                                    <label for="unidirec">
                                        <input type="radio" name="unidirec"></input>Bidirectional</label>
                                </div>
                            </div>

                            <div className="form-group ">
                                <label for="trafficPolicy">Traffic Policy:</label>
                                <input type="text" className="form-control" id="trafficPolicy"></input>
                            </div>

                            <div className="form-group ">
                                <label for="bandwidthLimit">Bandwidth Limit:</label>
                                <input type="text" className="form-control" id="bandwidthLimit"></input>
                            </div>

                            <div className="accordion">
                                <div className="panel-group">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" href="#viewPathbundles" aria-expanded="true">View Pathbundles</a>
                                            </h4>
                                        </div>
                                        <div id="viewPathbundles" className="panel-collapse collapse in" role="tabpanel">
                                            <div className="panel-body">
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>Bundle ID</th>
                                                            <th>Role</th>
                                                            <th>Default use</th>

                                                            <th>ID</th>
                                                            <th>Type</th>
                                                            <th>Use Override</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" href="#createPathBundle" aria-expanded="true">Create Pathbundle</a>
                                            </h4>
                                        </div>
                                        <div id="createPathBundle" className="panel-collapse collapse in" role="tabpanel">
                                            <div className="panel-body">
                                                <div className="row">
                                                    <div className="polconstraint">
                                                        <form>
                                                            <div className="form-group ">
                                                                <label for="bundleId">Bundle ID:</label>
                                                                <input type="text" className="form-control" id="bundleId"></input>
                                                            </div>
                                                            <div className="form-group ">
                                                                <label for="role">Role:</label>
                                                                <input type="text" className="form-control" id="role_type"></input>
                                                            </div>
                                                            <div className="well well-sm ">Constraints</div>
                                                            <div className="form-group ">
                                                                <label for="defaultUse">Default Use:</label>
                                                                <input type="text" className="form-control" id="defaultUse"></input>
                                                            </div>
                                                            <div className="well well-sm ">Element Policy</div>

                                                            <div className="form-group">
                                                                <label for="id">ID:</label>
                                                                <input type="text" className="form-control" id="id"></input>
                                                                <label for="type">Type:</label>
                                                                <input type="text" className="form-control" id="type"></input>
                                                                <label for="useOverride">Use Override:</label>
                                                                <input type="text" className="form-control" id="useOverride"></input>

                                                            </div>

                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

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

    return CreateWhiteList;

});
