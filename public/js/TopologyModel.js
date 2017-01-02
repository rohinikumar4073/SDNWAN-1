define(['linkMode','properties', 'bootstrap'], function(linkMode,properties) {
    nx.define('com.cisco.TopologyModel', nx.data.ObservableObject, {
        properties: {
            nodeId: properties.getMaxNode(),
            linkId: 1,
            newNode: null,
            newLink: null,
            setLinkMode: null,
            setTopologyModel:null,
            renderData:null,
            updateNode:null,
            tooltipData:null
        },
        methods: {
          init: function () {
          this.tooltipData(new nx.data.ObservableCollection());
      },
          callrenderData:function(data){
            this.renderData(data);
          },
          settoolTipPorts:function(data){
            debugger;
        this.tooltipData().clear() ;
        var iconType="optical-switch";
              console.log("here ")
              var result = JSON.parse(data)
              if (iconType == "optical-switch") {
                  result = JSON.parse(result)
              }
              result.forEach(function(v, i) {
                      var res = null;
                      if (iconType == "optical-switch") {
                          res = v;
                      }else {
                          res = JSON.parse(v)
                      }
                      if (res.status == "false") {
                          res.isAllocated = false
                      } else {
                          res.isAllocated = true
                      }
                      this.tooltipData().add(res);


            }.bind(this))
          },
            createNode: function(label, iconType, coordinates) {

                var id = this.nodeId();
                var node = {
                    id: id,
                    label: label,
                    iconType: iconType
                };
                if (coordinates.x && coordinates.y) {
                    node.x = coordinates.x - 400;
                    node.y = coordinates.y - 90;
                } else {
                    node.x = Math.floor(Math.random() * 400);
                    node.y = Math.floor(Math.random() * 400);
                }


                this.newNode(node);
                this.nodeId(++id);
                return node.id;

            },
            createLink: function(inLink) {
                var id = this.linkId();
                inLink.id = id;
                this.newLink(inLink);
                this.linkId(++id);
            },
            setLinkMod: function() {
                linkMode.setFlag(true);

            },
            resetLinkMod: function() {
                linkMode.setFlag(false);
            },
             createLinkPatchPanel: function(inLink) {

                this.newLink(inLink);

            },
            setTopology:function(){
              var topology={};
               this.setTopologyModel(topology);

            }
        }
    });
});
