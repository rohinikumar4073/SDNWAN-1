define(['properties','nx'],function(propsMethods){
    var policyID;
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
                        iconType: '{#icon}'
                    },
                    linkConfig: {
                      color: function(link, model) {
                          debugger;
                          virtualID = link._data.id;
                          policyID = link._data.policyId;
                          if(link._data.virtual){
                             return '#CBDA5C';
                          }
                          if(link._data.dynamic){
                             return '#82CEAC';
                          }
                           return '#75C6EF';
                       },
                        linkType: 'curve',
                        policyID: 'policyID',
                    },  layoutType: 'USMap',
                    layoutConfig: {
                        longitude: 'model.longitude',
                        latitude: 'model.latitude'
                    },
                    identityKey: 'id',
                    showIcon: true
                }
            }
        },
        methods: {
            _ready: function(sender, event) {
                var topo = this.view('_topology');
            },
            loadTopologyData:function(){

            }


        },
        properties: {
icon: {
                value: function() {
                    return function(vertex) {
                        return vertex.get("iconType");
                    }
                }
            },
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
              propsMethods.saveTopologyData(topology.data(), topology)


          },get:function(){
            return "get1"
          }
              },

            width: function() {
                var width = $(window).width();
                return (width * 100) / 120 - 50;
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
