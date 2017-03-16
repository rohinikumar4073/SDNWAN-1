define(['react', 'react-dom', 'jquery', 'jsx!components/ConfigurationForms/VirtualLinkConfiguration', 'properties', 'axios','toastr'], function(React, ReactDom, $, VirtualLinkConfiguration, properties, axios,toastr) {
    return {

        openVirtualLinkPopUp: function(configurationEvents, self, vpnData) {
            var VirtualLinkConfigurationFact = React.createFactory(VirtualLinkConfiguration);
            $("#pageModal").empty()
            var data = {
                "configurationEvents": configurationEvents,
                submitMode: "Create",
                formData: {},
                className: "test",
                header: "Create Virtual Link",
                currentNode: self,
                linkService: this,
                source: configurationEvents.getSourceNodeDetails(),
                target: $("input[name='portselcted']:checked").next().text(),
                hostname: self.node().get("label"),
                vpnData: vpnData.data
            };
            ReactDom.render(
                VirtualLinkConfigurationFact(data),
                document.getElementById('pageModal'));
            debugger;
            $('#pageModal ')
                .modal(
                    'show')
        },
        editVirtualLink: function(virtualData){
          debugger;
          var VirtualLinkConfigurationFact = React.createFactory(VirtualLinkConfiguration);
          $("#pageModal").empty()
          var data={
              submitMode: "Update",
              formData: virtualData,
              className: "test",
              header:"Update Virtual Link",
              linkService:this
          };
          ReactDom.render(
              VirtualLinkConfigurationFact(data),
              document.getElementById('pageModal'));
          debugger;
          $('#pageModal ')
              .modal(
                  'show')
        }
        postVirtualLink: function(length, props, data) {
            var source = {};
            var destination = {};
            if (props.configurationEvents.getSourceNodeDetails().iconType == "fb-icon") {

                source = {
                    "source-node": props.configurationEvents.getSourceNodeDetails().node,
                    "source-tp": data.forwardingBoxData["fb-tp-id"]
                };
                destination = {
                    "dest-node": props.currentNode.node().get("label")+"-"+data.vLan,
                    "dest-tp": data.hostData["hostTpId"]
                };

            } else {
                source = {
                    "source-node": props.currentNode.node().get("label"),
                    "source-tp": data.forwardingBoxData["fb-tp-id"]
                };
                destination = {
                    "dest-node": props.configurationEvents.getSourceNodeDetails().node+"-"+data.vLan,
                    "dest-tp": data.hostData["hostTpId"]
                };
            }
            return axios.post(properties.createLink, {
                "lid": length,
                "link": {
                    "destination": destination,
                    "link-cost": data["link-cost"],
                    "link-group-id": [data["link-group-id"]],
                    "link-id": source["source-node"]+"-"+destination["dest-node"],
                    "link-validate": data["link-validate"],
                    "max-bandwidth": {
                        "unit": "Gbps",
                        "value": data["max-bandwidth"]
                    },
                    "source": source
                },
                "reverseLink": {
                    "linkGroupId": [data.reverseLink.linkGroupId],
                    "linkId": destination["dest-node"]+"-"+source["source-node"]
                }
            })
        },
        updateForwardingBox: function(props, data) {
            var fbName = "";
            var portName = "";
            debugger;
            if (props.configurationEvents.getSourceNodeDetails().iconType == "fb-icon") {
                fbName = props.configurationEvents.getSourceNodeDetails().node;
                portName = props.configurationEvents.getSourceNodeDetails().data;

            } else {
                fbName = props.currentNode.node().get("label");
                portName = $("input[name='portselcted']:checked").next().text();

            }
            var portUpdateData = {
                "ipV4": data.forwardingBoxData["fb-ipv4"],
                "ipV6": data.forwardingBoxData["fb-ipv6"],
                "portName": portName,
                "vlan":data.vLan,
                "tpId": data.forwardingBoxData["fb-tp-id"]
            }
debugger;
            return axios.post(properties.rmsIp + fbName + "/modifyPort", portUpdateData);
        },
        updateHostData: function(props, data,response) {
            var hostData = {
                "nodeId": "",
                "subnets": {
                  "staticSubnet":[]
                },
                "terminationPoint": [{
                    "hostPortName": "",
                    "ipAddress": [
                      response.data.ipv4,
                      response.data.ipv6
                    ],
                    "tpId": ""
                }],
                "type": "host"
            }


            var fbName = "";
            var portName = "";
            if (props.configurationEvents.getSourceNodeDetails().iconType == "host") {
                hostData["nodeId"] = props.configurationEvents.getSourceNodeDetails().node + "-" + data["vLan"];
            } else {
                hostData["nodeId"] = props.currentNode.node().get("label") + "-" + data["vLan"];
            }
            hostData["terminationPoint"][0]["hostPortName"] = data.hostData["hostTpId"]
            hostData["terminationPoint"][0]["tpId"] = data.hostData["hostTpId"]
            if(!data.hostData["hostIpv4"]){
              data.hostData["hostIpv4"]=[]
            }
            if(!data.hostData["hostIpv6"]){
              data.hostData["hostIpv6"]=[]
            }
debugger;
            data.hostData["hostIpv4"].forEach(function(v, i) {
              hostData["subnets"]["staticSubnet"].push({"subnetId": v });
            })
            data.hostData["hostIpv6"].forEach(function(v, i) {
              hostData["subnets"]["staticSubnet"].push({"subnetId": v });
            })
          //  hostData["subnets"]["staticSubnet"] = data.hostData["hostIpv4"].concat(data.hostData["hostIpv6"])

            return axios.post(properties.nodeIp + '/saveList', {
                "key": "hostTopologyData",
                "value": hostData
            });
        },

        setVirtualLink: function(props, data) {
            var self = this;
            properties.getMaxNode({
                source: props.configurationEvents.getSourceNodeDetails().id,
                target: props.currentNode.node()
                    .id(),
                virtual: true
            }, function(dataObj, length) {
              var hostName=""
              if (props.configurationEvents.getSourceNodeDetails().iconType == "host") {
                var hostName=props.configurationEvents.getSourceNodeDetails().node
              } else {
                  hostName = props.currentNode.node().get("label");
              }
                dataObj.id = length;
                axios.get(properties.nodeIp+"/getKey?key="+hostName+"_host").then(function(response){
                  axios.all([self.postVirtualLink(length, props, data), self.updateForwardingBox(props, data), self.updateHostData(props, data,response)])
                      .then(axios.spread(function(acct, perms) {
                        toastr.success("Link Added successfully")
                        props.currentNode.topology()
                            .addLink(dataObj);
                        properties.saveMaxNode(++length, "linkCounter");
                        props.configurationEvents.saveNativeTopology(props.currentNode
                            .topology().getData());
                          console.log("updated")
                              // Both requests are now complete
                      }));

                })


            }, "linkCounter");
        }
    }
});
