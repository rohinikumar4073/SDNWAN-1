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

    var ScheduleConnection = React.createClass({
        render: function() {
            return (
                <div className="power">

                    <div className="form-group">
                        <label for="conn-group-id">Connection Group ID #{this.props.index}:</label>
                        <input type="text" className="form-control" id="conn-group-id" onChange={this.onChangeFunction}></input>
                    </div>
                    <div className="form-group">
                        <label for="type">Type #{this.props.index}:</label>
                        <input type="text" className="form-control" id="type" onChange={this.onChangeFunction}></input>
                    </div>
                    <div className="form-group">
                        <label for="a-endpoints">A Endpoints #{this.props.index}:</label>
                        <input type="text" className="form-control" id="a-endpoints" onChange={this.onChangeFunction}></input>
                    </div>
                    <div className="form-group">
                        <label for="z-endpoints">Z Endpoints #{this.props.index}:</label>
                        <input type="text" className="form-control" id="z-endpoints" onChange={this.onChangeFunction}></input>
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
                        <label for="min_bw">Minimum Bandwidth #{this.props.index}:</label>
                        <input type="text" className="form-control" id="min_bw" onChange={this.onChangeFunction}></input>
                    </div>
                    <div className="form-group">
                        <label for="max_bw">Maximum Bandwidth #{this.props.index}:</label>
                        <input type="text" className="form-control" id="max_bw" onChange={this.onChangeFunction}></input>
                    </div>
                    <div className="form-group">
                        <label for="verify">Verify #{this.props.index}:</label>
                        <div className="radio">
                            <label for="discovered">
                                <input type="radio" name="verify"></input>True</label>
                        </div>
                        <div className="radio">
                            <label for="discovered">
                                <input type="radio" name="verify"></input>False</label>
                        </div>
                    </div>
                </div>
            )
        }
    });

    var CreateSchedulePolicy = React.createClass({
        onChangeFunction: function(e) {

            var con = e.target.getAttribute("id");
            if (con && con == 'conn') {
                var val = e.target.value;
                this.state.scheduleConnection = [];
                for (var i = 0; i < val; i++) {
                    this.state.scheduleConnection.push(i);
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
                scheduleConnection: [],
                dataToBeSend: {
                    "service_id": "",
                    "schedule": {
                        "start_date_time": "",
                        "end_date_time": ""
                    },
                    "connections": [
                        {
                            "conn-grp-id": "",
                            "type": "",
                            "a-endpoints": "",
                            "z-endpoints": "",
                            "min_bw": "",
                            "max_bw": "",
                            "link_group_a_z": "",
                            "link_group_z_a": "",
                            "verify": ""
                        }
                    ],
                    "policies": {
                        "policy_id": "",
                        "flow_spec": {
                            "source_prefix": "",
                            "destination_prefix": ""
                        },
                        "flow_attributes": {
                            "bidirectional": ""
                        },
                        "path_bundle_list": {
                            "bundle_id": "",
                            "role": "",
                            "constraints": {
                                "max_path_cost": "",
                                "element_policy": {
                                    "id": "",
                                    "type": "",
                                    "use": ""
                                }
                            }
                        }
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
                            <div className="form-group">
                                <label for="service_id">Service ID:</label>
                                <input type="text" className="form-control" id="service_id"></input>
                            </div>
                            <div className="well well-sm ">Schedule</div>
                            <form>
                                <div className="form-group">
                                    <label for="start_date_time">Start Date Time:</label>
                                    <input type="text" className="form-control" id="start_date_time" onChange={this.onChangeFunction}></input>
                                </div>

                                <div className="form-group">
                                    <label for="end_date_time">End Date Time:</label>
                                    <input type="text" className="form-control" id="end_date_time" onChange={this.onChangeFunction}></input>
                                </div>
                                <div className="form-group">
                                    <label for="conn">Connections:</label>
                                    <input type="text" className="form-control" id="conn" onChange={this.onChangeFunction}></input>
                                </div>
                                {this.state.scheduleConnection.map(function(element, i) {
                                    return <ScheduleConnection index={i + 1}/>
                                })
}
                                <div className="form-group">
                                    <label for="policyId">Policy ID:</label>
                                    <input type="text" className="form-control" id="policyId"></input>
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
    return CreateSchedulePolicy;
});
