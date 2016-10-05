(function (nx) {
        nx.graphic.Icons.registerIcon("fb-icon", "/sdnwan/css/images/ciscoicons/optical%20amplifier.jpg", 32, 26);
         nx.graphic.Icons.registerIcon("optical-fiber", "/sdnwan/css/images/ciscoicons/optical%20transport.jpg", 32, 32);
          nx.graphic.Icons.registerIcon("patch-panel", "/sdnwan/css/images/ciscoicons/pad.jpg", 32, 32);
           nx.graphic.Icons.registerIcon("host", "/sdnwan/css/images/ciscoicons/standard%20host.jpg", 32, 32);
         


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
                        label: 'model.id',
                        iconType:'model.iconType'
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

            }
        },
        properties: {
            width: function(){
                var width=$(window).width();
                return (width*75)/100 -25;
            },
            height:function(){
                var height=$(window).height();
                return (height-93);
            },
            newNode: {
                set: function (inNode) {
                    if (inNode) {
                        var topology = this.view('_topology');
                        topology.addNode(inNode);
                    }
                }
            },
            newLink: {
                set: function (inLink) {
                    if (inLink) {
                        var topology = this.view('_topology');
                        topology.addLink(inLink);
                    }
                }
            },
            setLinkMode:{

                 set: function (data) {
                    
                        var topology = this.view('_topology');
                        topology.linkMode=true;
                    
                }
            }
        }

        
    });
})(nx);