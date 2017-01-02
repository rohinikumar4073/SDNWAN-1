define(['properties','nx'],function(propsMethods){
    nx.graphic.Icons.registerIcon("fb-icon", "/css/images/ciscoicons/forwarding%20box.png", 36, 36);
    nx.graphic.Icons.registerIcon("optical-switch","/css/images/ciscoicons/optical%20switch.png", 36, 36);
    nx.graphic.Icons.registerIcon("patch-panel", "/css/images/ciscoicons/patchpanel.jpg", 75, 32);
    nx.graphic.Icons.registerIcon("host", "/css/images/ciscoicons/standard%20host.jpg", 24, 32);



    nx.define('com.cisco.TopologyView', nx.ui.Component, {
        view: {
            content: {
                name: '_topology',
                type: 'nx.graphic.Topology',
                props: {
                    width: '{#width}',
                    height: '{#height}',
                    tooltipManagerConfig: {
                        nodeTooltipContentClass: 'TooltipNode',
                        linkTooltipContentClass: 'TooltipLink'
                    },
                    nodeConfig: {
                        label: 'model.label',
                        iconType: 'model.iconType'
                    },
                    linkConfig: {
                        linkType: 'curve'
                    },
                    identityKey: 'id',
                    showIcon: true
                }
            }
        },
        methods: {
            _ready: function(sender, event) {
                var topo = this.view('_topology');

                //register icon to instance
                // topo.registerIcon("fbox", "/sdnwan/css/images/ciscoicons/optical%20amplifier.jpg", 32, 26);
                //  topo.registerIcon("opticalswitch", "/sdnwan/css/images/ciscoicons/optical%20transport.jpg", 32, 32);

            },
            loadTopologyData:function(){
              
            }


        },
        properties: {
          renderData:{
          set:function(data){
            var topo = this.view('_topology');
            topo.data(data)
          }
          }
          ,
          setTopologyModel: {
             set: function(s) {
            var topology = this.view('_topology');
              propsMethods.saveTopologyData(topology.data())


          },get:function(){
            return "get1"
          }
              },

            width: function() {
                var width = $(window).width();
                return (width * 75) / 100 - 50;
            },
            height: function() {
                var height = $(window).height();
                return (height - 156);
            },
            newNode: {
                set: function(inNode) {
                    if (inNode) {
                        var topology = this.view('_topology');
                        topology.addNode(inNode);
                    }
                }
            },
            newLink: {
                set: function(inLink) {
                    if (inLink) {
                        var topology = this.view('_topology');
                        debugger;
                        topology.addLink(inLink);
                    }
                }
            },
            updateNode:{
              set:function(data){
                var topology = this.view('_topology');
                if(data){
                var node=topology.getNode(data.formData.id)
                if(node){
                node.set("label",data.name);
                  topology.addNode(node)
              }
              $(".n-topology-tooltip").hide();
            }
              }
            },
            setLinkMode: {

                set: function(data) {

                    var topology = this.view('_topology');
                    topology.linkMode = true;

                }
            }
        }


    });
})
