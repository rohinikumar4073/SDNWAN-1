define([
    'react', 'jsx!components/PolicyLink', 'jsx!components/PolicyForms/WhiteList', 'jsx!components/PolicyForms/SchedulePolicy','jsx!components/PolicyForms/VpnPolicy','jsx!components/PolicyForms/DynamicBandwidth','jsx!components/BootstrapButton', 'properties'
], function(React, PolicyLink, WhiteList,SchedulePolicyForm,VpnPolicyForm, DynamicBandwidth,BootstrapButton, properties) {

    var PolicyBody = React.createClass({
        componentDidMount: function() {

            var getAllL2URL = properties.getAllL2;
            var self = this;
            $.get(getAllL2URL, function(IpResult) {
                var ipCollection = IpResult;
                var rows = [];
                $.each(IpResult, function(k, v) {
                    rows.push(v[0])
                })
                self.setState({getAllL2: rows});
                console.log(this.state.getAllL2);
            })

            var getAllVpnURL = properties.getAllVpn;
            var self = this;
            $.get(getAllVpnURL, function(VpnResult) {
                var vpnCollection = VpnResult;
                var rows = [];
                self.setState({getAllVpn: VpnResult});
                console.log(this.state.getAllVpn);
            })

        },
        getInitialState: function() {
            return {getAllL2: [], getAllVpn: [],whiteListClassName:" hidden","schedulePolicyClassName":" hidden","vpnPolicyClassname":"hidden"}
        },setHidden:function(linkType){

            switch (linkType) {
              case "whiteList":
              this.setState({"whiteListClassName":"hidden"})

                break;
                case "schedulePolicy":
                this.setState({"schedulePolicyClassName":"hidden"})
                  break;
                  case "vpnPolicy":
                  this.setState({"vpnPolicyClassname":"hidden"})
                    break;
                    case "bandwidthPolicy":
                    this.setState({"dynamicBandwidthClassName":"hidden"})
                      break;
              default:

            }

        },
        handleLinkClick:function(linkType){
          switch (linkType) {
            case "whiteList":
            this.setState({"whiteListClassName":"modal-content policyCreate"})
              break;
              case "schedulePolicy":
              this.setState({"schedulePolicyClassName":"modal-content policyCreate"})
                break;
                case "vpnPolicy":
                this.setState({"vpnPolicyClassname":"modal-content policyCreate"})
                  break;
                  case "bandwidthPolicy":
                  this.setState({"dynamicBandwidthClassName":"modal-content policyCreate"})
                    break;
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
                                                <div className="iconPosition" onClick={this.handleLinkClick.bind(this,'whiteList')}>
                                                    <i className="fa fa-plus-circle " aria-hidden="true"></i>
                                                    <a title="Create" data="Create" className="createWhiteList" >Create</a>
                                                </div>
                                                <table className="table table-bordered policytable">
                                                    <thead>
                                                        <tr>
                                                            <th>Policy ID</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.getAllL2.map(function(element, i) {
                                                            return (
                                                                <tr>
                                                                    <td>{element["policy-id"]}</td>
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
                                                <div className="iconPosition"onClick={this.handleLinkClick.bind(this,'bandwidthPolicy')}>
                                                    <i className="fa fa-plus-circle " aria-hidden="true"></i>
                                                    <a title="Create" data="Create" className="createWhiteList" >Create</a>
                                                </div>
                                                <table className="table table-bordered policytable">
                                                    <thead>
                                                        <tr>
                                                            <th>Policy ID</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.getAllL2.map(function(element, i) {
                                                            return (
                                                                <tr>
                                                                    <td>{element["policy-id"]}</td>
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
                                                <div className="iconPosition"  onClick={this.handleLinkClick.bind(this,'vpnPolicy')}>
                                                    <i className="fa fa-plus-circle " aria-hidden="true"></i>
                                                    <a title="Create" data="Create" className="createWhiteList" >Create</a>
                                                </div>
                                                <table className="table table-bordered policytable">
                                                    <thead>
                                                        <tr>
                                                            <th>VPN Name</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.getAllVpn.map(function(element, i) {
                                                            return (
                                                                <tr>
                                                                    <td>{element["vpn-name"]}</td>
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
                                                <div className="iconPosition"  onClick={this.handleLinkClick.bind(this,'schedulePolicy')}>
                                                    <i className="fa fa-plus-circle " aria-hidden="true"></i>
                                                    <a title="Create" data="Create" className="createWhiteList" >Create</a>

                                                </div>
                                                <table className="table table-bordered policytable">
                                                    <thead>
                                                        <tr>
                                                            <th>Policy ID</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Schedule Policy1</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <DynamicBandwidth header="Create Dynamic Bandwidth Policy" submitMode="Save" className={this.state.dynamicBandwidthClassName} setHidden={this.setHidden}></DynamicBandwidth>

                            <VpnPolicyForm header="Create VPN Policy" submitMode="Save" className={this.state.vpnPolicyClassname} setHidden={this.setHidden}></VpnPolicyForm>

                            <SchedulePolicyForm header="Create Schedule  Policy" submitMode="Save" className={this.state.schedulePolicyClassName} setHidden={this.setHidden}></SchedulePolicyForm>
                            <WhiteList header="Create WhiteList Policy" submitMode="Save" className={this.state.whiteListClassName} setHidden={this.setHidden}></WhiteList>
                        </div>
                    </div>

                </div>
            );
        }
    });

    return PolicyBody;
});
