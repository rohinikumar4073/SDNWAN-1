define([
    'react',
    'jsx!components/ConfigurationLink',
    'jsx!components/BootstrapButton',
    'properties',
    'jsx!components/ConfigurationForms/PeriodicConfiguration',
    'jsx!components/ConfigurationForms/PublisherConfiguration',
    'jsx!components/ConfigurationForms/EmsConfiguration',
    'jsx!components/ConfigurationForms/MonitoringService',
    'jsx!components/ConfigurationForms/DynamicBandwidth',
    'agGrid',
    'reactCellRendererFactory',
    'reactFilterFactory',
], function(React, ConfigurationLink, BootstrapButton, properties, Periodic, Publisher, Ems, Monitor, DynamicBandwidth, agGridReact, reactCellRendererFactory, reactFilterFactory) {
      var AgGridReactGRID = agGridReact.AgGridReact;
    var ConfigurationBody = React.createClass({
        componentDidMount: function() {
        },
        getInitialState: function() {
            return {
                "PeriodicClassName": " hidden",
                "PublisherClassName": " hidden",
                "EMSClassname": "hidden",
                "FbClassname": "hidden",
                "dynamicBandwidthGlobalClassName": "hidden",
                "PeriodicData": {
                    "header": "Create Periodic Configuration",
                    "formData": {},
                    "buttonClassName": ""
                },
                "PublisherData": {
                  "header": "Create Publisher Configuration",
                  "formData": {},
                  "buttonClassName":""
                },
                "dynamicBandWidthGlobalData": {
                    "header": "Create Dynamic Bandwidth Configuration",
                    "formData": {},
                    "buttonClassName": ""
                },
                "EMSData": {
                    "header": "Create EMS Configuration",
                    "formData": {},
                    "buttonClassName": ""
                },
                "Monitoring": {
                    "header": "FB Monitoring",
                    "formData": {},
                    "buttonClassName": ""
                }
            }
        },

        setHidden: function(linkType) {

            switch (linkType) {
                case "Periodic":
                    this.setState({"PeriodicClassName": "hidden"});
                    break;
                case "Publisher":
                    this.setState({"PublisherClassName": "hidden"});
                    break;
                case "EMS":
                    this.setState({"EMSClassname": "hidden"});
                    break;
                    case "Monitor":
                        this.setState({"FbClassname": "hidden"});
                        break;
                case "dynamicBandwidthGlobal":
                    this.setState({"dynamicBandwidthGlobalClassName": "hidden"});
                    break;
                default:
            }
        },
        handleLinkClick: function(linkType) {
            switch (linkType) {
                case "Periodic":
                    this.setState({
                        "PeriodicClassName": "modal-content configurationCreate",
                        "PeriodicData": {
                            "header": "Create Periodic Configuration",
                            formData: {},
                            buttonClassName: ""
                        }
                    });break;
                case "Publisher":
                    this.setState({"PublisherClassName": "modal-content configurationCreate"});
                    break;
                case "EMS":
                    this.setState({
                        "EMSClassname": "modal-content configurationCreate",
                        EMSData: {
                            "header": "Create EMS Configuration",
                            formData: {},
                            buttonClassName: ""
                        }
                    });
                    break;
                    case "Monitor":
                        this.setState({
                            "FbClassname": "modal-content configurationCreate",
                            Monitoring: {
                                "header": "FB Monitoring Service",
                                formData: {},
                                buttonClassName: ""
                            }
                        });
                        break;
                case "dynamicBandwidthGlobal":
                    this.setState({
                        "dynamicBandwidthGlobalClassName": "modal-content configurationCreate",
                        "dynamicBandWidthGlobalData": {
                            "header": "Create Dynamic Bandwidth Configuration",
                            formData: {},
                            buttonClassName: ""
                        }
                    });
                    break;
                default:

            }
        },
        viewForm: function(data, linkType) {
            switch (linkType) {
                case "Periodic":
                    this.setState({
                        "PeriodicClassName": "modal-content configurationCreate",
                        "PeriodicData": {
                            "header": "View Periodic Configuration",
                            formData: data,
                            buttonClassName: "hidden"
                        }
                    });
                    break;
                case "Publisher":
                    this.setState({"PublisherClassName": "modal-content configurationCreate"});
                    break;
                case "EMS":
                    this.setState({
                        "EMSClassname": "modal-content configurationCreate",
                        EMSData: {
                            "header": "View EMS Configuration",
                            formData: data,
                            buttonClassName: "hidden"
                        }
                    });break;
                    case "Monitor":
                        this.setState({
                            "FbClassname": "modal-content configurationCreate",
                            Monitoring: {
                                "header": "View FB Monitoring Service",
                                formData: data,
                                buttonClassName: "hidden"
                            }
                        });break;
                case "dynamicBandwidthGlobal":
                    this.setState({
                        "dynamicBandwidthGlobalClassName": "modal-content configurationCreate",
                        "dynamicBandWidthGlobalData": {
                            "header": "View Dynamic Bandwidth Configuration",
                            formData: data,
                            buttonClassName: "hidden"
                        }
                    });break;
                default:

            }
        },
        render: function() {
            return (
              <div className="configuration">
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4>Configuration Page</h4>
                        </div>
                          <div className="panel-body">
                            <table className="table table-bordered policytable">
                                <thead>
                                    <tr>
                                        <th className="first-row">Configuration Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Periodic Configuration</td>
                                    <td>
                                      <div onClick={this.handleLinkClick.bind(this, 'Periodic')}>
                                          <a title="Create" data="Create" className="createPeriodic">Create</a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Publisher Configuration</td>
                                    <td>
                                      <div onClick={this.handleLinkClick.bind(this, 'Publisher')}>
                                          <a title="Create" data="Create" className="createPublisher">Create</a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>EMS Configuration</td>
                                    <td>
                                      <div onClick={this.handleLinkClick.bind(this, 'EMS')}>
                                          <a title="Create" data="Create" className="createEMS">Create</a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Monitoring Service</td>
                                    <td>
                                      <div onClick={this.handleLinkClick.bind(this, 'Monitor')}>
                                          <a title="Create" data="Create" className="fbMonitor">Create</a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Dynamic Bandwidth Global Configuration</td>
                                    <td>
                                      <div onClick={this.handleLinkClick.bind(this, 'dynamicBandwidthGlobal')}>
                                          <a title="Create" data="Create" className="createDynamicBandwidth">Create</a>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                            </table>
                          </div>
                    </div>
                </div>
                <Periodic className={this.state.PeriodicClassName} header={this.state.PeriodicData.header} submitMode="Save" formData={this.state.PeriodicData.formData} buttonClassName={this.state.PeriodicData.buttonClassName} setHidden={this.setHidden}></Periodic>

                <Publisher header={this.state.PublisherData.header} submitMode="Save" formData={this.state.PublisherData.formData} className={this.state.PublisherClassName} buttonClassName={this.state.PublisherData.buttonClassName} setHidden={this.setHidden}></Publisher>

                <Ems header={this.state.EMSData.header} submitMode="Save" className={this.state.EMSClassname} buttonClassName={this.state.EMSData.buttonClassName} setHidden={this.setHidden}></Ems>
                <Monitor header={this.state.Monitoring.header} submitMode="Save" className={this.state.FbClassname} buttonClassName={this.state.Monitoring.buttonClassName} setHidden={this.setHidden}></Monitor>
                <DynamicBandwidth header={this.state.dynamicBandWidthGlobalData.header} formData={this.state.dynamicBandWidthGlobalData.formData} submitMode="Save" className={this.state.dynamicBandwidthGlobalClassName} buttonClassName={this.state.dynamicBandWidthGlobalData.buttonClassName} setHidden={this.setHidden}></DynamicBandwidth>
              </div>
              );
     }
 });
 return ConfigurationBody;
});
