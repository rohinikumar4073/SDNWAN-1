define(['react','jsx!components/PolicyLink','jsx!components/BootstrapButton','properties'], function(React,PolicyLink,BootstrapButton,properties) {

    var PolicyBody = React.createClass({
      componentDidMount: function() {

          var getAllL2URL = properties.getAllL2;
          var self = this;
          $.get(getAllL2URL, function(IpResult) {
              var ipCollection = IpResult;
              var rows = [];
              self.setState({getAllL2: IpResult});
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
          return {
              getAllL2: [],
              getAllVpn:[]
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

                                        <div className="row">
                                            <div>
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
                                                                      <td>{element["policy-id"]}</td>  </tr>
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
                                        <a data-toggle="collapse" href="#bandwidthPolicy" aria-expanded="true">Bandwidth Policy</a>
                                    </h4>
                                </div>

                                <div id="bandwidthPolicy" className="panel-collapse collapse in" role="tabpanel">
                                    <div className="panel-body">

                                        <div className="row">
                                            <div>
                                                <table className="table table-bordered policytable">
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
                                                    <tbody>
                                                        <tr>
                                                            <td>6628</td>
                                                            <td>bandwidth listing</td>
                                                            <td>listing</td>
                                                            <td>662</td>
                                                            <td>unidirectional</td>
                                                            <td>yes</td>

                                                        </tr>

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
                                        <a data-toggle="collapse" href="#vpnPolicy" aria-expanded="true">VPN Policy</a>
                                    </h4>
                                </div>

                                <div id="vpnPolicy" className="panel-collapse collapse in" role="tabpanel">
                                    <div className="panel-body">

                                        <div className="row">
                                            <div>
                                                <table className="table table-bordered policytable">
                                                    <thead>
                                                        <tr>
                                                            <th>Bundle ID</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                      {this.state.getAllVpn.map(function(element, i) {
                                                          return (
                                                              <tr>
                                                              <td>{element["vpn-name"]}</td></tr>
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
                                        <a data-toggle="collapse" href="#SchedulePolicy" aria-expanded="true">Schedule Policy</a>
                                    </h4>
                                </div>

                                <div id="SchedulePolicy" className="panel-collapse collapse in" role="tabpanel">
                                    <div className="panel-body">

                                        <div className="row">
                                            <div>
                                                <table className="table table-bordered policytable">
                                                    <thead>
                                                        <tr>
                                                            <th>Policy ID</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                                      <tr>
                                                                      <td>Schedule Policy1</td> </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <PolicyLink onClick={this.props.openModal} title="Create WhiteList Policy" className="btn btn-sm btn-primary policycreate" data="Create Whitelist Policy" template="WhiteList"></PolicyLink>
                        <PolicyLink onClick={this.props.openModal} heading="Create Dynamic Bandwidth Policy" className="btn btn-sm btn-primary policycreate" data="Create Dynamic Bandwidth Policy" template="DynamicBandwidth"></PolicyLink>
                       <PolicyLink onClick={this.props.openModal} heading="Create VPN Policy" className="btn btn-sm btn-primary policycreate" data="Create VPN Policy" template="VpnPolicy"></PolicyLink>
                       <PolicyLink onClick={this.props.openModal} heading="Create Schedule Policy" className="btn btn-sm btn-primary policycreate" data="Create Schedule Policy" template="SchedulePolicy"></PolicyLink>

                    </div>
                </div>

            </div>
            );
        }
    });

    return PolicyBody;
});
