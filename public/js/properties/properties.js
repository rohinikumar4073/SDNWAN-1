define(['socket','config'], function(io,config) {
var orchestratorIp = config.orchestratorIp;
    var templateIp = config.templateIp;
   var rmsIp = config.rmsIp;
    var webSocketIp=config.webSocketIp;
    var websocketStomp=config.websocketStomp;
 var nodeIp=config.nodeIp;
    var whiteListIp = orchestratorIp + "/L2Policy";
    var vpnPolicyIp = orchestratorIp + "/l2VpnPolicy";
    var whiteListIp = orchestratorIp + "/save/L2Policy";
    var vpnPolicyIp = orchestratorIp + "/save/l2VpnPolicy";
    var envIp = orchestratorIp + "/ipDetails";
    var getAllIp = orchestratorIp + "/ipAvailability";
    var getDynamicIp = orchestratorIp + "/save/dynamicBandwidth";
    var getAllL2 = orchestratorIp + "/getAllL2Policy";
    var getAllVpn = orchestratorIp + "/getAllVpnPolicy";
    var getAllBgpRouting= orchestratorIp + "/getAllBgpRouting";
    var getAllVpnBgp = orchestratorIp + "/getAllVpnBgp";
    var getAllVpnBgpSession = orchestratorIp + "/getAllVpnBgpSession";
    var emsConfigIp="http://localhost:50512/rms/fbname/emsConfiguration";

    var vpnBgpIp = orchestratorIp + "/vpnBgp";
    var bgpRoutingIp = orchestratorIp + "/bgpRouting";
    var vpnBgpSessionIp = orchestratorIp + "/vpnBgpSession";
    var schedulePolicyIp = orchestratorIp + "/schedulePolicy/save";
    var getAllPowerIp = templateIp + "/getAllPowerSupply";
    var getAllFanIp = templateIp + "/getAllFan";
    var getAllosIp = templateIp + "/getAllOs";
    var getAllTransIp = templateIp + "/getAllTransHardware";
    var getAllTransSoftware = templateIp + "/getAllTransSoftware";
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

    var socket = io.connect(nodeIp);
    return {
        saveTopologyData: function(data) {
            topologyData = data;
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
        templateIp: templateIp + '/',
        whiteListIp: whiteListIp,
        getAllPowerIp: getAllPowerIp,
        getAllFanIp: getAllFanIp,
        getAllosIp: getAllosIp,
        getAllTransIp: getAllTransIp,
        getAllTransSoftware: getAllTransSoftware,
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
        pushTopology: orchestratorIp + "/generateTopology",
        createLink: orchestratorIp + "/createLink",
        saveComponent:saveComponent,
        deleteNode:deleteNode,
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

        getMaxNode:function(dataObj,callback,key,self){
          $.ajax({

              url: nodeIp+"/getKey?key="+key ,
              type: 'get',
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                if(data){
                    var length=JSON.parse(data);
                    callback(dataObj,length,self)
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