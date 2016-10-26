(function (nx) {

    nx.define('com.cisco.MainView', nx.ui.Component, {
        properties: {
            topologyData: {}
        },
        view: {
            content: [

                {
                    type: 'com.cisco.TopologyView',
                    props: {
                        newNode: '{newNode}',
                        newLink: '{newLink}',
                        setLinkMode:'{setLinkMode}',
                          topology:'{topology}'
                    }
                }
            ]
        }
    });

})(nx);
