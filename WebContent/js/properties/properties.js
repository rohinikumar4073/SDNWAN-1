define(['socket'],function(io){
  var swaggerIp="http://localhost:50514/";
  var nodeIp="http://localhost:9090";

  var rmsIp ="http://localhost:50512/rms/";
      var socket = io.connect('http://localhost:9090');

    return {
        createHost:swaggerIp+"orchestrator/createHost",
        nodeIp:nodeIp,
        rmsIp:rmsIp,
        socket:socket

    };

});
