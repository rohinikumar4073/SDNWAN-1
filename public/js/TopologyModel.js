define(['linkMode', 'properties', 'jquery', 'd3','axios','bootstrap'], function(linkMode, properties, $,d3, axios) {
    nx.define('com.cisco.TopologyModel', nx.data.ObservableObject, {
        properties: {
            nodeId: 1,
            linkId: 1,
            newNode: null,
            newLink: null,
            setLinkMode: null,
            setTopologyModel: null,
            renderData: null,
            updateNode: null,
            tooltipData: null
        },
        methods: {
            init: function() {
                this.tooltipData(new nx.data.ObservableCollection());
            },
            saveNativeTopology: function() {
                this.setTopology()
                var topologyData = properties.getTopologyData();
                //  localStorage.setItem("topologyData", JSON.stringify(topologyData))
                $.ajax({
                    url: properties.saveNativeTopologyData,
                    type: 'post',
                    data: JSON.stringify(topologyData),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {

                    }
                })
            },
            callrenderData: function(data) {
                this.renderData(data);
            },
            settoolTipPorts: function(data) {
                this.tooltipData().clear();
                var iconType = "optical-switch";
                var result = JSON.parse(data)
                if (iconType == "optical-switch") {
                    result = JSON.parse(result)
                }
                result.forEach(function(v, i) {
                    var res = null;
                    if (iconType == "optical-switch") {
                        res = v;
                    } else {
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

            createNode: function(label, iconType, coordinates,isCloining) {
                properties.getMaxNode({label:label, iconType:iconType, coordinates:coordinates}, this.createNodeCallBack,"idCounter",this,isCloining)
            },
            createNodeCallBack: function(dataObj, id, self,isCloining) {
                //  var id = this.nodeId();
              var coordinates=dataObj.coordinates;
              var projection = d3.geo.albersUsa();

                var node = {
                    id: JSON.parse(id),
                    label: dataObj.label,
                    iconType: dataObj.iconType
                };
                if(!isCloining){
                var width = $(window).width();
                var smallWidth=(width * 25) / 100 ;
                if (coordinates.x && coordinates.y) {
                  node.x = coordinates.x - smallWidth-50;
                  node.y = coordinates.y -190;
                } else {
                    node.x = Math.floor(Math.random() * 400);
                    node.y = Math.floor(Math.random() * 400);
                }
              }else{
                debugger;
                node.x =coordinates.x;
                node.y = coordinates.y;
              }
                var p = projection.invert([node.x, node.y]);
                node.latitude=p[1];
                node.longitude=p[0];
                self.newNode(node);
                //  this.nodeId(++id);
                self.saveNativeTopology()
                properties.saveMaxNode(id + 1,"idCounter")
                return node.id;

            },
            createLinkCallBack: function(inLink,counter) {
                var id = counter;
                inLink.id = id;
                this.newLink(inLink);
                this.linkId(++id);
                this.saveNativeTopology();
                  properties.saveMaxNode(id + 1,"linkCounter")
            },
            createLink: function(inLink) {
              properties.getMaxLinkNode(inLink,this.createLinkCallBack,"linkCounter",this)
            },
            setLinkMod: function(isVirtual) {
                linkMode.setFlag(true);
                if(isVirtual == "virtual"){
                  linkMode.setVirtualFlag(true);
                }
                if(isVirtual == "dynamic"){
                  linkMode.setDynamicFlag(true);
                }
            },
            resetLinkMod: function(isVirtual) {
                linkMode.setFlag(false);
                if(isVirtual == "virtual"){
                  linkMode.setVirtualFlag(false);
                }
                if(isVirtual == "dynamic"){
                  linkMode.setDynamicFlag(false);
                }
            },
            createLinkPatchPanel: function(inLink) {
                this.newLink(inLink);
            },
            setTopology: function() {
                var topology = {};
                this.setTopologyModel(topology);

            },
            updateNodeModel: function(data) {
                this.updateNode(data)
                this.saveNativeTopology()
            }
        }
    });
});
