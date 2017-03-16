define([
    'react',
    'jquery',
    'properties',
    'toastr',
    'react-jsonschema-form',
    'sockjs',
    'agGrid',
    'reactCellRendererFactory',
    'reactFilterFactory',
    'axios',
    'stomp'
], function(React, $, properties, toastr, Form, SockJS, agGridReact, reactCellRendererFactory, reactFilterFactory, axios) {
    var VlanForm = Form.default;
    const schema = {
        "type": "object",
        required: ["name", "asn","ipv4","ingressMatch"],
        "properties": {
            "name": {
                "type": "string",
                "title": "Name"
            },
            "asn": {
                "type": "array",
                "title": "ASN",
                "items": {
                    "type": "integer"
                }
            },
            "ipv4": {
                "type": "array",
                "title": "IPv4",
                "items": {
                    "type": "string"
                }
            },
            "ipv6": {
                "type": "array",
                "title": "IPv6",
                "items": {
                    "type": "string"
                }
            },
            "ingressMatch": {
                "type": "string",
                "title": "Ingress Match",
                "enum": ["Destination only", "Source Destination"]
            }
        }
    };
    const uiSchema = {

        "ipv4": {
            "ui:options": {
                "orderable": false
            }
        },
        "ipv6": {
            "ui:options": {
                "orderable": false
            }
        },
        "asn": {
            "ui:options": {
                "orderable": false
            }
        }
    };
    const formData = {
      "asn": [
    ""
  ],
  "ipv4": [
""
],
"ipv6": [
""
]
    };
    var AgGridReactGRID = agGridReact.AgGridReact;
    var VlanBody = React.createClass({
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },
        handleConfirm: function(data) {
            var self = this;
            console.log(data)
            axios.post(properties.nodeIp + '/saveList', {
                "key": "vpnData",
                "value": data
            }).then(function(response) {
              var rowData=self.state.rowData;
              debugger;
              rowData.push(data)
              self.setState({rowData:rowData})
              self.state.gridOptions.api.refreshRows(rowData)
              //for aggrid to refresh view use setRowdata()
              self.state.gridOptions.api.setRowData(rowData)
                toastr.success("VPN added successfully");
            });

        },
        handleLinkClick:function(){
          this.setState({"modalClassName":"rightModal modal-content"})
        },
        handleCancel:function(){
          this.setState({"modalClassName":"hidden"})

        },
        getInitialState: function() {
            return {
              "modalClassName": "hidden",

                showToolPanel: true,
                quickFilterText: null,
                height: 50,
                gridOptions: {},
                icons: {
                    columnRemoveFromGroup: '<i class="fa fa-remove"/>',
                    filter: '<i class="fa fa-filter"/>',
                    sortAscending: '<i class="fa fa-long-arrow-down"/>',
                    sortDescending: '<i class="fa fa-long-arrow-up"/>',
                    groupExpanded: '<i class="fa fa-minus-square-o"/>',
                    groupContracted: '<i class="fa fa-plus-square-o"/>',
                    columnGroupOpened: '<i class="fa fa-minus-square-o"/>',
                    columnGroupClosed: '<i class="fa fa-plus-square-o"/>'
                },
                scrollbarWidth: function() {
                    return ($(window).width() * 100) / 120 - 50;
                },
                columnDefs: [
                    {
                        headerName: 'Name',
                        field: "name",
                        width: 350,
                        pinned: true
                    }, {
                        headerName: 'ASN',
                        field: "asn",
                        width: 350,
                        pinned: true
                    }, {
                        headerName: 'IPv4',
                        field: "ipv4",
                        width: 350,
                        pinned: true
                    }, {
                        headerName: 'IPv6',
                        field: "ipv6",
                        width: 350,
                        pinned: true
                    }, {
                        headerName: 'Ingress Match',
                        field: "ingressMatch",
                        width: 350,
                        pinned: true
                    }
                ],
                rowData: []
            }

        },
        onShowGrid(show) {
            this.setState({showGrid: show});
        },
        componentDidMount: function() {
            var self = this;
            var height = $(window).height() / 2;
            $(".inventoryGrid").height(height)
            axios.get(properties.nodeIp + "/getList?key=vpnData").then(function(response) {
                self.setState({rowData: response.data});
                self.state.gridOptions.api.sizeColumnsToFit()
            })
        },
        onQuickFilterText(event) {
            this.setState({quickFilterText: event.target.value});
        },
        validate: function(formData, error) {
            var ipv4 = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$/;
            var ipv6 = /^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$/;
            formData["ipv4"].forEach(function(item, index) {
                if (!formData["ipv4"][index].match(ipv4)) {
                    error["ipv4"].addError("Invalid IPv4 CIDR Address Format");
                }
            })
            debugger;
            if(formData["ipv6"] && formData["ipv6"].length>0)
            formData["ipv6"].forEach(function(item, index) {
                if (!formData["ipv6"][index].match(ipv6)) {
                    error["ipv6"].addError("Invalid IPv6 CIDR Address format");
                }
            })
            return error;
        },
        render: function() {
            var gridTemplate;
            var bottomHeaderTemplate;
            var topHeaderTemplate;
            gridTemplate = (
                <div className="ag-fresh inventoryGrid">
                    <AgGridReactGRID gridOptions={this.state.gridOptions} showToolPanel={this.state.showToolPanel} quickFilterText={this.state.quickFilterText} icons={this.state.icons} columnDefs={this.state.columnDefs} rowData={this.state.rowData} suppressRowClickSelection="true" enableColResize="true" enableSorting="true" enableFilter="true" groupHeaders="true" rowHeight="35" debug="true"/>
                </div>
            );
            topHeaderTemplate = (
                <div className="form-group">
                    <input type="text" className="form-control gridFilter" onChange={this.onQuickFilterText.bind(this)} placeholder="Type text to filter..."/>
                </div>
            );
            return (
                <div className={this.props.className}>
                    <div className="configuration">
                      <div id="accordion">
                          <div className="panel-group">
                              <div className="panel panel-default">
                                  <div className="panel-heading">
                                    <h4 className="panel-title">
                                      <a data-toggle="collapse" href="#viewVpnList" aria-expanded="true">VPN List</a>
                                    </h4>
                                  </div>
                                  <div id="viewVpnList" className="panel-collapse collapse in" role="tabpanel">
                                    <div className="iconPosition createVPN"  onClick={this.handleLinkClick} >
                                        <i className="fa fa-plus-circle " aria-hidden="true"></i>
                                        <a title="Create" data="Create" className="createWhiteList">Create</a>
                                    </div>
                                      <div className="panel-body">
                                        <div>
                                            {topHeaderTemplate}
                                            {bottomHeaderTemplate}
                                            {gridTemplate}
                                        </div>
                                      </div>
                                  </div>

                              </div>
                          </div>
                      </div>

                      <div className={ this.state.modalClassName}>
                          <div className="modal-header">
                              <button type="button" className="close" onClick={this.handleCancel}>
                                  &times;
                              </button>
                              <h3>Create VPN </h3>
                          </div>
                          <div className="modal-body">
                            <VlanForm schema={schema} uiSchema={uiSchema} formData={formData} validate={this.validate} onError={errors => {
                                console.log("i am errors" + errors);
                            }} onSubmit={this.onSubmit}>
                                <div>
                                    <button type="submit" className="btn  btn-primary btn-sm" data="Save">Save</button>
                                      <button onClick={this.handleCancel} className="btn  btn-default btn-sm" data="Save">Cancel</button>

                                </div>
                            </VlanForm>

                          </div>
                      </div>

                      </div>
                </div>
            )
        }
    });
    return VlanBody;
});
