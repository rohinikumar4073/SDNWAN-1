define(['socket','config'], function(io,config) {
    var orchestratorIp = config.orchestratorIp;
    var templateIp = config.templateIp;
    var rmsIp = config.rmsIp;
    var webSocketIp=config.webSocketIp;
    var websocketStomp=config.websocketStomp;
    var nodeIp=config.nodeIp;
    var whiteListIp = orchestratorIp + "/save/L2Policy";
    var vpnPolicyIp = orchestratorIp + "/save/l2VpnPolicy";
    var envIp = orchestratorIp + "/ipDetails";
    var getAllIp = orchestratorIp + "/ipAvailability";
    var getDynamicIp = orchestratorIp + "/save/dynamicBandwidth";
    var getAllL2 = orchestratorIp + "/getAllL2Policy";
    var getAllVpn = orchestratorIp + "/getAllL2VpnPolicy";
    var getAllBgpRouting= orchestratorIp + "/getAllBgpRouting";
    var getAllVpnBgp = orchestratorIp + "/getAllVpnBgp";
    var getAllVpnBgpSession = orchestratorIp + "/getAllVpnBgpSession";
    var saveLog = rmsIp+"saveLog";
    var getLog = rmsIp+"getLog";
    var emsConfigIp=rmsIp+"emsConfiguration/";
    var publisherConfiguration=orchestratorIp+"/publisherConfiguration";
    var periodicConfiguration=orchestratorIp+"/periodicConfiguration";

    var vpnBgpIp = orchestratorIp + "/vpnBgp";
    var bgpRoutingIp = orchestratorIp + "/bgpRouting";
    var vpnBgpSessionIp = orchestratorIp + "/vpnBgpSession";
    var schedulePolicyIp = orchestratorIp + "/schedulePolicy/save";
    var getAllosIp = templateIp + "/getAllOs";
    var getAllTransIp = templateIp + "/getAllTrans";
    var getAllHardware = templateIp + "/getAllHardware";
    var saveComponent=nodeIp+"/saveComponent";
    var deleteNode=nodeIp+"/deleteNode";
    var topologyData = null;
    var pushTopology = {
        "linkDetails": [

        ],
        "nodeDetails": [

        ]
    };
    var topology = null;

    var socket = io.connect(nodeIp);
    return {
        saveTopologyData: function(data, topologyModel) {
            topologyData = data;
            topology = topologyModel;
        },
        getTopology: function(){
          return topology;
        },
        getTopologyData: function() {
            return topologyData;
        },
        addNode: function(id, type) {
            pushTopology.nodeDetails.push({
                "id": id,
                "type": type
            })

        },
        addLink: function(link) {
            pushTopology.linkDetails.push({
                "linkId": link
            })
        },
        getTopologyPush: function() {
            return pushTopology;
        },
        websocketStomp:websocketStomp,
        webSocketIp:webSocketIp,
        createHost: orchestratorIp + "/createHost",
        nodeIp: nodeIp,
        saveLog: saveLog,
        getLog: getLog,
        templateIp: templateIp + '/',
        whiteListIp: whiteListIp,
        getAllosIp: getAllosIp,
        getAllTransIp: getAllTransIp,
        getAllHardware: getAllHardware,
        getAllIp: getAllIp,
        getDynamicIp: getDynamicIp,
        getAllL2: getAllL2,
        vpnPolicyIp: vpnPolicyIp,
        getAllVpn: getAllVpn,
        vpnBgpIp: vpnBgpIp,
        bgpRoutingIp: bgpRoutingIp,
        vpnBgpSessionIp: vpnBgpSessionIp,
        schedulePolicyIp: schedulePolicyIp,
        getAllBgpRouting: getAllBgpRouting,
        getAllVpnBgp: getAllVpnBgp,
        getAllVpnBgpSession: getAllVpnBgpSession,
        rmsIp: rmsIp,
        envIp: envIp,
        emsConfigIp: emsConfigIp,
        periodicConfiguration: periodicConfiguration,
        publisherConfiguration: publisherConfiguration,
        pushTopology: orchestratorIp + "/generateTopology",
        createLink: orchestratorIp + "/createLink",
        saveComponent:saveComponent,
        deleteNode:deleteNode,
        orchestratorIp:orchestratorIp,
        getPortStatus:nodeIp+"/getPortStatus",
        saveNativeTopologyData:nodeIp+"/saveTopology",
        getNativeTopologyData:nodeIp+"/getTopology",

        socket: function() {
            if (socket) {
                if (socket.disconnected) {
                    var socket = io.connect('http://localhost:9090');
                    return socket;
                }
                return socket;
            } else {
                var socket = io.connect('http://localhost:9090');
            }
            return socket;
        },

        getMaxNode:function(dataObj,callback,key,self,isCloining){
          $.ajax({

              url: nodeIp+"/getKey?key="+key ,
              type: 'get',
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                if(data){
                    var length=JSON.parse(data);
                    callback(dataObj,length,self,isCloining)
                }
                console.log("Pushed the details.")



              },
              error: function(data) {
                console.log("Error in saving details.")
              }

          });
        },
        saveMaxNode:function(value,key){
          var maxNode={
            key:key,
            value:value
          }
          $.ajax({
              url: nodeIp+"/saveKey" ,
              type: 'post',
              data:JSON.stringify(maxNode),
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                console.log("saved key successfully.")
                },
              error: function(data) {
                console.log("Error in saving details.")
              }

          });
        },
        envSettings: orchestratorIp + "/ipDetails"

    };

});
