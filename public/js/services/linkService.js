define([  'react','react-dom','jquery','jsx!components/ConfigurationForms/VirtualLinkConfiguration','properties'], function(React,ReactDom,$,VirtualLinkConfiguration,properties) {
    return {
          openVirtualLinkPopUp:function(configurationEvents,self){
            var VirtualLinkConfigurationFact = React.createFactory(VirtualLinkConfiguration);
            $("#pageModal").empty()
            var data={
              "configurationEvents":configurationEvents,
                submitMode: "Create",
                formData: {},
                className: "test",
                header:"Create Virtual Link",
                currentNode:self,
                linkService:this
            };
            ReactDom.render(
                VirtualLinkConfigurationFact(data),
                document.getElementById('pageModal'));
            $('#pageModal ')
                .modal(
                    'show')
          },
          setVirtualLink:function(configurationEvents,self){
            properties.getMaxNode({
                source: configurationEvents.getSourceNodeDetails().id,
                target: self
                    .node()
                    .id(),
                  virtual:true
            }, function(dataObj, length) {
                dataObj.id = length;
                self
                    .topology()
                    .addLink(dataObj);
                properties.saveMaxNode(++length, "linkCounter");
                configurationEvents.saveNativeTopology(self
                    .topology().getData());
            }, "linkCounter");
          }
      }
});
