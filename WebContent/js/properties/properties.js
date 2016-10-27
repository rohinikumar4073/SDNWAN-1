define(function(){
  var swaggerIp="http://localhost:50514/";
  var nodeIp="http://localhost:9090";

  var rmsIp ="http://localhost:50512/rms/";
    return {
        createHost:swaggerIp+"orchestrator/createHost",
        nodeIp:nodeIp,
        rmsIp:rmsIp

    };

});
