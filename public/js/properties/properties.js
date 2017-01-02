define(['socket'], function(io) {
    var orchestratorIp = "http://10.76.110.81:50516/orchestrator";
    var templateIp = "http://10.76.110.78:50518/FbTemplate";
    var rmsIp = "http://localhost:50512/rms";
    var nodeIp = "http://localhost:9090";
    var webSocketIp=window.location.hostname+":50572/kafka";
    var websocketStomp="http://"+window.location.hostname+":8080/Kafka-websocket-project-0.0.1/kafka-message-websocket/";

    //var rmsIp ="http://localhost:50512/rms/";
  /*  r nodeIp="http://"+window.location.hostname+":9090";
  var orchestratorIp="http://"+window.location.hostname+":8080/orchPolicy-0.0.1/orchestrator";
  var templateIp="http://"+window.location.hostname+":8080/fbInstance-0.0.1/FbTemplate";
  var rmsIp ="http://"+window.location.hostname+":8080/rms-0.0.1/rms";
  var webSocketIp=window.location.hostname+":50572/kafka";
  var websocketStomp="http://"+window.location.hostname+":8080/Kafka-websocket-project-0.0.1/kafka-message-websocket/";
";*/
    var whiteListIp = orchestratorIp + "/L2Policy";
    var vpnPolicyIp = orchestratorIp + "/l2VpnPolicy";
    var getAllIp = orchestratorIp + "/ipAvailability";
    var getDynamicIp = orchestratorIp + "/dynamicBandwidth";
    var getAllL2 = orchestratorIp + "/getAllL2Policy";
    var getAllVpn = orchestratorIp + "/getAllVpnPolicy";
    var getAllBgpRouting= orchestratorIp + "/getAllBgpRouting";
    var getAllVpnBgp = orchestratorIp + "/getAllVpnBgp";
    var getAllVpnBgpSession = orchestratorIp + "/getAllVpnBgpSession";

    var vpnBgpIp = orchestratorIp + "/vpnBgp";
    var bgpRoutingIp = orchestratorIp + "/bgpRouting";
    var vpnBgpSessionIp = orchestratorIp + "/vpnBgpSession";
    var schedulePolicyIp = orchestratorIp + "/schedulePolicy";
    var getAllPowerIp = templateIp + "/getAllPowerSupply";
    var getAllFanIp = templateIp + "/getAllFan";
    var getAllosIp = templateIp + "/getAllOs";
    var getAllTransIp = templateIp + "/getAllTrans";

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
        websocketStomp:"http://10.200.0.32:8080/Kafka-websocket-project-0.0.1/kafka-message-websocket/",
        webSocketIp:"localhost:50572/kafka",
        createHost: orchestratorIp + "/createHost",
        nodeIp: nodeIp,
        templateIp: templateIp + '/',
        whiteListIp: whiteListIp,
        getAllPowerIp: getAllPowerIp,
        getAllFanIp: getAllFanIp,
        getAllosIp: getAllosIp,
        getAllTransIp: getAllTransIp,
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
        pushTopology: orchestratorIp + "/generateTopology",
        createLink: orchestratorIp + "/createLink",
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
        getMaxNode:function(){
          if(localStorage.getItem("topologyData")){
            var topology=JSON.parse(localStorage.getItem("topologyData"))
            return topology.nodes.length+1;
          }else{
            return 1;
          }
        },
        envSettings: orchestratorIp + "/ipDetails"

    };

});
