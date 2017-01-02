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
                          setTopologyModel:'{setTopologyModel}',
                          renderData:'{renderData}',
                          updateNode:'{updateNode}',
                          tooltipData:'{tooltipData}'
                    }
                }
            ]
        }
    });

})(nx);
