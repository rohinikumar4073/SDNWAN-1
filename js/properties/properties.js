define(['socket'], function(io) {
    var orchestratorIp = "http://10.76.110.81:50516/orchestrator";
    var templateIp = "http://10.76.110.78:50518/FbTemplate";
    var rmsIp = "http://localhost:50512/rms/";
    var nodeIp = "http://localhost:9090";

    var whiteListIp = orchestratorIp + "/L2Policy";
    var vpnPolicyIp = orchestratorIp + "/l2VpnPolicy";
    var getAllIp = orchestratorIp + "/ipAvailability";
    var getDynamicIp = orchestratorIp + "/dynamicBandwidth";
    var getAllL2 = orchestratorIp + "/getAllL2Policy";
    var getAllVpn = orchestratorIp + "/getAllVpnPolicy";

    var vpnBgpIp = orchestratorIp + "/vpnBgp";
    var bgpRoutingIp = orchestratorIp + "/bgpRouting";
    var vpnBgpSessionIp = orchestratorIp + "/vpnBgpSession";
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
        envSettings: orchestratorIp + "/ipDetails"

    };

});
