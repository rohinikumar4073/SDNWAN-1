define(['bootstrap'], function() {
nx.define('com.cisco.TopologyModel', nx.data.ObservableObject, {
    properties: {
        nodeId: 1,
        linkId:1,
        newNode: null,
        newLink: null,
        setLinkMode:null
    },
    methods: {
        createNode: function (label,iconType) {
            //$('body').append('<div class="idNameDiv form-group" style="padding:10px;position: fixed;width: 400px;border: 1px solid grey;top: 20%;left: 40%;z-index: 1;"><label for="idName">Enter Label</label><input type="text" id="idName" class="form-control" placeholder="Label for id"></input><button class="btn btn-primary" id="idNameSubmit" type="submit" style="min-height:20px;margin-top:10px;">Submit</button></div>');
            //alert("idName");

            //$('#myModal1').modal({backdrop: 'static',keyboard: false});

            //$('#myModal1').modal('show');

            var id = this.nodeId();
            var node = {
                id: label,
                x: Math.floor(Math.random() * 400),
                y: Math.floor(Math.random() * 400),
                label:label,
                  iconType: iconType
            };
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
            this.setLinkMode();
        }
    }
});
});