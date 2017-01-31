define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr, Form) {

    var FormHost = Form.default;

    var CreateHost = React.createClass({
      validate:function(formData, errors){
        var ipv4 = /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/;
      formData["terminationPoint"].forEach(function(v,i){
        v["ipAddress"].forEach(function(t,s){
          if(t){
                 if (!t.match(ipv4)){
                    errors["terminationPoint"].addError("Invalid Ip Address");
                 }
               }
        })

      })
return errors;
      },

      onSubmit: function(e) {
          this.handleConfirm(e.formData)
      },

      checkDuplicate: function(dat,hostname){
        if(dat){
          if(dat.nodes.length == 0){
            return true;
          }
          for(var i=0;i<dat.nodes.length;i++){
            if(dat.nodes[i].label == hostname){
              return false;
            }
            else if(i==dat.nodes.length-1){
              return true;
            }
            else {
              continue;
            }
          }
        } else {
          return true;
        }
      },

      updateData:function(){
        if(this.props.submitMode != "Save"){

          var name=this.props.formData["name"]+"_host";
          var id=this.props.formData.id;
          var self=this;
          $.ajax({
              url: properties.nodeIp+"/getKey?key="+name ,
              type: 'get',
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                var formData=JSON.parse(data);
                // console.log(data);
                // debugger;
                formData.id=id;
              self.setState({"formData":formData});
                console.log("Pushed the details.")
              },
              error: function(data) {
                console.log("Error in saving details.")
              }
          });
        }else{
          this.setState({"formData":{
              "nodeId": "",
              "subnets": {
                  "staticSubnet": [
                      {
                          "subnetId": ""
                      }
                  ]
              },
              "terminationPoint": [
                  {
                      "hostPortName": "",
                      "ipAddress": [""],
                      "tpId": ""
                  }
              ],
              "type": "host"
          }});
        }
      },

        handleConfirm: function(data) {
        data.type= "host";
            var self = this;
            var check = true;
            var hostname = data["nodeId"];
            $.ajax({
              url: properties.getNativeTopologyData,
              type: 'get',
              contentType: "application/json; charset=utf-8",
              success: function(nodeData){
                var dat=JSON.parse(nodeData);
                if(self.props.submitMode !== "Update"){
                  check = self.checkDuplicate(dat, hostname);
                }
                    if(check){
                      var portData={name:data["nodeId"],ports:[],type:"host"};
                    data["terminationPoint"].forEach(function(v,i){
                        portData.ports.push({name:v["hostPortName"],status:"false"})
                    })
                      $.ajax({
                          url: properties.saveComponent,
                          type: 'post',
                          data: JSON.stringify(portData),
                          contentType: "application/json; charset=utf-8",
                          success: function(datareturn) {
                            if (datareturn == "success") {
                              if(self.props.submitMode == "Update"){
                                toastr.success("Host updated successfully");
                                return;
                              }
                                self.props.topologyModel.createNode(data["nodeId"],self.props.iconType, self.props.coordinates);
                                self.props.close();
                                properties.addNode(data["nodeId"], self.props.iconType)
                                toastr.success("Host " + data["nodeId"] + " added successfully")
                                console.log(data);
                            } else {
                                toastr.error("Error in adding host " + data["nodeId"] + " ")

                            }
                          },
                          error: function(data) {
                              toastr.error("Not able to add Host")
                          }

                      });
                      var hostData={value: data,key:data["nodeId"]+"_host"}
                      $.ajax({
                          url: properties.nodeIp+"/saveKey",
                          type: 'post',
                          data: JSON.stringify(hostData),
                          contentType: "application/json; charset=utf-8",
                          success: function(datareturn) {
                            console.log("saved the host detials")
                          },
                          error: function(data) {
                              toastr.error("Not able to save host detials")
                          }

                      });

                    }
                    else{
                      toastr.error("Node already exists. Provide a different name");
                    }
              },
              error: function(data){

              }
            });

            if (this.props.submitMode == "Update")
                this.props.topologyModel.updateNodeModel({name: data["nodeId"], formData: this.state.formData});
        this.props.close();
        },

        getInitialState: function() {

            return {
                schema:{
                    "type": "object",
                    "required": [
                      "nodeId",
                    ],
                    "properties": {
                        "nodeId": {
                            "type": "string",
                            "title": "Node Id"
                        },
                        "subnets": {
                          "required": [
                            "staticSubnet",
                          ],
                            "type": "object",
                            "title": "Subnets",
                            "properties": {
                                "staticSubnet": {
                                    "type": "array",
                                    "title": "Static Sub Net",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "subnetId": {
                                                "type": "string",
                                                "title": "Subnet Id"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        ,
                        "terminationPoint":
                            {
                              "type":"array",
                              "title":"Termination Point",
                              "items":{
                                  "type":"object",
                                "required":[  "hostPortName","ipAddress"],
                                "properties":{
                                  "hostPortName":{
                                    "type":"string",
                                    "title":"Host Port Name"
                                  },
                                  "ipAddress":{
                                      "title": "IP Address",
                                    "type":"array",
                                    "items":{
                                      "type":"string"
                                    }



                                  },
                                  "tpId": {
                                    "title":"TP ID",
                                    "type":"string"
                                  }
                                }
                              }


                            }
                    }
                },
               uiSchema :{},
               formData :{
                   "nodeId": "",
                   "subnets": {
                       "staticSubnet": [
                           {
                               "subnetId": ""
                           }
                       ]
                   },
                   "terminationPoint": [
                       {
                           "hostPortName": "",
                           "ipAddress": [""],
                           "tpId": ""
                       }
                   ],
                   "type": "host"
               },
                hostName: "",
                dataToBeSend: {}
            }
        },

        handleCancel: function() {

            if (this.props.onCancel) {
                this.props.onCancel();
            }
            this.props.close();
        },

        render: function() {
            return (

                <div className={"modal-content " + this.props.className}>
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.handleCancel}>
                            &times;</button>
                        <h3>{this.props.title}</h3>
                    </div>
                    <div className="modal-body">
                        <FormHost schema={this.state.schema} uiSchema={this.state.uiSchema} validate={this.validate} formData={this.state.formData} className="formFB" onSubmit={this.onSubmit} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                                <button onClick={this.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                            </div>
                        </FormHost>

                    </div>

                </div>

            );
        }
    });

    return CreateHost;

});
