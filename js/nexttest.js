/**
 * 
 */

(function (nx, global) {

    var topologyData = {
        nodes: [
            {"id": 0, "name": "POD-DC1", "latitude": 45.5234, iconType: 'server', "longitude": -149.8286774},
            {"id": 1, "name": "POD-DC2", "latitude": 75.5234, iconType: 'server', "longitude": -149.8286774},
            {"id": 2, "name": "POD-DC3", "latitude": 95.5234, iconType: 'server', "longitude": -149.8286774},
            {"id": 3, "name": "FB1-DC1", "latitude": 50.5234, iconType: 'switch', "longitude": -169.8286774},
            {"id": 4, "name": "FB2-DC1", "latitude": 80.5234,iconType: 'switch', "longitude": -129.8286774},
            {"id": 5, "name": "FB1-DC2", "latitude": 95.5234,iconType: 'switch', "longitude": -119.8286774},
            {"id": 6, "name": "FB2-DC2", "latitude": 60.5234,iconType: 'switch', "longitude": -149.8286774},
            {"id": 7, "name": "FB1-DC3", "latitude": 70.5234,iconType: 'switch', "longitude": -129.8286774},
            {"id": 8, "name": "FB2-DC3", "latitude": 100.5234,iconType: 'switch', "longitude": -119.8286774},
            {"id": 9, "name": "OP-DC1", "latitude": 45.5234,iconType: 'router', "longitude": -93.8286774},
            {"id": 10, "name": "OP-DC2", "latitude": 45.5234,iconType: 'router', "longitude": -93.8286774},
            {"id": 11, "name": "OP-DC3", "latitude": 45.5234,iconType: 'router', "longitude": -93.8286774}
        ],
        links: [
            {"source": 0, "target": 3},
            {"source": 0, "target": 4},
            {"source": 1, "target": 5},
            {"source": 1, "target": 6},
            {"source": 2, "target": 7},
            {"source": 2, "target": 8},
            {"source": 3, "target": 9},
            {"source": 4, "target": 9},
            {"source": 5, "target": 10},
            {"source": 6, "target": 10},
            {"source": 7, "target": 11},
            {"source": 8, "target": 11},
            {"source": 9, "target": 10},
            {"source": 9, "target": 11},
            {"source": 10, "target": 11}
            
        ],
        nodeSet: [
            {id: 12, type: 'nodeSet', nodes: [0, 3, 4, 9 ], root: '9', "x": 660, "y": 190, "name": "Node set 1", iconType: 'groupM', "latitude": 63.391326, "longitude": -149.8286774},
            {id: 13, type: 'nodeSet', nodes: [1, 5, 6, 10 ], root: '10', "x": 410, "y": 190, "name": "Node set 2", iconType: 'groupM', "latitude": 50.391326, "longitude": -119.8286774},
            {id: 14, type: 'nodeSet', nodes: [2, 7, 8, 11 ], root: '11', "x": 410, "y": 280, "name": "Node set 3", iconType: 'groupM', "latitude": 45.391326, "longitude": -99.8286774},
            {id: 15, type: 'nodeSet', nodes: [12, 13, 14], root: '14', "x": 410, "y": 280, "name": "Node set 4", iconType: 'groupL', "latitude": 30.391326, "longitude": -81.8286774}
        ]
    };


    var Shell = nx.define(nx.ui.Application, {
          properties: {
            container: {"#layout":"dsfs"}
        },
        methods: {
            start: function () {
                //your application main entry

                // initialize a topology
                var topo = new nx.graphic.Topology({
                    // set the topology view's with and height
                    width: 900,
                    height: 900,
                    adaptive: true,
                    identityKey: 'id',
                    theme: 'yellow',
                    nodeConfig: {
                        label: 'model.name',
                        iconType: 'model.iconType'
                    },
                    nodeSetConfig: {
                        label: 'model.id',
                        iconType: 'model.iconType'
                    },
                    layoutType: 'USMap',
                    layoutConfig: {
                        longitude: 'model.longitude',
                        latitude: 'model.latitude'
                    },
                    // show node's icon, could change to false to show dot
                    showIcon: true
                });

                //set data to topology
                topo.data(topologyData);
                //attach topology to document
                topo.attach(this);
            },  getContainer: function () {
                if (this.container()) {
                    return new nx.dom.Element(document.getElementById("layout"));
                } else {
                    return new nx.dom.Element(document.getElementById("layout"));
                }
 
            }
        }
    });

    var shell = new Shell();

    /**
     * invoke start method
     */
    shell.start();
    
})(nx, nx.global);



