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

    var OpticalSwitchData = React.createClass({
        render: function() {
            return (
                <div className="power">
                    <div className="form-group">
                        <label for="ports">Ports #{this.props.index}:</label>
                        <input type="text" className="form-control" id="ports" onChange={this.onChangeFunction}></input>
                    </div>
                    <div className="form-group">
                        <label for="switchId">Switch ID #{this.props.index}:</label>
                        <input type="text" className="form-control" id="switchId" onChange={this.onChangeFunction}></input>

                    </div>
                </div>
            )
        }
    });

    var ThresData = React.createClass({
        render: function() {
            return (
                <div className="power">
                    <div className="form-group">
                        <label for="add-thresh">Add Threshold #{this.props.index}:</label>
                        <input type="text" className="form-control" id="add-thresh" onChange={this.onChangeFunction}></input>
                    </div>
                    <div className="form-group">
                        <label for="drop-thresh">Drop Threshold #{this.props.index}:</label>
                        <input type="text" className="form-control" id="drop-thresh" onChange={this.onChangeFunction}></input>

                    </div>
                    <div className="form-group">
                        <label for="links-count">Links Count #{this.props.index}:</label>
                        <input type="text" className="form-control" id="links-count" onChange={this.onChangeFunction}></input>

                    </div>
                </div>
            )
        }
    });

    var ConnectionData = React.createClass({
        render: function() {
            return (
                <div className="power">
                    <div className="form-group">
                        <label for="a-endpoints">A Endpoints #{this.props.index}:</label>
                        <input type="text" className="form-control" id="a-endpoints" onChange={this.onChangeFunction}></input>
                    </div>
                    <div className="form-group">
                        <label for="conn-group-id">Connection Group ID #{this.props.index}:</label>
                        <input type="text" className="form-control" id="conn-group-id" onChange={this.onChangeFunction}></input>

                    </div>
                    <div className="form-group">
                        <label for="link-group-a-z">Link Group A-Z #{this.props.index}:</label>
                        <input type="text" className="form-control" id="link-group-a-z" onChange={this.onChangeFunction}></input>

                    </div>

                    <div className="form-group">
                        <label for="link-group-z-a">Link Group Z-A #{this.props.index}:</label>
                        <input type="text" className="form-control" id="link-group-z-a" onChange={this.onChangeFunction}></input>

                    </div>
                    <div className="form-group">
                        <label for="max-conn-group-bw-mbps">Max Conn Group BW Mbps #{this.props.index}:</label>
                        <input type="text" className="form-control" id="max-conn-group-bw-mbps" onChange={this.onChangeFunction}></input>

                    </div>
                    <div className="form-group">
                        <label for="min-conn-group-bw-mbps">Min Conn Group BW Mbps #{this.props.index}:</label>
                        <input type="text" className="form-control" id="min-conn-group-bw-mbps" onChange={this.onChangeFunction}></input>

                    </div>
                    <div className="form-group">
                        <label for="optical-path-options">Optical Path Options #{this.props.index}:</label>
                        <input type="text" className="form-control" id="optical-path-options" onChange={this.onChangeFunction}></input>

                    </div>
                    <div className="form-group">
                        <label for="validate">Validate:</label>
                        <div className="radio">
                            <label for="discovered">
                                <input type="radio" name="validate"></input>True</label>
                        </div>
                        <div className="radio">
                            <label for="discovered">
                                <input type="radio" name="validate"></input>False</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="z-endpoints">Z Endpoints #{this.props.index}:</label>
                        <input type="text" className="form-control" id="z-endpoints" onChange={this.onChangeFunction}></input>

                    </div>
                </div>
            )
        }
    });

    var CreateBandwidth = React.createClass({
        onChangeFunction: function(e) {

            var optical = e.target.getAttribute("id");
            if (optical && optical == "opticalSwitches") {
                var val = e.target.value;
                this.state.opticalSwitches = [];
                for (var i = 0; i < val; i++) {
                    this.state.opticalSwitches.push(i);
                }
            }

            var thres = e.target.getAttribute("id");
            if (thres && thres == "thresholds") {
                var val = e.target.value;
                this.state.thres = [];
                for (var i = 0; i < val; i++) {
                    this.state.thres.push(i);
                }
            }

            var conn = e.target.getAttribute("id");
            if (conn && conn == "dynamic-connections") {
                var val = e.target.value;
                this.state.connection = [];
                for (var i = 0; i < val; i++) {
                    this.state.connection.push(i);
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
                url: properties.getDynamicIp,
                type: 'post',
                data: JSON.stringify(this.state.dataToBeSend),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! Dynamic Bandwidth policy is created")
                },
                error: function(data) {
                    toastr.error("Error! Dynamic Bandwidth policy is not created")
                }
            });
            this.props.close();

        },
        getInitialState: function() {

            return {
                opticalSwitches: [],
                thres: [],
                connection: [],
                dataToBeSend: {

                    "bw-allocation-priority": "",
                    "dynamic-connections": [
                        {
                            "a-endpoints": "",
                            "conn-group-id": "",
                            "link-group-a-z": "",
                            "link-group-z-a": "",
                            "max-conn-group-bw-mbps": "",
                            "min-conn-group-bw-mbps": "",
                            "optical-path-options": "",
                            "validate": true,
                            "z-endpoints": ""
                        }
                    ],
                    "optical-switches": [
                        {
                            "ports": [""],
                            "switch-id": ""
                        }
                    ],
                    "thresh-settings": {
                        "thresholds": [
                            {
                                "add-thresh": 0,
                                "drop-thresh": 0,
                                "links-count": ""
                            }
                        ]
                    }

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

                            <div className="form-group">
                                <label for="label">Label:</label>
                                <input type="text" className="form-control" id="label"></input>
                            </div>

                      {/*      <div className="form-group">
                               <label for="productId">Product Id:</label>
                               <input type="text" className="form-control" id="productId"></input>
                            </div>
                            <div className="form-group ">
                                <label for="tenantId">Tenant Id:</label>
                                <input type="text" className="form-control" id="tenantId"></input>
                            </div>
                           <div className="form-group ">
                                <label for="properties">Properties:</label>
                                <input type="text" className="form-control" id="properties"></input>
                            </div>
                            <div className="form-group ">
                               <label for="vwan-domain-id">VWAN Domain ID:</label>
                               <input type="text" className="form-control" id="vwan-domain-id"></input>
                            </div>
                            <div className="form-group">
                               <label for="of-domain-id">OF Domain ID:</label>
                                <input type="text" className="form-control" id="of-domain-id"></input>
                            </div> */}

                           <div className="form-group">
                                <label for="bw-allocation-priority">Bandwidth Allocation Priority:</label>
                                <input type="text" className="form-control" id="bw-allocation-priority"></input>
                            </div>

                            <form>
                                <div className="form-group ">
                                    <label for="dyn-bw">Dynamic Bandwidth:</label>

                                </div>
                                <div className="form-group">
                                    <label for="opticalSwitches">Optical Switches:</label>
                                    <input type="text" className="form-control" id="opticalSwitches" onChange={this.onChangeFunction}></input>
                                </div>
                                {this.state.opticalSwitches.map(function(element, i) {
                                    return <OpticalSwitchData index={i + 1}/>
                                })
}

                                <div className="form-group">
                                    <label for="thresholds">Thresholds:</label>
                                    <input type="text" className="form-control" id="thresholds" onChange={this.onChangeFunction}></input>
                                </div>
                                {this.state.thres.map(function(element, i) {
                                    return <ThresData index={i + 1}/>
                                })
}

                                <div className="form-group">
                                    <label for="dynamic-connections">Dynamic Connections:</label>
                                    <input type="text" className="form-control" id="dynamic-connections" onChange={this.onChangeFunction}></input>
                                </div>
                                {this.state.connection.map(function(element, i) {
                                    return <ConnectionData index={i + 1}/>
                                })
}

                            </form>

                    {  /*      <div className="form-group ">
                                <label for="providerResourceId">Provider Resource ID:</label>
                                <input type="text" className="form-control" id="providerResourceId"></input>
                            </div>

                            <div className="form-group">
                                <label for="discovered">Discovered:</label>
                                <div className="radio">
                                    <label for="discovered">
                                        <input type="radio" name="discovered"></input>True</label>
                                </div>
                                <div className="radio">
                                    <label for="discovered">
                                        <input type="radio" name="discovered"></input>False</label>
                              </div>
                            </div>

                            <div className="form-group ">
                                <label for="orchState">Orchestrator State:</label>
                                <input type="text" className="form-control" id="orchState"></input>
                            </div>
                            <div className="form-group ">
                                <label for="reason">Reason:</label>
                                <input type="text" className="form-control" id="reason"></input>
                            </div>
                            <div className="form-group">
                                <label for="autoClean">Auto Clean</label>
                                <div className="radio">
                                    <label for="autoClean">
                                        <input type="radio" name="autoClean"></input>True</label>
                                </div>
                                <div className="radio">
                                    <label for="autoClean">
                                        <input type="radio" name="autoClean"></input>False</label>
                                </div>
                            </div> */}

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

    return CreateBandwidth;

});
