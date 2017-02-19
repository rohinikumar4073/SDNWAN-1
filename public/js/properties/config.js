define(function() {
    //var nodeIp = "http://localhost:909
    //  var orchestratorIp="http://"+window.location.hostname+":8080/orchPolicy-0.0.1/orchestrator";
    //var templateIp="http://"+window.location.hostname+":8080/fbInstance-0.0.1/FbTemplate";
    //var rmsIp ="http://"+window.location.hostname+":8080/rmsInstances-0.0.1/rms/";
    return {

        orchestratorIp:"http://"+window.location.hostname+":8080/orchPolicy-0.0.1/orchestrator",
        templateIp: "http://"+window.location.hostname+":8080/fbInstance-0.0.1/FbTemplate",
        rmsIp:"http://"+window.location.hostname+":8080/rmsInstances-0.0.1/rms/",
        webSocketIp: window.location.hostname + ":50572/kafka",
        websocketStomp: "http://"+window.location.hostname+":50520/kafka-message-websocket/",
        nodeIp: "http://" + window.location.hostname + ":9090"

    }
})
