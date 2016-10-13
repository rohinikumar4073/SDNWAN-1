define(['linkMode','bootstrap'], function(linkMode) {
nx.define('com.cisco.TopologyModel', nx.data.ObservableObject, {
    properties: {
        nodeId: 1,
        linkId:1,
        newNode: null,
        newLink: null,
        setLinkMode:null
        },
    methods: {
        createNode: function (label,iconType,coordinates) {

          var id = this.nodeId();
          var node = {
              id: label,
              label:label,
                iconType: iconType
          };
          if(coordinates.x && coordinates.y){
            node.x=coordinates.x-350;
            node.y= coordinates.y-70;
          }else{
            node.x=Math.floor(Math.random() * 400);
            node.y=Math.floor(Math.random() * 400);
          }


            node =this.newNode(node);
            this.nodeId(++id);

        },
        createLink:function(inLink){
            var id = this.linkId();
            inLink.id = id;
            this.newLink(inLink);
            this.linkId(++id);
        },
        setLinkMod:function(){
            linkMode.setFlag(true);
        },
        resetLinkMod
        :function(){
            linkMode.setFlag(false);
        }
    }
});
});
