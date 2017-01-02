define(['react','jsx!components/ConfigurationLink','jsx!components/BootstrapButton','properties'], function(React,ConfigurationLink,BootstrapButton,properties) {

    var ConfigurationBody = React.createClass({
      componentDidMount: function() {




      },
      getInitialState: function() {
          return {

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
                                                            <th>Routing App Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

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
                                                        <tr>
                                                            <td>6628</td>

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
                                        <a data-toggle="collapse" href="#vpnConfiguration" aria-expanded="true">VPN Configuration</a>
                                    </h4>
                                </div>

                                <div id="vpnConfiguration" className="panel-collapse collapse in" role="tabpanel">
                                    <div className="panel-body">

                                        <div className="row">
                                            <div>
                                                <table className="table table-bordered policytable">
                                                    <thead>
                                                        <tr>
                                                            <th>VPN Configuration Sessions</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>


                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <ConfigurationLink onClick={this.props.openModal} title="Create Periodic Configuration" className="btn btn-sm btn-primary policycreate" data="Create Periodic Configuration" template="periodicConfiguration"></ConfigurationLink>
                        <ConfigurationLink onClick={this.props.openModal} title="Create Publisher Configuration" className="btn btn-sm btn-primary policycreate" data="Create Publisher Configuration" template="publisherConfiguration"></ConfigurationLink>

                    </div>
                </div>

            </div>
            );
        }
    });

    return ConfigurationBody;
});
