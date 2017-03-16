define([  'react','react-dom','jquery','jsx!components/ConfigurationForms/DynamicLinkConfiguration','properties','toastr','axios'], function(React,ReactDom,$,DynamicLinkConfiguration,properties,toastr,axios) {
    return {

          openDynamicLinkPopUp:function(configurationEvents,self,targetFBName){
            var DynamicLinkConfigurationFact = React.createFactory(DynamicLinkConfiguration);
            $("#pageModal").empty()
            var data={
              "configurationEvents":configurationEvents,
                submitMode: "Create",
                formData: {},
                className: "test",
                header:"Create Dynamic Link",
                currentNode:self,
                dynamicLinkService:this,
                source: configurationEvents.getSourceNodeDetails(),
                target: $("input[name='sourceSelcted']:checked").next().text(),
                targetFBName: targetFBName
            };
            ReactDom.render(
                DynamicLinkConfigurationFact(data),
                document.getElementById('pageModal'));
                debugger;
            $('#pageModal ')
                .modal(
                    'show')
          },

          setDynamicLink:function(configurationEvents,self,policyID){
            properties.getMaxNode({
                source: configurationEvents.getSourceNodeDetails().id,
                target: self
                    .node()
                    .id(),
                  dynamic:true,
                  policyId: policyID
            }, function(dataObj, length) {
                dataObj.id = length;
                self.topology().addLink(dataObj);
                properties.saveMaxNode(++length, "linkCounter");
                configurationEvents.saveNativeTopology(self
                    .topology().getData());
            }, "linkCounter");
            debugger;
          },
          editDynamicLink: function(policyData){
            debugger;
            var DynamicLinkConfigurationFact = React.createFactory(DynamicLinkConfiguration);
            $("#pageModal").empty()
            var data={
                submitMode: "Update",
                formData: policyData,
                className: "test",
                header:"Update Dynamic Link",
                dynamicLinkService:this
            };
            ReactDom.render(
                DynamicLinkConfigurationFact(data),
                document.getElementById('pageModal'));
                debugger;
            $('#pageModal ')
                .modal(
                    'show')
          }

      }
});
