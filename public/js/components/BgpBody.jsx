define([
    'react', 'jsx!components/BgpLink', 'jsx!components/BootstrapButton', 'properties'
], function(React, BgpLink, BootstrapButton, properties) {

    var BgpBody = React.createClass({

        getInitialState: function() {
            return {getAllBgp: [], getAllVpnBgp: [], getAllVpnBgpSession: []}
        },
        componentDidMount: function() {

          var getAllBgpURL = properties.getAllBgpRouting;
          var self = this;
          $.get(getAllBgpURL, function(BgpResult) {

              var bgpColl = BgpResult;
              var rows = [];
              self.setState({getAllBgp: BgpResult});
              console.log("Sravani" + this.state.getAllBgp);
          })

           var getAllVpnBgpURL = properties.getAllVpnBgp;
        var self = this;
        $.get(getAllVpnBgpURL, function(VpnBgpResult) {
            var vpnBgpCollection = VpnBgpResult;
            var rows = [];
            self.setState({getAllVpnBgp: VpnBgpResult});
            console.log(this.state.getAllVpnBgp);
        })

        var getAllVpnBgpSesURL = properties.getAllVpnBgpSession;
        var self = this;
        $.get(getAllVpnBgpSesURL, function(VpnBgpSesResult) {
            var vpnBgpSesColl = VpnBgpSesResult;
            var rows = [];
            self.setState({getAllVpnBgpSession: VpnBgpSesResult});
            console.log(this.state.getAllVpnBgpSession);
        })

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
                                            <a data-toggle="collapse" href="#Routing" aria-expanded="true">Routing</a>
                                        </h4>
                                    </div>
                                    <div id="Routing" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <div className="row">
                                                <div>
                                                    <table className="table table-bordered policytable">
                                                        <thead>
                                                            <tr>
                                                                <th>Bgp Routing</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {(this.state.getAllBgp).map(function(element, i) {
                                                                return (
                                                                    <tr>
                                                                        <td>{element.appName}</td>
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
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#vpnRouting" aria-expanded="true">VPN</a>
                                        </h4>
                                    </div>
                                    <div id="vpnRouting" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <div className="row">
                                                <div>
                                                    <table className="table table-bordered policytable">
                                                        <thead>
                                                            <tr>
                                                                <th>VPN</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                          {(this.state.getAllVpnBgp).map(function(element, i) {
                                                              return (
                                                                  <tr>
                                                                      <td>{element["vpnName"]}</td>
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
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#vpnBgp" aria-expanded="true">VPN BGP</a>
                                        </h4>
                                    </div>
                                    <div id="vpnBgp" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <div className="row">
                                                <div>
                                                    <table className="table table-bordered policytable">
                                                        <thead>
                                                            <tr>
                                                                <th>VPN BGP Sessions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                          {(this.state.getAllVpnBgpSession).map(function(element, i) {
                                                              return (
                                                                  <tr>
                                                                      <td>{element["vpnName"]}</td>
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
                                </div>
                            </div>
                            <BgpLink onClick={this.props.openModal} title="Create Routing App" className="btn btn-sm btn-primary policycreate" data="Create Routing Policy" template="Routing"></BgpLink>
                            <BgpLink onClick={this.props.openModal} title="Create VPN" className="btn btn-sm btn-primary policycreate" data="Create VPN" template="Vpn"></BgpLink>
                            <BgpLink onClick={this.props.openModal} title="Create VPN BGP Session" className="btn btn-sm btn-primary policycreate" data="Create VPN BGP Session" template="VpnBgpSession"></BgpLink>
                        </div>
                    </div>
                </div>
            );
        }
    });
    return BgpBody;
});
