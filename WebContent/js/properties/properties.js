define(['socket'],function(io){
  var swaggerIp="http://localhost:50514/";
  var nodeIp="http://localhost:9090";

  var rmsIp ="http://localhost:50512/rms/";

    var socket = io.connect('http://localhost:9090');
    return {
        createHost:swaggerIp+"orchestrator/createHost",
        nodeIp:nodeIp,
        rmsIp:rmsIp,
        createLink:swaggerIp+"orchestrator/createLink",
        socket:function(){
          if(socket){
            if(socket.disconnected){
                var socket = io.connect('http://localhost:9090');
                return socket;
            }
            return socket;
          }else{
                var socket = io.connect('http://localhost:9090');
          }
          return socket;
        },
        envSettings:swaggerIp+"orchestrator/ipDetails"

    };

});
