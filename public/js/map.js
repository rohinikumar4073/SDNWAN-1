(function (nx, global) {

  
    
    
    var topologyData = {
            nodes: [
                {"id": 0, "x": 410, "y": 100, "name": "12K-1", "latitude": 45.5234, "ipaddress": "26.26.26.26", "isisarea": "72", "site": "por", "longitude": -122.676},
                {"id": 1, "x": 410, "y": 280, "name": "12K-2", "latitude": 40.7879, "ipaddress": "25.25.25.25", "isisarea": "72", "site": "nyc", "longitude": -74.0143},
                {"id": 2, "x": 660, "y": 280, "name": "Of-9k-03","latitude": 40.7879, "ipaddress": "25.25.25.25", "isisarea": "72", "site": "nyc", "longitude": -74.0143},
                {"id": 3, "x": 660, "y": 100, "name": "Of-9k-02", "latitude": 32.7153, "ipaddress": "27.27.27.27", "isisarea": "72", "site": "san", "longitude": -117.157},
                {"id": 4, "x": 180, "y": 190, "name": "Of-9k-01", "latitude": 36.137242513163, "ipaddress": "30.30.30.30", "isisarea": "72", "site": "sjc", "longitude": -120.754451723841}
            ],
            links: [
                {"source": 0, "target": 1},
                {"source": 1, "target": 2},
                {"source": 1, "target": 3},
                {"source": 4, "target": 1},
                {"source": 2, "target": 3},
                {"source": 2, "target": 0},
                {"source": 0, "target": 4},
                {"source": 0, "target": 3},
                {"source": 0, "target": 3},
                {"source": 0, "target": 3},
                {"source": 0, "target": 3},
                {"source": 0, "target": 3},
                {"source": 0, "target": 3},
                {"source": 0, "target": 3},
                {"source": 0, "target": 3},
                {"source": 0, "target": 3},
                {"source": 0, "target": 3},
                {"source": 0, "target": 3}
            ],
            nodeSet: [
                {id: 5, type: 'nodeSet', nodes: [2, 3], root: '2', "x": 660, "y": 190, "name": "Node set 1", iconType: 'router', "latitude": 63.391326, "ipaddress": "29.29.29.29", "isisarea": "72", "site": "sfc", "longitude": -149.8286774},
                {id: 6, type: 'nodeSet', nodes: [1, 5], root: '1', "x": 410, "y": 190, "name": "Node set 2", iconType: 'groupS', "latitude": 47.6062, "ipaddress": "28.28.28.28", "isisarea": "72", "site": "sea", "longitude": -122.332},
                {id: 7, type: 'nodeSet', nodes: [6, 0], root: '0', "x": 410, "y": 280, "name": "Node set 3", iconType: 'groupM', "latitude": 29.7633, "ipaddress": "20.20.20.20", "isisarea": "72", "site": "hst", "longitude": -95.3633},
                {id: 8, type: 'nodeSet', nodes: [7, 4], root: '4', "x": 410, "y": 280, "name": "Node set 4", iconType: 'groupL',  "latitude": 44.98, "ipaddress": "24.24.24.24", "isisarea": "72", "site": "min", "longitude": -93.2638}
            ]
        };

    
    
    nx.define('Map.US', nx.ui.Component, {
        view: {
            content: {
                name: 'topo',
                type: 'nx.graphic.Topology',
                props: {
                    adaptive: true,
                    nodeConfig: {
                        label: 'model.name',
                        iconType: 'model.iconType'
                    },
                    nodeSetConfig: {
                        label: 'model.id',
                        iconType: 'model.iconType'
                    },
                    showIcon: true,
                    theme: 'yellow',
                    identityKey: 'id',
                    adaptive: true,
                    layoutType: 'USMap',
                    layoutConfig: {
                        longitude: 'model.longitude',
                        latitude: 'model.latitude'
                    },
                    data: topologyData
                }
            }
        }
    });

})(nx, nx.global);
