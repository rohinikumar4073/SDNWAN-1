define([
    'react',
    'jquery',
    'properties',
    'toastr',
    'react-jsonschema-form',
    'axios'
], function(React, $, properties, toastr, Form, axios) {
    var DynamicLinkConfiguration = Form.default;
    var source;
    var target;
    var hostname;
    var DynamicLinkConfigurationClass = React.createClass({
        getInitialState: function() {
            return {
                schema: {
                    "type": "object",
                    "properties": {
                            "source": {
                                "type": "string",
                                "title": "A-End"
                            },
                            "destination": {
                                "type": "string",
                                "title": "Z-End"
                            },
                            "linkGroupAZ": {
                                "type": "string",
                                "title": "Link Group A-Z"
                            },
                            "linkGroupZA": {
                                "type": "string",
                                "title": "Link Group Z-A"
                            },
                            "validate": {
                                "type": "string",
                                "title": "Validate",
                                "enum": ["true", "false"]
                            },
                            "minBandwidth": {
                                "type": "integer",
                                "title": "Minimum Bandwidth"
                            },
                            "linkCost": {
                                "type": "integer",
                                "title": "Link Cost"
                            },
                            "maxBandwidth": {
                                "type": "integer",
                                "title": "Maximum Bandwidth"
                            },
                            "policyId":{
                              "type": "string",
                              "title": "Policy ID"
                            }
                        }
                    },

                uiSchema: {
                        "source": {
                            "ui:readonly": true,
                            "classNames": "col-sm-6"
                        },
                        "destination": {
                            "ui:readonly": true,
                            "classNames": "col-sm-6"
                        },
                        "minBandwidth":{
                           "ui:widget": "updown",
                           "classNames": "col-sm-12"
                        },
                        "maxBandwidth":{
                           "ui:widget": "updown",
                           "classNames": "col-sm-12"
                        },
                        "policyId":{
                          "classNames": "col-sm-12"
                        },
                        "linkGroupAZ": {
                            "classNames": "col-sm-12"
                        },
                        "linkGroupZA": {
                            "classNames": "col-sm-12"
                        },
                        "validate": {
                            "classNames": "col-sm-12"
                        },
                        "linkCost": {
                            "classNames": "col-sm-12"
                        }

                },
                formData:{}
        }
      },
        componentDidMount: function() {
              debugger;
              if(this.props.submitMode == "Update"){
                var policyData = this.props.formData;
                var data = {
                  "source": policyData["a-endpoints"][0]["node-id"],
                  "destination": policyData["z-endpoints"][0]["node-id"],
                  "minBandwidth": policyData["min-bandwidth"]["value"],
                  "maxBandwidth": policyData["max-bandwidth"]["value"],
                  "policyId": policyData["policy-id"],
                  "linkGroupAZ": policyData["link-group-a-z"],
                  "linkGroupZA": policyData["link-group-z-a"],
                  "validate": policyData["validate"],
                  "linkCost": policyData["link-cost"]
                };
                this.setState({formData: data})
              }
              else {
                source = this.props.source.node;
                target = this.props.targetFBName;
                var az = source+"-"+target+"-G1";
                var za = target+"-"+source+"-G1";
                var data = {
                  "source": source,
                  "destination": target,
                  "linkGroupAZ": az,
                  "linkGroupZA": za
                }
                var self = this;
                self.setState({formData: data});
              }

        },
        onSubmit: function(e) {

            this.handleConfirm(e.formData)
        },
        handleConfirm: function(data) {
          var dynamicLinkData = {
            "a-endpoints": [
              {
                "node-id": source,
                "termination-points":[]
              }
            ],
            "link-group-a-z": data.linkGroupAZ,
            "link-group-z-a": data.linkGroupZA,
            "max-bandwidth": {
              "unit": "Gbps",
              "value": data.maxBandwidth
            },
            "min-bandwidth": {
              "unit": "Gbps",
              "value": data.minBandwidth
            },
            "optical-path-options": {
              "path-metric": "least-hops"
            },
            "policy-id": data.policyId,
            "validate": data.validate,
            "link-cost": data.linkCost,
            "z-endpoints": [
              {
                "node-id": target,
                "termination-points":[]
              }
            ]
          };
          debugger;
          if(this.props.submitMode == "Update"){
            var postURL = properties.orchestratorIp+"/editDynamicPolicy/"+data.policyId;
            axios.post(postURL, dynamicLinkData).then(function(response){
              toastr.success("Link is successfully updated");
            })
          }
          else{
            var postURL = properties.orchestratorIp+"/createDynamicPolicy";
            axios.post(postURL, dynamicLinkData).then(function(response){
              this.props.dynamicLinkService.setDynamicLink(this.props.configurationEvents, this.props.currentNode,data.policyId);
            }.bind(this))
          }

        },
        validate: function(formData, error) {

            return error;
        },
        deployDynamicBandwidthPolicy: function(){
          var getURL = properties.orchestratorIp+"/deployDynamicBandwidth";
          axios.get(getURL).then(function(response){
            toastr.success("Dynamic Bandwidth Policy successfully deployed");
          })
        },
        handleCancel: function() {
            $('#pageModal').modal('hide')
        },

        render: function() {
            return (
                <div className="modal-dialog">
                    <div className={"modal-content " + this.props.className}>
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.handleCancel}>
                                &times;
                            </button>
                            <h3>{this.props.header}</h3>
                        </div>
                        <div className="modal-body">
                            <DynamicLinkConfiguration schema={this.state.schema} uiSchema={this.state.uiSchema} formData={this.state.formData} validate={this.validate} onChange={this.onChange} onSubmit={this.onSubmit} onError={errors => {
                                console.log("i am errors" + errors);
                            }} onSubmit={this.onSubmit}>
                                <div>
                                    <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                                    <button type="button" className="btn btn-primary btn-sm" onClick={this.deployDynamicBandwidthPolicy}>Deploy</button>
                                    <button onClick={this.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                                </div>
                            </DynamicLinkConfiguration>
                        </div>
                    </div>
                </div>

            )
        }
    });
    return DynamicLinkConfigurationClass;
});
