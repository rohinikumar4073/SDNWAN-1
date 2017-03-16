define([
    'react',
    'jsx!components/PolicyLink',
    'jsx!components/PolicyForms/WhiteList',
    'jsx!components/PolicyForms/SchedulePolicy',
    'jsx!components/PolicyForms/VpnPolicy',
    'jsx!components/PolicyForms/DynamicBandwidth',
    'jsx!components/BootstrapButton',
    'properties'
], function(React, PolicyLink, WhiteList, SchedulePolicyForm, VpnPolicyForm, DynamicBandwidth, BootstrapButton, properties) {

    var PolicyBody = React.createClass({
        componentDidMount: function() {

            var getAllL2URL = properties.getAllL2;
            var self = this;
            $.get(getAllL2URL, function(IpResult) {
                var ipCollection = IpResult;
                var rows = [];
                $.each(IpResult, function(k, v) {
                    var data = {
                        "label": k,
                        "of13Policies": {
                            "policy": v
                        }
                    }
                    rows.push({key: k, value: data})
                })
                self.setState({getAllL2: rows});
                console.log(this.state.getAllL2);
            })
            $.get(properties.orchestratorIp + "/getAllDynamicBandWidthPolicy", function(IpResult) {
                var ipCollection = IpResult;
                var rows = [];
                $.each(IpResult, function(k, v) {
                    var data = {
                        "label": k,
                        "dynBw": v
                    }
                    rows.push({key: k, value: data})
                })
                debugger;
                self.setState({getAllDyamicBandWidth: rows});
            })
            var getAllVpnURL = properties.getAllVpn;
            var self = this;
            $.get(getAllVpnURL, function(VpnResult) {
                var vpnCollection = VpnResult;
                var rows = [];
                $.each(VpnResult, function(k, v) {
                    var data = {
                        "label": k,
                        "of13Vpns": {
                            vpn: v
                        }
                    }
                    rows.push({key: k, value: data})
                })
                self.setState({getAllVpn: rows});

                console.log(this.state.getAllVpn);
            })

        },
        getInitialState: function() {
            return {
                getAllL2: [],
                getAllDyamicBandWidth: [],
                getAllVpn: [],
                whiteListClassName: " hidden",
                "schedulePolicyClassName": " hidden",
                "vpnPolicyClassname": "hidden",
                "dynamicBandwidthClassName": "hidden",
                vpnPolicyData: {
                    "header": "Create VPN Policy",
                    formData: {},
                    buttonClassName: ""
                },
                "dynamicBandWidth": {
                    "header": "Create Dynamic Bandwidth Policy",
                    "formData": {},
                    buttonClassName: ""
                },
                "whiteListData": {
                    "header": "Create WhiteList Policy",
                    formData: {},
                    buttonClassName: ""
                }
            }
        },
        setHidden: function(linkType) {

            switch (linkType) {
                case "whiteList":
                    this.setState({"whiteListClassName": "hidden"});
                    break;
                case "schedulePolicy":
                    this.setState({"schedulePolicyClassName": "hidden"});
                    break;
                case "vpnPolicy":
                    this.setState({"vpnPolicyClassname": "hidden"});break;
                case "bandwidthPolicy":
                    this.setState({"dynamicBandwidthClassName": "hidden"});break;
                default:

            }

        },
        handleLinkClick: function(linkType) {
          debugger;
            switch (linkType) {
                case "whiteList":
                    this.setState({
                        "whiteListClassName": "modal-content policyCreate",
                        "whiteListData": {
                            "header": "Create WhiteList Policy",
                            formData: {},
                            buttonClassName: ""
                        }
                    });
                    break;
                case "schedulePolicy":
                    this.setState({"schedulePolicyClassName": "modal-content policyCreate"});break;
                case "vpnPolicy":
                    this.setState({
                        "vpnPolicyClassname": "modal-content policyCreate",
                        vpnPolicyData: {
                            "header": "Create VPN Policy",
                            formData: {},
                            buttonClassName: ""
                        }
                    });break;
                case "bandwidthPolicy":
                    this.setState({
                        "dynamicBandwidthClassName": "modal-content policyCreate",
                        "dynamicBandWidth": {
                            "header": "Create Dynamic Bandwidth Policy",
                            formData: {},
                            buttonClassName: ""
                        }
                    });break;
                default:

            }
        },
        mapperWhiteList: function(data) {
            var formatData = {}
            formatData.label = data.label;
            formatData.of13Policies = []
            if (data.of13Policies)
                data.of13Policies.policy.forEach(function(v, i) {
                    var policyData = {
                        policies: {
                            flow: {
                                attribute: "",
                                "destination": "",
                                "source": ""
                            },
                            policy: {
                                policyid: "",
                                policyverision: "",
                                priority: 0
                            },
                            pathbundle: []
                        }

                    }
                    if (v["flow-attributes"] && v["flow-attributes"]["kind"])
                        policyData.policies.flow.attribute = v["flow-attributes"]["kind"];
                    if (v["flow-spec"] && v["flow-spec"]["destination"] && v["flow-spec"]["destination"]["ip-prefix"])
                        policyData.policies.flow.destination = v["flow-spec"]["destination"]["ip-prefix"];
                    if (v["flow-spec"] && v["flow-spec"]["source"] && v["flow-spec"]["source"]["ip-prefix"])
                        policyData.policies.flow.source = v["flow-spec"]["source"]["ip-prefix"];
                    policyData.policies.policy.policyid = v["policy-id"];
                    policyData.policies.policy.policyverision = v["policy-version"];
                    policyData.policies.policy.priority = v["priority"];
                    if (v["path-bundle"])
                        v["path-bundle"].forEach(function(v, i) {
                            var pathBundle = {
                                bundleid: "",
                                contraintsdefault: "",
                                contraintsmaxpath: 0,
                                role: ""

                            }
                            pathBundle.bundleid = v["bundle-id"]
                            if (v["constraints"])
                                pathBundle.contraintsdefault = v["constraints"]["default-use"];
                            if (v["constraints"])
                                pathBundle.contraintsmaxpath = v["constraints"]["max-path-cost"];
                            pathBundle.role = v["role"];
                            policyData.policies.pathbundle.push(pathBundle)

                        })

                    formatData.of13Policies.push(policyData)

                })

            return formatData;
        },
        viewForm: function(data, linkType) {
            switch (linkType) {
                case "whiteList":
                    data = this.mapperWhiteList(data);
                    this.setState({
                        "whiteListClassName": "modal-content policyCreate",
                        "whiteListData": {
                            "header": "View WhiteList Policy",
                            formData: data,
                            buttonClassName: "hidden"
                        }
                    });break;
                case "schedulePolicy":
                    this.setState({"schedulePolicyClassName": "modal-content policyCreate"});break;
                case "vpnPolicy":
                    this.setState({
                        "vpnPolicyClassname": "modal-content policyCreate",
                        vpnPolicyData: {
                            "header": "View VPN Policy",
                            formData: data,
                            buttonClassName: "hidden"
                        }
                    });break;
                case "bandwidthPolicy":
                    this.setState({
                        "dynamicBandwidthClassName": "modal-content policyCreate",
                        "dynamicBandWidth": {
                            "header": "View Dynamic Bandwidth Policy",
                            formData: data,
                            buttonClassName: "hidden"
                        }
                    });break;
                default:

            }
        },
        render: function() {
            return (
                <div>
                    <div className="policies">
                        <div className="accordion">

                            <div className="panel-group">

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#WhiteListingPolicy" aria-expanded="true">White Listing Policy</a>
                                        </h4>
                                    </div>

                                    <div id="WhiteListingPolicy" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <div>
                                                <div className="iconPosition" onClick={this.handleLinkClick.bind(this, 'whiteList')}>
                                                    <i className="fa fa-plus-circle " aria-hidden="true"></i>
                                                    <a title="Create" data="Create" className="createWhiteList">Create</a>
                                                </div>
                                                <table className="table table-bordered policytable">
                                                    <thead>
                                                        <tr>
                                                            <th className="first-row">Policy ID</th>
                                                            <th>Action</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.getAllL2.map(function(element, i) {
                                                            return (
                                                                <tr>
                                                                    <td >{element["key"]}</td>
                                                                    <td onClick={this.viewForm.bind(this, element.value, "whiteList")}>
                                                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                                                        View
                                                                    </td>

                                                                </tr>
                                                            )
                                                        }.bind(this))
}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#bandwidthPolicy" aria-expanded="true">Bandwidth Policy</a>
                                        </h4>
                                    </div>

                                    <div id="bandwidthPolicy" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">

                                            <div>
                                                <div className="iconPosition" onClick={this.handleLinkClick.bind(this, 'bandwidthPolicy')}>
                                                    <i className="fa fa-plus-circle " aria-hidden="true"></i>
                                                    <a title="Create" data="Create" className="createWhiteList">Create</a>
                                                </div>
                                                <table className="table table-bordered policytable">
                                                    <thead>
                                                        <tr>
                                                            <th className="first-row">Policy ID</th>
                                                            <th>Action</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.getAllDyamicBandWidth.map(function(element, i) {
                                                            return (
                                                                <tr>
                                                                    <td>{element["key"]}</td>
                                                                    <td onClick={this.viewForm.bind(this, element.value, "bandwidthPolicy")}>
                                                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                                                        View
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }.bind(this))
}
                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#vpnPolicy" aria-expanded="true">VPN Policy</a>
                                        </h4>
                                    </div>

                                    <div id="vpnPolicy" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">

                                            <div>
                                                <div className="iconPosition" onClick={this.handleLinkClick.bind(this, 'vpnPolicy')}>
                                                    <i className="fa fa-plus-circle " aria-hidden="true"></i>
                                                    <a title="Create" data="Create" className="createWhiteList">Create</a>
                                                </div>
                                                <table className="table table-bordered policytable">
                                                    <thead>
                                                        <tr>
                                                            <th className="first-row">
                                                                VPN Name</th>
                                                            <th>Action</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.getAllVpn.map(function(element, i) {
                                                            return (
                                                                <tr>
                                                                    <td>{element.key}</td>
                                                                    <td onClick={this.viewForm.bind(this, element.value, "vpnPolicy")}>
                                                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                                                        View
                                                                    </td>

                                                                </tr>
                                                            )
                                                        }.bind(this))
}

                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#SchedulePolicy" aria-expanded="true">Schedule Policy</a>
                                        </h4>
                                    </div>

                                    <div id="SchedulePolicy" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">

                                            <div>
                                                <div className="iconPosition" onClick={this.handleLinkClick.bind(this, 'schedulePolicy')}>
                                                    <i className="fa fa-plus-circle " aria-hidden="true"></i>
                                                    <a title="Create" data="Create" className="createWhiteList">Create</a>

                                                </div>
                                                <table className="table table-bordered policytable">
                                                    <thead>
                                                        <tr>
                                                            <th className="first-row">Policy ID</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <DynamicBandwidth className={this.state.dynamicBandwidthClassName} header={this.state.dynamicBandWidth.header} submitMode="Save" formData={this.state.dynamicBandWidth.formData} buttonClassName={this.state.dynamicBandwidthClassName.buttonClassName} setHidden={this.setHidden}></DynamicBandwidth>

                            <VpnPolicyForm header={this.state.vpnPolicyData.header} submitMode="Save" formData={this.state.vpnPolicyData.formData} className={this.state.vpnPolicyClassname} buttonClassName={this.state.vpnPolicyClassname.buttonClassName} setHidden={this.setHidden}></VpnPolicyForm>

                            <SchedulePolicyForm header="Create Schedule  Policy" submitMode="Save" className={this.state.schedulePolicyClassName} setHidden={this.setHidden}></SchedulePolicyForm>
                            <WhiteList header={this.state.whiteListData.header} formData={this.state.whiteListData.formData} submitMode="Save" className={this.state.whiteListClassName} buttonClassName={this.state.whiteListData.buttonClassName} setHidden={this.setHidden}></WhiteList>
                        </div>
                    </div>

                </div>
            );
        }
    });

    return PolicyBody;
});
