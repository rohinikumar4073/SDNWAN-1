define([
    'react',
    'jsx!components/3dLayouts/MultiLayeredLayout',
    'jsx!components/3dLayouts/VerifiedLayout',
    'jsx!components/3dLayouts/DiscoveredLayout',
    'sockjs',
    'properties',
    'stomp'
], function(React, MultiLayeredLayout, VerifiedLayout, DiscoveredLayout, SockJS, properties) {
    var stompClient = null;
    var ThreeDLayout = React.createClass({
setParentState:function(data){
  this.setState(data);
},
        getInitialState: function() {

            return {modalHeading: "Nodata","heading":"","parentClass":"hidden","data":{},position:{top:0,left:0}};
        },
        componentWillUnmount: function() {
            if (stompClient != null && stompClient.connected) {
                stompClient.disconnect();
            }
        },
        componentDidMount: function() {
          this.setState({"parentClass":"hidden","data":{},position:{top:0,left:0}})
           var socket = new SockJS(properties.websocketStomp);
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function(frame) {
                //setConnected(true);
                console.log('Connected: ' + frame);
                var counter = 1;
                stompClient.subscribe('/topic/messages', function(getMultiLayerTopologyMessage) {
                  debugger;
                      var topology=JSON.parse(JSON.parse(getMultiLayerTopologyMessage.body).content);
                  if(topology && topology.type){
                      if(topology.type=="discovered"){
                        this.refs["discoveredlayout"].renderLayout(JSON.parse(topology.message))
                      }else   if(topology.type=="multilayer"){
                          this.refs["multilayered"].renderLayout(JSON.parse(topology.message))
                        }else  if(topology.type=="verified"){
                            this.refs["verifiedlayout"].renderLayout(JSON.parse(topology.message))
                          }
                  }
                    //  console.log(JSON.parse(getMultiLayerTopologyMessage.body).content);

                }.bind(this));
                stompClient.send("/app/kafka", {}, JSON.stringify({'name': 'vz-sdn.orchestrator.multilayer-topology'}));
                //setTimeout(stompClient.send("/app/kafka", {}, JSON.stringify({'name': 'vz-sdn.orchestrator.verified-packet-topology'})),1500);
                //setTimeout(stompClient.send("/app/kafka", {}, JSON.stringify({'name': 'vz-sdn.orchestrator.discovered-topology'})),1500);

            }.bind(this));
        /*    var target=""
            if (window.location.protocol == 'http:') {
				          target = 'ws://' + properties.webSocketIp ;
			               } else {
				            target = 'wss://' +properties.webSocketIp ;
			   }
         ws = new WebSocket(target);
			ws.onopen = function () {
			//	setConnected(true);
					console.log('Info: WebSocket connection opened.');
          	ws.send("getData");
			};
			ws.onmessage = function (event) {
				console.log('Received: ' + event.data);
        var topology=JSON.parse(event.data);
        if(topology.type){
            if(topology.type=="discovered"){
              this.refs["discoveredlayout"].renderLayout(JSON.parse(topology.message))
            }else   if(topology.type=="mutilayed"){
                this.refs["multilayered"].renderLayout(JSON.parse(topology.message))
              }else  if(topology.type=="verified"){
                  this.refs["verifiedlayout"].renderLayout(JSON.parse(topology.message))
                }
        }

			}.bind(this);
			ws.onclose = function () {
			//	setConnected(false);
					console.log('Info: WebSocket connection closed.');
			};*/
            var testData = {"type":"multilayer","message":"{\"multilayer-topology-message\": {\"multilayer-topology\": {\"network-topology\": {\"l1-services\": {\"l1-service\": [{\"path\": [{\"path-type\": \"working\", \"path-id\": \"SERV-1482242256959-1467A8W\", \"path-element\": [{\"z-endpoint\": \"GAMMA,Shelf: 3 Slot: 2 Subslot: 4 Port: 1\", \"a-endpoint\": \"ALPHA,Shelf: 1 Slot: 7 Subslot: 3 Port: 1\"}]}], \"service-id\": \"SERV-1482242256959-1467A8\"}, {\"path\": [{\"path-type\": \"working\", \"path-id\": \"SERV-1482242257224-BC6797W\", \"path-element\": [{\"z-endpoint\": \"GAMMA,Shelf: 3 Slot: 4 Subslot: 2 Port: 1\", \"a-endpoint\": \"EPSILON,Shelf: 3 Slot: 4 Subslot: 1 Port: 1\"}, {\"z-endpoint\": \"ALPHA,Shelf: 1 Slot: 26 Subslot: 1 Port: 1\", \"a-endpoint\": \"GAMMA,Shelf: 3 Slot: 2 Subslot: 3 Port: 1\"}]}], \"service-id\": \"SERV-1482242257224-BC6797\"}, {\"path\": [{\"path-type\": \"working\", \"path-id\": \"SERV-1482242257469-69701FW\", \"path-element\": [{\"z-endpoint\": \"ALPHA,Shelf: 1 Slot: 30 Subslot: 1 Port: 1\", \"a-endpoint\": \"BETA,Shelf: 3 Slot: 28 Subslot: 1 Port: 1\"}]}], \"service-id\": \"SERV-1482242257469-69701F\"}, {\"path\": [{\"path-type\": \"working\", \"path-element\": [{\"z-endpoint\": \"DELTA,Shelf: 3 Slot: 2 Subslot: 3 Port: 1\", \"a-endpoint\": \"ALPHA,Shelf: 1 Slot: 7 Subslot: 4 Port: 1\"}, {\"z-endpoint\": \"EPSILON,Shelf: 3 Slot: 10 Subslot: 1 Port: 1\", \"a-endpoint\": \"DELTA,Shelf: 3 Slot: 9 Subslot: 1 Port: 1\"}], \"path-id\": \"SERV-1482351753843-428968W\"}], \"service-id\": \"SERV-1482351753843-428968\"}]}, \"provisioned-version\": \"12345678-1234-4321-a123-1234567890ab\", \"multilayer-version\": \"d14b7ea9-1ec0-49de-b7e0-5c7c3be0a7a5\", \"port-mappings\": {\"port-mapping\": [{\"fb-node\": \"BETA-FB1\", \"node-port-mapping\": [{\"l1-switch-port\": \"BETA:3-2-1-1\", \"fb-port\": \"0\"}, {\"l1-switch-port\": \"BETA:3-2-2-1\", \"fb-port\": \"1\"}, {\"l1-switch-port\": \"BETA:3-7-2-1\", \"fb-port\": \"2\"}, {\"l1-switch-port\": \"BETA:3-7-4-1\", \"fb-port\": \"3\"}, {\"l1-switch-port\": \"BETA:3-7-9-1\", \"fb-port\": \"4\"}]}, {\"fb-node\": \"BETA-FB2\", \"node-port-mapping\": [{\"l1-switch-port\": \"BETA:3-7-10-1\", \"fb-port\": \"0\"}, {\"l1-switch-port\": \"BETA:3-7-11-1\", \"fb-port\": \"1\"}, {\"l1-switch-port\": \"BETA:3-7-12-1\", \"fb-port\": \"2\"}, {\"l1-switch-port\": \"BETA:3-7-13-1\", \"fb-port\": \"3\"}, {\"l1-switch-port\": \"BETA:3-7-14-1\", \"fb-port\": \"4\"}]}, {\"fb-node\": \"ALPHA-FB1\", \"node-port-mapping\": [{\"l1-switch-port\": \"ALPHA:1-1-1-1\", \"fb-port\": \"0\"}, {\"l1-switch-port\": \"ALPHA:1-2-1-1\", \"fb-port\": \"1\"}, {\"l1-switch-port\": \"ALPHA:1-2-2-1\", \"fb-port\": \"2\"}, {\"l1-switch-port\": \"ALPHA:1-7-1-1\", \"fb-port\": \"3\"}, {\"l1-switch-port\": \"ALPHA:1-7-9-1\", \"fb-port\": \"4\"}]}, {\"fb-node\": \"ALPHA-FB2\", \"node-port-mapping\": [{\"l1-switch-port\": \"ALPHA:1-7-10-1\", \"fb-port\": \"0\"}, {\"l1-switch-port\": \"ALPHA:1-7-11-1\", \"fb-port\": \"1\"}, {\"l1-switch-port\": \"ALPHA:1-7-12-1\", \"fb-port\": \"2\"}, {\"l1-switch-port\": \"ALPHA:1-7-13-1\", \"fb-port\": \"3\"}, {\"l1-switch-port\": \"ALPHA:1-7-14-1\", \"fb-port\": \"4\"}]}, {\"fb-node\": \"GAMMA-FB1\", \"node-port-mapping\": [{\"l1-switch-port\": \"GAMMA:3-2-1-1\", \"fb-port\": \"0\"}, {\"l1-switch-port\": \"GAMMA:3-2-2-1\", \"fb-port\": \"1\"}, {\"l1-switch-port\": \"GAMMA:3-2-7-1\", \"fb-port\": \"2\"}, {\"l1-switch-port\": \"GAMMA:3-2-8-1\", \"fb-port\": \"3\"}, {\"l1-switch-port\": \"GAMMA:3-2-9-1\", \"fb-port\": \"4\"}]}, {\"fb-node\": \"GAMMA-FB2\", \"node-port-mapping\": [{\"l1-switch-port\": \"GAMMA:3-14-1-1\", \"fb-port\": \"0\"}, {\"l1-switch-port\": \"GAMMA:3-14-2-1\", \"fb-port\": \"1\"}, {\"l1-switch-port\": \"GAMMA:3-14-3-1\", \"fb-port\": \"2\"}, {\"l1-switch-port\": \"GAMMA:3-14-4-1\", \"fb-port\": \"3\"}, {\"l1-switch-port\": \"GAMMA:3-14-5-1\", \"fb-port\": \"4\"}]}, {\"fb-node\": \"DELTA-FB1\", \"node-port-mapping\": [{\"l1-switch-port\": \"DELTA:3-2-7-1\", \"fb-port\": \"0\"}, {\"l1-switch-port\": \"DELTA:3-2-8-1\", \"fb-port\": \"1\"}, {\"l1-switch-port\": \"DELTA:3-2-9-1\", \"fb-port\": \"2\"}, {\"l1-switch-port\": \"DELTA:3-2-10-1\", \"fb-port\": \"3\"}, {\"l1-switch-port\": \"DELTA:3-2-11-1\", \"fb-port\": \"4\"}]}, {\"fb-node\": \"DELTA-FB2\", \"node-port-mapping\": [{\"l1-switch-port\": \"DELTA:3-14-1-1\", \"fb-port\": \"0\"}, {\"l1-switch-port\": \"DELTA:3-14-2-1\", \"fb-port\": \"1\"}, {\"l1-switch-port\": \"DELTA:3-14-3-1\", \"fb-port\": \"2\"}, {\"l1-switch-port\": \"DELTA:3-14-4-1\", \"fb-port\": \"3\"}, {\"l1-switch-port\": \"DELTA:3-14-5-1\", \"fb-port\": \"4\"}]}, {\"fb-node\": \"EPSILON-FB1\", \"node-port-mapping\": [{\"l1-switch-port\": \"EPSILON:3-2-1-1\", \"fb-port\": \"0\"}, {\"l1-switch-port\": \"EPSILON:3-2-2-1\", \"fb-port\": \"1\"}, {\"l1-switch-port\": \"EPSILON:3-2-3-1\", \"fb-port\": \"2\"}, {\"l1-switch-port\": \"EPSILON:3-2-4-1\", \"fb-port\": \"3\"}, {\"l1-switch-port\": \"EPSILON:3-2-7-1\", \"fb-port\": \"4\"}]}, {\"fb-node\": \"EPSILON-FB2\", \"node-port-mapping\": [{\"l1-switch-port\": \"EPSILON:3-2-8-1\", \"fb-port\": \"0\"}, {\"l1-switch-port\": \"EPSILON:3-2-9-1\", \"fb-port\": \"1\"}, {\"l1-switch-port\": \"EPSILON:3-2-10-1\", \"fb-port\": \"2\"}, {\"l1-switch-port\": \"EPSILON:3-2-11-1\", \"fb-port\": \"3\"}, {\"l1-switch-port\": \"EPSILON:3-2-12-1\", \"fb-port\": \"4\"}]}]}, \"topology\": [{\"node\": [{\"datapath-id\": \"0x102\", \"forwarding-box-name\": \"BETA-FB1\", \"type\": \"forwarding-box\", \"node-id\": \"BETA-FB1\", \"termination-point\": [{\"fb-port-name\": \"0\", \"tp-id\": \"tp0\"}, {\"fb-port-name\": \"1\", \"tp-id\": \"tp1\"}, {\"fb-port-name\": \"2\", \"tp-id\": \"tp2\"}, {\"fb-port-name\": \"3\", \"tp-id\": \"tp3\"}, {\"fb-port-name\": \"4\", \"tp-id\": \"tp4\"}], \"datapath-type\": \"hp\"}, {\"datapath-id\": \"0x103\", \"forwarding-box-name\": \"BETA-FB2\", \"type\": \"forwarding-box\", \"node-id\": \"BETA-FB2\", \"termination-point\": [{\"fb-port-name\": \"0\", \"tp-id\": \"tp0\"}, {\"fb-port-name\": \"1\", \"tp-id\": \"tp1\"}, {\"fb-port-name\": \"2\", \"tp-id\": \"tp2\"}, {\"fb-port-name\": \"3\", \"tp-id\": \"tp3\"}, {\"fb-port-name\": \"4\", \"tp-id\": \"tp4\"}], \"datapath-type\": \"hp\"}, {\"datapath-id\": \"0x100\", \"forwarding-box-name\": \"ALPHA-FB1\", \"type\": \"forwarding-box\", \"node-id\": \"ALPHA-FB1\", \"termination-point\": [{\"fb-port-name\": \"0\", \"tp-id\": \"tp0\"}, {\"fb-port-name\": \"1\", \"tp-id\": \"tp1\"}, {\"fb-port-name\": \"2\", \"tp-id\": \"tp2\"}, {\"fb-port-name\": \"3\", \"tp-id\": \"tp3\"}, {\"fb-port-name\": \"4\", \"tp-id\": \"tp4\"}], \"datapath-type\": \"hp\"}, {\"datapath-id\": \"0x101\", \"forwarding-box-name\": \"ALPHA-FB2\", \"type\": \"forwarding-box\", \"node-id\": \"ALPHA-FB2\", \"termination-point\": [{\"fb-port-name\": \"0\", \"tp-id\": \"tp0\"}, {\"fb-port-name\": \"1\", \"tp-id\": \"tp1\"}, {\"fb-port-name\": \"2\", \"tp-id\": \"tp2\"}, {\"fb-port-name\": \"3\", \"tp-id\": \"tp3\"}, {\"fb-port-name\": \"4\", \"tp-id\": \"tp4\"}], \"datapath-type\": \"hp\"}, {\"datapath-id\": \"0x104\", \"forwarding-box-name\": \"GAMMA-FB1\", \"type\": \"forwarding-box\", \"node-id\": \"GAMMA-FB1\", \"termination-point\": [{\"fb-port-name\": \"0\", \"tp-id\": \"tp0\"}, {\"fb-port-name\": \"1\", \"tp-id\": \"tp1\"}, {\"fb-port-name\": \"2\", \"tp-id\": \"tp2\"}, {\"fb-port-name\": \"3\", \"tp-id\": \"tp3\"}, {\"fb-port-name\": \"4\", \"tp-id\": \"tp4\"}], \"datapath-type\": \"hp\"}, {\"datapath-id\": \"0x105\", \"forwarding-box-name\": \"GAMMA-FB2\", \"type\": \"forwarding-box\", \"node-id\": \"GAMMA-FB2\", \"termination-point\": [{\"fb-port-name\": \"0\", \"tp-id\": \"tp0\"}, {\"fb-port-name\": \"1\", \"tp-id\": \"tp1\"}, {\"fb-port-name\": \"2\", \"tp-id\": \"tp2\"}, {\"fb-port-name\": \"3\", \"tp-id\": \"tp3\"}, {\"fb-port-name\": \"4\", \"tp-id\": \"tp4\"}], \"datapath-type\": \"hp\"}, {\"datapath-id\": \"0x106\", \"forwarding-box-name\": \"DELTA-FB1\", \"type\": \"forwarding-box\", \"node-id\": \"DELTA-FB1\", \"termination-point\": [{\"fb-port-name\": \"0\", \"tp-id\": \"tp0\"}, {\"fb-port-name\": \"1\", \"tp-id\": \"tp1\"}, {\"fb-port-name\": \"2\", \"tp-id\": \"tp2\"}, {\"fb-port-name\": \"3\", \"tp-id\": \"tp3\"}, {\"fb-port-name\": \"4\", \"tp-id\": \"tp4\"}], \"datapath-type\": \"hp\"}, {\"datapath-id\": \"0x107\", \"forwarding-box-name\": \"DELTA-FB2\", \"type\": \"forwarding-box\", \"node-id\": \"DELTA-FB2\", \"termination-point\": [{\"fb-port-name\": \"0\", \"tp-id\": \"tp0\"}, {\"fb-port-name\": \"1\", \"tp-id\": \"tp1\"}, {\"fb-port-name\": \"2\", \"tp-id\": \"tp2\"}, {\"fb-port-name\": \"3\", \"tp-id\": \"tp3\"}, {\"fb-port-name\": \"4\", \"tp-id\": \"tp4\"}], \"datapath-type\": \"hp\"}, {\"datapath-id\": \"0x108\", \"forwarding-box-name\": \"EPSILON-FB1\", \"type\": \"forwarding-box\", \"node-id\": \"EPSILON-FB1\", \"termination-point\": [{\"fb-port-name\": \"0\", \"tp-id\": \"tp0\"}, {\"fb-port-name\": \"1\", \"tp-id\": \"tp1\"}, {\"fb-port-name\": \"2\", \"tp-id\": \"tp2\"}, {\"fb-port-name\": \"3\", \"tp-id\": \"tp3\"}, {\"fb-port-name\": \"4\", \"tp-id\": \"tp4\"}], \"datapath-type\": \"hp\"}, {\"datapath-id\": \"0x109\", \"forwarding-box-name\": \"EPSILON-FB2\", \"type\": \"forwarding-box\", \"node-id\": \"EPSILON-FB2\", \"termination-point\": [{\"fb-port-name\": \"0\", \"tp-id\": \"tp0\"}, {\"fb-port-name\": \"1\", \"tp-id\": \"tp1\"}, {\"fb-port-name\": \"2\", \"tp-id\": \"tp2\"}, {\"fb-port-name\": \"3\", \"tp-id\": \"tp3\"}, {\"fb-port-name\": \"4\", \"tp-id\": \"tp4\"}], \"datapath-type\": \"hp\"}], \"link\": [{\"link-group-id\": \"ALPHA-FB2-GAMMA-FB2\", \"service-ref\": \"SERV-1482242256959-1467A8\", \"destination\": {\"dest-node\": \"GAMMA-FB2\", \"l1-switch-port\": \"GAMMA:3-14-2-1\", \"dest-tp\": \"tp1\"}, \"source\": {\"l1-switch-port\": \"ALPHA:1-7-11-1\", \"source-tp\": \"tp1\", \"source-node\": \"ALPHA-FB2\"}, \"link-id\": \"ALPHA-FB2-1-GAMMA-FB2-1\", \"link-validate\": \"do-not-validate\"}, {\"link-group-id\": \"BETA-FB1-ALPHA-FB2\", \"service-ref\": \"SERV-1482242257469-69701F\", \"destination\": {\"dest-node\": \"ALPHA-FB2\", \"l1-switch-port\": \"ALPHA:1-7-14-1\", \"dest-tp\": \"tp4\"}, \"source\": {\"l1-switch-port\": \"BETA:3-2-2-1\", \"source-tp\": \"tp1\", \"source-node\": \"BETA-FB1\"}, \"link-id\": \"BETA-FB1-1-ALPHA-FB2-4\", \"link-validate\": \"validate\"}, {\"link-group-id\": \"ALPHA-FB2-BETA-FB1\", \"service-ref\": \"SERV-1482242257469-69701F\", \"destination\": {\"dest-node\": \"BETA-FB1\", \"l1-switch-port\": \"BETA:3-2-2-1\", \"dest-tp\": \"tp1\"}, \"source\": {\"l1-switch-port\": \"ALPHA:1-7-14-1\", \"source-tp\": \"tp4\", \"source-node\": \"ALPHA-FB2\"}, \"link-id\": \"ALPHA-FB2-4-BETA-FB1-1\", \"link-validate\": \"validate\"}, {\"link-group-id\": \"EPSILON-FB1-ALPHA-FB1\", \"service-ref\": \"SERV-1482242257224-BC6797\", \"destination\": {\"dest-node\": \"ALPHA-FB1\", \"l1-switch-port\": \"ALPHA:1-2-1-1\", \"dest-tp\": \"tp1\"}, \"source\": {\"l1-switch-port\": \"EPSILON:3-2-2-1\", \"source-tp\": \"tp1\", \"source-node\": \"EPSILON-FB1\"}, \"link-id\": \"EPSILON-FB1-1-ALPHA-FB1-1\", \"link-validate\": \"validate\"}, {\"link-group-id\": \"ALPHA-FB1-EPSILON-FB1\", \"service-ref\": \"SERV-1482242257224-BC6797\", \"destination\": {\"dest-node\": \"EPSILON-FB1\", \"l1-switch-port\": \"EPSILON:3-2-2-1\", \"dest-tp\": \"tp1\"}, \"source\": {\"l1-switch-port\": \"ALPHA:1-2-1-1\", \"source-tp\": \"tp1\", \"source-node\": \"ALPHA-FB1\"}, \"link-id\": \"ALPHA-FB1-1-EPSILON-FB1-1\", \"link-validate\": \"validate\"}, {\"link-group-id\": \"GAMMA-FB2-ALPHA-FB2\", \"service-ref\": \"SERV-1482242256959-1467A8\", \"destination\": {\"dest-node\": \"ALPHA-FB2\", \"l1-switch-port\": \"ALPHA:1-7-11-1\", \"dest-tp\": \"tp1\"}, \"source\": {\"l1-switch-port\": \"GAMMA:3-14-2-1\", \"source-tp\": \"tp1\", \"source-node\": \"GAMMA-FB2\"}, \"link-id\": \"GAMMA-FB2-1-ALPHA-FB2-1\", \"link-validate\": \"do-not-validate\"}], \"topology-id\": \"of-l3-dci\", \"topology-types\": {\"ofl3-topology:of-l3\": {\"multilayer\": {}}}}]}}, \"producer-header\": {\"sent-time\": \"2017-02-01T20:22:07.537440Z\", \"producer-type\": \"orchestrator\", \"producer-id\": \"orchestrator\"}}}"}

        this.refs["multilayered"].renderLayout(JSON.parse(testData.message))

            var testData2 = {
                "verified-packet-topology-message": {
                    "verified-packet-topology": {
                        "network-topology": {
                            "verified-version": "fa53c7a0-bc8c-465a-bc3f-275ca5a33d34",
                            "discovered-version": "539dbacd-bf58-4c51-b91a-7d5f93e657de",
                            "multilayer-version": "2b7d8585-9596-4f73-956a-4b4f322a9135",
                            "topology": [
                                {
                                    "node": [
                                        {
                                            "datapath-id": "0x101",
                                            "forwarding-box-name": "ALPHA-FB2",
                                            "type": "forwarding-box",
                                            "node-id": "ALPHA-FB2",
                                            "termination-point": [
                                                {
                                                    "fb-port-name": "0",
                                                    "tp-id": "tp0"
                                                }, {
                                                    "fb-port-name": "1",
                                                    "tp-id": "tp1"
                                                }, {
                                                    "fb-port-name": "2",
                                                    "tp-id": "tp2"
                                                }, {
                                                    "fb-port-name": "3",
                                                    "tp-id": "tp3"
                                                }, {
                                                    "fb-port-name": "4",
                                                    "tp-id": "tp4"
                                                }
                                            ],
                                            "datapath-type": "hp"
                                        }, {
                                            "datapath-id": "0x105",
                                            "forwarding-box-name": "GAMMA-FB2",
                                            "type": "forwarding-box",
                                            "node-id": "GAMMA-FB2",
                                            "termination-point": [
                                                {
                                                    "fb-port-name": "0",
                                                    "tp-id": "tp0"
                                                }, {
                                                    "fb-port-name": "1",
                                                    "tp-id": "tp1"
                                                }, {
                                                    "fb-port-name": "2",
                                                    "tp-id": "tp2"
                                                }, {
                                                    "fb-port-name": "3",
                                                    "tp-id": "tp3"
                                                }, {
                                                    "fb-port-name": "4",
                                                    "tp-id": "tp4"
                                                }
                                            ],
                                            "datapath-type": "hp"
                                        }, {
                                            "datapath-id": "0x101",
                                            "forwarding-box-name": "ALPHA-FB2",
                                            "type": "forwarding-box",
                                            "node-id": "ALPHA-FB2",
                                            "termination-point": [
                                                {
                                                    "fb-port-name": "0",
                                                    "tp-id": "tp0"
                                                }, {
                                                    "fb-port-name": "1",
                                                    "tp-id": "tp1"
                                                }, {
                                                    "fb-port-name": "2",
                                                    "tp-id": "tp2"
                                                }, {
                                                    "fb-port-name": "3",
                                                    "tp-id": "tp3"
                                                }, {
                                                    "fb-port-name": "4",
                                                    "tp-id": "tp4"
                                                }
                                            ],
                                            "datapath-type": "hp"
                                        }, {
                                            "datapath-id": "0x105",
                                            "forwarding-box-name": "GAMMA-FB2",
                                            "type": "forwarding-box",
                                            "node-id": "GAMMA-FB2",
                                            "termination-point": [
                                                {
                                                    "fb-port-name": "0",
                                                    "tp-id": "tp0"
                                                }, {
                                                    "fb-port-name": "1",
                                                    "tp-id": "tp1"
                                                }, {
                                                    "fb-port-name": "2",
                                                    "tp-id": "tp2"
                                                }, {
                                                    "fb-port-name": "3",
                                                    "tp-id": "tp3"
                                                }, {
                                                    "fb-port-name": "4",
                                                    "tp-id": "tp4"
                                                }
                                            ],
                                            "datapath-type": "hp"
                                        }
                                    ],
                                    "link": [
                                        {
                                            "link-group-id": "ALPHA-FB2-GAMMA-FB2",
                                            "link-id": "ALPHA-FB2-1-GAMMA-FB2-1",
                                            "destination": {
                                                "dest-node": "GAMMA-FB2",
                                                "dest-tp": "tp1"
                                            },
                                            "source": {
                                                "source-tp": "tp1",
                                                "source-node": "ALPHA-FB2"
                                            }
                                        }, {
                                            "link-group-id": "GAMMA-FB2-ALPHA-FB2",
                                            "link-id": "GAMMA-FB2-1-ALPHA-FB2-1",
                                            "destination": {
                                                "dest-node": "ALPHA-FB2",
                                                "dest-tp": "tp1"
                                            },
                                            "source": {
                                                "source-tp": "tp1",
                                                "source-node": "GAMMA-FB2"
                                            }
                                        }
                                    ],
                                    "topology-id": "of-l3-dci",
                                    "topology-types": {
                                        "ofl3-topology:of-l3": {
                                            "verified": {}
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "producer-header": {
                        "sent-time": "2016-12-20T13:41:06.491431Z",
                        "producer-id": "orchestrator",
                        "producer-header": "orchestrator"
                    }
                }
            }
    //       this.refs["verifiedlayout"].renderLayout(testData2)
            var testData3 = {
                "discovered-topology-message": {
                    "discovered-topology": {
                        "network-topology": {
                            "discovered-version": "539dbacd-bf58-4c51-b91a-7d5f93e657de",
                            "topology": [
                                {
                                    "node": [
                                        {
                                            "datapath-id": "0x101",
                                            "forwarding-box-name": "ALPHA-FB2",
                                            "type": "forwarding-box",
                                            "node-id": "ALPHA-FB2",
                                            "termination-point": [
                                                {
                                                    "fb-port-name": "0",
                                                    "tp-id": "tp0"
                                                }, {
                                                    "fb-port-name": "1",
                                                    "tp-id": "tp1"
                                                }, {
                                                    "fb-port-name": "2",
                                                    "tp-id": "tp2"
                                                }, {
                                                    "fb-port-name": "3",
                                                    "tp-id": "tp3"
                                                }, {
                                                    "fb-port-name": "4",
                                                    "tp-id": "tp4"
                                                }
                                            ],
                                            "datapath-type": "hp"
                                        }, {
                                            "datapath-id": "0x105",
                                            "forwarding-box-name": "GAMMA-FB2",
                                            "type": "forwarding-box",
                                            "node-id": "GAMMA-FB2",
                                            "termination-point": [
                                                {
                                                    "fb-port-name": "0",
                                                    "tp-id": "tp0"
                                                }, {
                                                    "fb-port-name": "1",
                                                    "tp-id": "tp1"
                                                }, {
                                                    "fb-port-name": "2",
                                                    "tp-id": "tp2"
                                                }, {
                                                    "fb-port-name": "3",
                                                    "tp-id": "tp3"
                                                }, {
                                                    "fb-port-name": "4",
                                                    "tp-id": "tp4"
                                                }
                                            ],
                                            "datapath-type": "hp"
                                        }, {
                                            "datapath-id": "0x101",
                                            "forwarding-box-name": "ALPHA-FB2",
                                            "type": "forwarding-box",
                                            "node-id": "ALPHA-FB2",
                                            "termination-point": [
                                                {
                                                    "fb-port-name": "0",
                                                    "tp-id": "tp0"
                                                }, {
                                                    "fb-port-name": "1",
                                                    "tp-id": "tp1"
                                                }, {
                                                    "fb-port-name": "2",
                                                    "tp-id": "tp2"
                                                }, {
                                                    "fb-port-name": "3",
                                                    "tp-id": "tp3"
                                                }, {
                                                    "fb-port-name": "4",
                                                    "tp-id": "tp4"
                                                }
                                            ],
                                            "datapath-type": "hp"
                                        }, {
                                            "datapath-id": "0x105",
                                            "forwarding-box-name": "GAMMA-FB2",
                                            "type": "forwarding-box",
                                            "node-id": "GAMMA-FB2",
                                            "termination-point": [
                                                {
                                                    "fb-port-name": "0",
                                                    "tp-id": "tp0"
                                                }, {
                                                    "fb-port-name": "1",
                                                    "tp-id": "tp1"
                                                }, {
                                                    "fb-port-name": "2",
                                                    "tp-id": "tp2"
                                                }, {
                                                    "fb-port-name": "3",
                                                    "tp-id": "tp3"
                                                }, {
                                                    "fb-port-name": "4",
                                                    "tp-id": "tp4"
                                                }
                                            ],
                                            "datapath-type": "hp"
                                        }
                                    ],
                                    "link": [
                                        {
                                            "link-group-id": "ALPHA-FB2-GAMMA-FB2",
                                            "link-id": "ALPHA-FB2-1-GAMMA-FB2-1",
                                            "destination": {
                                                "dest-node": "GAMMA-FB2",
                                                "dest-tp": "tp1"
                                            },
                                            "source": {
                                                "source-tp": "tp1",
                                                "source-node": "ALPHA-FB2"
                                            }
                                        }, {
                                            "link-group-id": "GAMMA-FB2-ALPHA-FB2",
                                            "link-id": "GAMMA-FB2-1-ALPHA-FB2-1",
                                            "destination": {
                                                "dest-node": "ALPHA-FB2",
                                                "dest-tp": "tp1"
                                            },
                                            "source": {
                                                "source-tp": "tp1",
                                                "source-node": "GAMMA-FB2"
                                            }
                                        }
                                    ],
                                    "topology-id": "of-l3-dci",
                                    "topology-types": {
                                        "ofl3-topology:of-l3": {
                                            "verified": {}
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "producer-header": {
                        "sent-time": "2016-12-20T13:41:01.402822Z",
                        "producer-type": "orchestrator",
                        "producer-id": "orchestrator"
                    }
                }
            }
      //    this.refs["discoveredlayout"].renderLayout(testData3)

        },
        render: function() {
            return (
                <div className="row">
                    <div className={"link-text-style threed-data " + this.state.parentClass} style={this.state.position}>
                        <h4 className="hoveredObject">{this.state.heading}</h4>
                        <div>
                            <span className="left">Datapath Id
                            </span>
                            <span className="center">:</span>
                            <span className="right">{this.state.data["datapath-id"]}</span>
                        </div>
                        <div>
                            <span className="left">Type
                            </span>
                            <span className="center">:</span>
                            <span className="right">{this.state.data["type"]}</span>
                        </div>
                    </div>

                    <div className="col-sm-12">
                        <MultiLayeredLayout ref="multilayered" setParentState={this.setParentState}> </MultiLayeredLayout>
                    </div>
                    <hr></hr>
                    <div className="col-sm-6">
                        <VerifiedLayout ref="verifiedlayout" setParentState={this.setParentState}></VerifiedLayout>
                    </div>
                    <div className="col-sm-6">
                        <DiscoveredLayout ref="discoveredlayout" setParentState={this.setParentState}></DiscoveredLayout>
                    </div>
                </div>

            )

        }
    });
    return ThreeDLayout;

});
