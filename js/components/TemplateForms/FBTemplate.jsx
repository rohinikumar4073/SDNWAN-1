define([
    'react', 'jsx!components/BootstrapButton', 'properties', 'toastr'
], function(React, BootstrapButton, properties, toastr) {
    var SampleText = React.createClass({
        render: function() {
            return (
                <div>
                    <p>write your design code here</p>
                </div>
            )
        }
    });
    var PowerData = React.createClass({

        render: function() {
            return (
                <div className="power">
                    <div className="form-group">
                        <label for="powerSupplyModelInfo">Power Supply Model Info #{this.props.index}:</label>
                        <input type="text" className="form-control" id="powerSupplyModelInfo" onChange={this.onChangeFunction}></input>
                    </div>
                    <div className="form-group">
                        <label for="minimumRequiredActivePowerSupply">Minimum Required Active Power Supply #{this.props.index}:</label>
                        <input type="text" className="form-control" id="minimumRequiredActivePowerSupply" onChange={this.onChangeFunction}></input>
                    </div>
                </div>
            )
        }
    });

    var FanData = React.createClass({

        render: function() {
            return (
                <div className="power">
                    <div className="form-group">
                        <label for="fanModuleModel">Fan Module Model #{this.props.index}:</label>
                        <input type="text" className="form-control" id="fanModuleModel" onChange={this.onChangeFunction}></input>
                    </div>
                    <div className="form-group">
                        <label for="minimumRequiredActiveFans">Minimum Required Active Fans #{this.props.index}:</label>
                        <input type="text" className="form-control" id="minimumRequiredActiveFans" onChange={this.onChangeFunction}></input>
                    </div>
                    <div className="form-group">
                        <label for="maxHeat">Maximum Heat Dissipation (BTU/hr) #{this.props.index}:</label>
                        <input type="text" className="form-control" id="maxHeat" onChange={this.onChangeFunction}></input>
                    </div>
                </div>
            )
        }
    });

    var FBData = React.createClass({
        onChangeFunction: function(e) {

            var interType = e.target.getAttribute("name");
            if (interType && interType == "interfaceType") {
                if (e.target.value == "QSFP+ 40GbE") {
                    this.state.interface = "true";
                } else {
                    this.state.interface = "false";
                }
            }

            var power = e.target.getAttribute("id");
            if (power && power == "powerSupplySlots") {
                var val = e.target.value;
                var rows = [];
                this.state.powerSupply = [];
                for (var i = 0; i < val; i++) {
                    console.log("Power   " + i)
                    this.state.powerSupply.push(i);

                }
            }

            var fanSlots = e.target.getAttribute("id");
            if (fanSlots && fanSlots == "fanSlots") {
                var val = e.target.value;
                var rows = [];
                this.state.fan = [];
                for (var i = 0; i < val; i++) {
                    console.log("Fan   " + i)
                    this.state.fan.push(i);

                }
            }


            var demo = e.target.getAttribute("id");
            if (demo && demo == "interfaceNo") {
                var val = e.target.value;
                var rows = [];
                this.state.elements = [];
                for (var i = 0; i < val; i++) {
                    console.log("sravani   " + i)
                    this.state.elements.push(i);

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
                url: properties.templateIp + "fbTemplate",
                type: 'post',
                data: JSON.stringify(this.state.dataToBeSend),
                contentType: "application/json",
                charset: "utf-8",
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
                powerSupply: [],
                fan: [],
                elements: [],
                dataToBeSend: {

                    "airFlow": "",
                    "clei": "",
                    "consoleInterfaceInfo": {
                        "connectionType": "",
                        "consoleLabel": ""
                    },
                    "cupInfo": {
                        "description": "",
                        "type": ""
                    },
                    "dataPlaneInterfaceInfo": {
                        "connector1": "",
                        "connector2": "",
                        "connector3": "",
                        "connector4": "",
                        "interfaceLabel": "",
                        "interfaceType": ""
                    },
                    "description": "",
                    "ethernetManagementInterfacesInfo": {
                        "connectionType": "",
                        "ethernetIndentifireLabel": ""
                    },
                    "fanModulemodel": "",
                    "flashDiskSize": "",
                    "hardDiscSize": "",
                    "manufacturer": "",
                    "materialId": "",
                    "maxHeatDissipation": "",
                    "memory": "",
                    "minActiveFan": "",
                    "minActivePowerSupplie": "",
                    "model": "",
                    "nebsComplaints": "",
                    "operatingSystem": "",
                    "orderablePartNo": "",
                    "powerSupplyModelInfo": "",
                    "powerSupplyType": "",
                    "supportedTransceiver": "",
                    "switchingAsciInfo": {
                        "description": "",
                        "vendor": ""
                    },
                    "templateInfo": {
                        "lastUpdatedBy": "",
                        "name": "",
                        "revision": "",
                        "status": "",
                        "templateCategory": "",
                        "timeStamp": ""
                    },
                    "uploadFile": "",
                    "usbPortInfo": {
                        "usbInterfaceLabel": ""
                    },
                    "weight": ""

                },
                interface: ''

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
                        <button type="button" className="close" onClick={this.props.handleCancel}>&times;</button>
                        <h3>{this.props.header}</h3>
                    </div>
                    <div className="modal-body">

                        <div className="accordion">

                            <div className="panel-group">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#collapseFB1" aria-expanded="true">Template Information</a>
                                        </h4>
                                    </div>
                                    <div id="collapseFB1" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <form>
                                                <div className="form-group">
                                                    <label for="name">Name:</label>
                                                    <input type="text" className="form-control" id="name" onChange={this.onChangeFunction}></input>
                                                </div>

                                                <div className="form-group">
                                                    <label for="revision">Revision:</label>
                                                    <input type="text" className="form-control" id="revision" onChange={this.onChangeFunction}></input>
                                                </div>

                                                <div className="form-group">
                                                    <label for="lastUpdatedBy">Last Updated By:</label>
                                                    <input type="text" className="form-control" id="lastUpdatedBy" onChange={this.onChangeFunction}></input>
                                                </div>

                                                <div className="form-group">
                                                    <label for="timeStamp">Timestamp:</label>
                                                    <input type="text" disabled="true" className="form-control" id="timeStamp" defaultValue={Date()} onChange={this.onChangeFunction}></input>
                                                </div>

                                                <div className="form-group">
                                                    <label for="status">Status:</label>
                                                    <div className="radio">
                                                        <label>
                                                            <input type="radio" name="status" onChange={this.onChangeFunction}></input>Draft</label>
                                                    </div>
                                                    <div className="radio">
                                                        <label>
                                                            <input type="radio" name="status" onChange={this.onChangeFunction}></input>Available</label>
                                                    </div>
                                                    <div className="radio">
                                                        <label>
                                                            <input type="radio" name="status" onChange={this.onChangeFunction}></input>Decommissioned</label>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="templateCategory">Template Category:</label>
                                                        <input type="text" className="form-control" id="templateCategory" defaultValue="FB Template" disabled="true" onChange={this.onChangeFunction}></input>
                                                    </div>

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <form>
                                    <div className="form-group">
                                        <label for="manufacturer">Manufacturer:</label>
                                        <input type="text" className="form-control" id="manufacturer" onChange={this.onChangeFunction}></input>
                                    </div>
                                    <div className="form-group">
                                        <label for="model">Model:</label>
                                        <input type="text" className="form-control" id="model" onChange={this.onChangeFunction}></input>
                                    </div>
                                    <div className="form-group">
                                        <label for="orderablePartNumber">Orderable Part Number:</label>
                                        <input type="text" className="form-control" id="orderablePartNumber" onChange={this.onChangeFunction}></input>
                                    </div>
                                    <div className="form-group">
                                        <label for="description">Description:</label>
                                        <input type="text" className="form-control" id="description" onChange={this.onChangeFunction}></input>
                                    </div>

                                    <div className="form-group">
                                        <label for="clei">CLEI:</label>
                                        <input type="text" className="form-control" id="clei" onChange={this.onChangeFunction}></input>
                                    </div>
                                    <div className="form-group">
                                        <label for="materialId">Material ID (from Vz procurement system):</label>
                                        <input type="text" className="form-control" id="materialId" onChange={this.onChangeFunction}></input>
                                    </div>

                                    <div className="form-group">
                                        <label for="dimensions">Dimensions (WxDxH inches):</label>
                                        <input type="text" className="form-control" id="dimensions" onChange={this.onChangeFunction}></input>
                                    </div>
                                    <div className="form-group">
                                        <label for="weight">Weight (lb):</label>
                                        <input type="text" className="form-control" id="weight" onChange={this.onChangeFunction}></input>
                                    </div>

                                    <div className="form-group">
                                        <label for="airFlow">Air Flow</label>
                                        <div className="radio">
                                            <label>
                                                <input type="radio" id="airFlow" onChange={this.onChangeFunction}></input>Front-to-Back</label>

                                        </div>
                                        <div className="radio">
                                            <label>
                                                <input type="radio" id="airFlow" onChange={this.onChangeFunction}></input>Back-to-Front</label>

                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label for="powerSupply">Power Supply:
                                        </label>
                                        <div className="radio">
                                            <label>
                                                <input type="radio" name="powerSupply" onChange={this.onChangeFunction}></input>A.C</label>
                                        </div>
                                        <div className="radio">
                                            <label>
                                                <input type="radio" name="powerSupply" onChange={this.onChangeFunction}></input>D.C</label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label for="powerSupplySlots">Number of Power Supply Slots:</label>
                                        <input type="text" className="form-control" id="powerSupplySlots" onChange={this.onChangeFunction}></input>
                                    </div>
                                    {this.state.powerSupply.map(function(element, i) {
                                        return <PowerData index={i + 1}/>
                                    })
}

                                    <div className="form-group">
                                        <label for="fanSlots">Number of Fan Slots:</label>
                                        <input type="text" className="form-control" id="fanSlots" onChange={this.onChangeFunction}></input>
                                    </div>

                                    {this.state.fan.map(function(element, i) {
                                        return <FanData index={i + 1}/>
                                    })
}

                                </form>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#collapse2" aria-expanded="true">CPU Info</a>
                                        </h4>
                                    </div>
                                    <div id="collapse2" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <form>
                                                <div className="form-group">
                                                    <label for="type">Type:</label>
                                                    <div className="radio">
                                                        <label>
                                                            <input type="radio" name="type" onChange={this.onChangeFunction}></input>x86</label>

                                                    </div>
                                                    <div className="radio">
                                                        <label>
                                                            <input type="radio" name="type" onChange={this.onChangeFunction}></input>PowerPC</label>

                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label for="modelDescription">Model/Description:</label>
                                                    <input type="text" className="form-control" id="modelDescription" onChange={this.onChangeFunction}></input>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#collapse3" aria-expanded="true">Switching ASIC Info</a>
                                        </h4>
                                    </div>
                                    <div id="collapse3" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <form>
                                                <div className="form-group">
                                                    <label for="vendor">Vendor:</label>
                                                    <input type="text" className="form-control" id="vendor" onChange={this.onChangeFunction}></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="modelDescription">Model/Description:</label>
                                                    <input type="text" className="form-control" id="modelDescription" onChange={this.onChangeFunction}></input>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label for="memory">Memory (GB):</label>
                                        <input type="text" className="form-control" id="memory" onChange={this.onChangeFunction}></input>
                                    </div>
                                    <div className="form-group">
                                        <label for="flashDiskSize">Flash Disk Size (GB):
                                        </label>
                                        <input type="text" className="form-control" id="flashDiskSize" onChange={this.onChangeFunction}></input>
                                    </div>
                                    <div className="form-group">
                                        <label for="hardDiskSize">Hard Disk Size (GB):
                                        </label>
                                        <input type="text" className="form-control" id="hardDiskSize" onChange={this.onChangeFunction}></input>
                                    </div>
                                    <div className="form-group">
                                        <label for="nebsComplaint">NEBS Complaint:</label>
                                        <div className="radio">
                                            <label>
                                                <input type="radio" id="nebsComplaint" onChange={this.onChangeFunction}></input>Yes</label>

                                        </div>
                                        <div className="radio">
                                            <label>
                                                <input type="radio" id="nebsComplaint" onChange={this.onChangeFunction}></input>No</label>

                                        </div>
                                    </div>

                                </form>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#collapse4" aria-expanded="true">Data Plane Interface Info</a>
                                        </h4>
                                    </div>
                                    <div id="collapse4" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <form>
                                                <div className="form-group">
                                                    <label for="interfaceNo"># Data Plane Interfaces:</label>
                                                    <input type="text" className="form-control" id="interfaceNo" onChange={this.onChangeFunction}></input>
                                                </div>
                                                {this.state.elements.map(function(element, i) {
                                                    return <SampleText data={i}/>
                                                })
}
                                                <div className="form-group">
                                                    <label for="interfaceType">Interface Type:</label>
                                                    <div className="radio">
                                                        <label>
                                                            <input type="radio" name="interfaceType" onChange={this.onChangeFunction} vlaue="SFP+ 1/10GbE"></input>
                                                            SFP+ 1/10GbE</label>

                                                    </div>
                                                    <div className="radio">
                                                        <label>
                                                            <input type="radio" name="interfaceType" onChange={this.onChangeFunction} value="QSFP+ 40GbE"></input>QSFP+ 40GbE
                                                        </label>
                                                    </div>

                                                </div>

                                                <div className="form-group">
                                                    <label for="dataPlaneInterfaceIdentifier">Data Plane Interface Identifier/Label:</label>
                                                    <input type="text" className="form-control" id="dataPlaneInterfaceIdentifier" onChange={this.onChangeFunction}></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="breakoutConnectorDataPlaneInterfaceIdentifier1" className={this.state.interface == "true"
                                                        ? ""
                                                        : "hidden"}>Breakout Connector #1 Data Plane Interface Identifier/Label:</label>
                                                    <input type="text" className={this.state.interface == "true"
                                                        ? "form-control"
                                                        : "hidden"} id="breakoutConnectorDataPlaneInterfaceIdentifier1" onChange={this.onChangeFunction}></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="breakoutConnectorDataPlaneInterfaceIdentifier2" className={this.state.interface == "true"
                                                        ? ""
                                                        : "hidden"}>Breakout Connector #2 Data Plane Interface Identifier/Label:</label>
                                                    <input type="text" className={this.state.interface == "true"
                                                        ? "form-control"
                                                        : "hidden"} id="breakoutConnectorDataPlaneInterfaceIdentifier2" onChange={this.onChangeFunction}></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="breakoutConnectorDataPlaneInterfaceIdentifier3" className={this.state.interface == "true"
                                                        ? ""
                                                        : "hidden"}>Breakout Connector #3 Data Plane Interface Identifier/Label:</label>
                                                    <input type="text" className={this.state.interface == "true"
                                                        ? "form-control"
                                                        : "hidden"} id="breakoutConnectorDataPlaneInterfaceIdentifier3" onChange={this.onChangeFunction}></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="breakoutConnectorDataPlaneInterfaceIdentifier4" className={this.state.interface == "true"
                                                        ? ""
                                                        : "hidden"}>Breakout Connector #4 Data Plane Interface Identifier/Label:</label>
                                                    <input type="text" className={this.state.interface == "true"
                                                        ? "form-control"
                                                        : "hidden"} id="breakoutConnectorDataPlaneInterfaceIdentifier4" onChange={this.onChangeFunction}></input>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label for="ethernetManagementInterfaces">Ethernet Management Interfaces:</label>
                                        <input type="text" className="form-control" id="ethernetManagementInterfaces" onChange={this.onChangeFunction}></input>
                                    </div>
                                </form>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#collapse5" aria-expanded="true">Ethernet Management Interface Info</a>
                                        </h4>
                                    </div>
                                    <div id="collapse5" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <form>
                                                <div className="form-group">
                                                    <label for="ethernetManagementInterfaceIdentifier">Ethernet Management Interface Identifier/Label:</label>
                                                    <input type="text" className="form-control" id="ethernetManagementInterfaceIdentifier" onChange={this.onChangeFunction}></input>
                                                </div>
                                                <div className="form-group">
                                                    <label for="connectionType">Connection Type:</label>
                                                    <input type="text" className="form-control" id="connectionType" onChange={this.onChangeFunction}></input>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label for="consoleInterfaces">Console/Craft Interfaces:</label>
                                        <input type="text" className="form-control" id="consoleInterfaces" onChange={this.onChangeFunction}></input>
                                    </div>
                                </form>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#collapse6" aria-expanded="true">Console/Craft Interface Info</a>
                                        </h4>
                                    </div>
                                    <div id="collapse6" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <form>
                                                <div className="form-group">
                                                    <label for="consoleInterfaceIdentifier">Console/Craft Interface Identifier/Label:</label>
                                                    <input type="text" className="form-control" id="consoleInterfaceIdentifier" onChange={this.onChangeFunction}></input>
                                                </div>

                                                <div className="form-group">
                                                    <label for="connectionType">Connection Type:</label>
                                                    <div className="radio">
                                                        <label>
                                                            <input type="radio" id="connectionType" onChange={this.onChangeFunction}></input>RJ45</label>

                                                    </div>
                                                    <div className="radio">
                                                        <label>
                                                            <input type="radio" id="connectionType" onChange={this.onChangeFunction}></input>USB Mini-Type B
                                                        </label>
                                                    </div>

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <form>
                                    <div className="form-group">
                                        <label for="usbPorts">USB Ports:</label>
                                        <input type="text" className="form-control" id="usbPorts" onChange={this.onChangeFunction}></input>
                                    </div>
                                </form>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#collapse7" aria-expanded="true">USB Port Info</a>
                                        </h4>
                                    </div>
                                    <div id="collapse7" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <form>
                                                <div className="form-group">
                                                    <label for="usbInterfaceIdentifier">USB Interface Identifier/Label:</label>
                                                    <input type="text" className="form-control" id="usbInterfaceIdentifier" onChange={this.onChangeFunction}></input>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <form>

                                    <div className="form-group">
                                        <label for="operatingSystem">Operating System:</label>
                                        <input type="text" className="form-control" id="operatingSystem" onChange={this.onChangeFunction}></input>
                                    </div>

                                    <div className="form-group">
                                        <label for="supportedTransceivers">Supported Transceivers:</label>
                                        <input type="text" className="form-control" id="supportedTransceivers" onChange={this.onChangeFunction}></input>
                                    </div>
                                    <div className="form-group">
                                        <label for="uploadFile">Upload File: Upload</label>
                                        <input type="text" className="form-control" id="uploadFile" onChange={this.onChangeFunction}></input>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="row">
                            <div className="col-md-12 section-divider-bottom">{confirmButton}
                            </div>
                        </div>
                    </div>
                </div>
            )

        }
    });

    return FBData;

});
