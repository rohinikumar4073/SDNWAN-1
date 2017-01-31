define([
    'react',
    'jsx!components/ConfigurationLink',
    'jsx!components/BootstrapButton',
    'properties',
    'jsx!components/ConfigurationForms/PeriodicConfiguration',
    'jsx!components/ConfigurationForms/PublisherConfiguration',
    'jsx!components/ConfigurationForms/EmsConfiguration',
    'jsx!components/ConfigurationForms/MonitoringService'
], function(React, ConfigurationLink, BootstrapButton, properties, Periodic, Publisher, Ems, Monitor) {
    var ConfigurationBody = React.createClass({
        componentDidMount: function() {},
        getInitialState: function() {
            return {}
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
                                            <a data-toggle="collapse" href="#Routing" aria-expanded="true">Periodic Configuration</a>
                                        </h4>
                                    </div>
                                    <div id="Routing" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <div className="row">

                                                <Periodic></Periodic>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#vpnRouting" aria-expanded="true">Publisher Configuration</a>
                                        </h4>
                                    </div>
                                    <div id="vpnRouting" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <div className="row">
                                                <Publisher></Publisher>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" href="#ems" aria-expanded="true">EMS Configuration</a>
                                        </h4>
                                    </div>
                                    <div id="ems" className="panel-collapse collapse in" role="tabpanel">
                                        <div className="panel-body">
                                            <div className="row">
                                                <Ems></Ems>
                                                <Monitor></Monitor>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*
                            <ConfigurationLink onClick={this.props.openModal} title="Create Periodic Configuration" className="btn btn-sm btn-primary policycreate" data="Create Periodic Configuration" template="periodicConfiguration"></ConfigurationLink>
                            <ConfigurationLink onClick={this.props.openModal} title="Create Publisher Configuration" className="btn btn-sm btn-primary policycreate" data="Create Publisher Configuration" template="publisherConfiguration"></ConfigurationLink>
                            <ConfigurationLink onClick={this.props.openModal} title="Create EMS Configuration" className="btn btn-sm btn-primary policycreate" data="Create EMS Configuration" template="emsConfiguration"></ConfigurationLink>
                            <ConfigurationLink onClick={this.props.openModal} title="FB Monitoring Service" className="btn btn-sm btn-primary policycreate" data="FB Monitoring Service" template="fbMonitoring"></ConfigurationLink>*/}
                        </div>
                    </div>
                </div>
              );
     }
 });
 return ConfigurationBody;
});
