define([
        'react', 'jquery', 'properties', 'react-jsonschema-form', 'toastr'
], function(React, $, properties, Form, toastr){
    var FormHost = Form.default;

    const schema = {
      "type": "object",
      "properties": {
        "host_name": {
          "type": "string",
          "title": "Host Name",
          "minLength": 3,
          "maxLength": 20
        },
        "network_domain": {
          "type": "string",
          "title": "Network Domain",
          "minLength": 3,
          "maxLength": 40
        },
        "site_id":{
          "type": "string",
          "title": "Site ID",
          "minLength": 3,
          "maxLength": 8
        },
        "location_description":{
          "type": "string",
          "title": "Location Description",
          "minLength": 3,
          "maxLength": 50
        },
        "ipv4": {
          "type": "string",
          "title": "IPv4"
        },
        "ipv6": {
          "type": "string",
          "title": "IPv6"
        },
        "interfaces": {
          "title": "Interfaces",

            "type": "object",
            "properties": {
              "host_port_name": {
                "type": "string",
                "title": "Host Port Name"
              }
            },
            "required": ["host_port_name"]

        }
      },
      "required": ["host_name", "network_domain", "site_id", "interfaces"]
    };
    const uiSchema = {};
    const formData = {};

    var CreateHost = React.createClass({
      getInitialState: function() {
          return {formData: this.props.formData}
      },
      onSubmit: function(e) {
          this.handleConfirm(e.formData)
      },
      handleCancel: function() {
          this.props.close();
          if (this.props.onCancel) {
              this.props.onCancel();
          }
      },
      checkDuplicate: function(dat, hostname){
        if(dat){
          if(dat.nodes.length == 0){
            return true;
          }
          for(var i = 0; i < dat.nodes.length; i++){
            if(dat.nodes[i].label == hostname){
              return false;
            } else if(i == dat.nodes.length - 1){
              return true;
            } else {
              continue;
            }
          }
        } else {
          return true;
        }
      },
      validate: function(formData, error){

        return error;
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
                formData.id=id;
              self.setState({"formData":formData});
                console.log("Pushed the details.")
              },
              error: function(data) {
                console.log("Error in saving details.")
              }
          });
        } else {
          this.setState({"formData":{}});
        }
      },

      handleConfirm: function(data) {
      data.type= "host";
          var self = this;
          var check = true;
          var hostname = data["host_name"];

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
                    var portData={name: data["host_name"], ports: [], type: "host"};
                      portData.ports.push({name: data["interfaces"]["host_port_name"], status: "false"})
                      debugger;
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
                            debugger;
                              self.props.topologyModel.createNode(data["host_name"], self.props.iconType, self.props.coordinates);
                              self.props.close();
                              properties.addNode(data["host_name"], self.props.iconType)
                              debugger;
                              toastr.success("Host " + data["host_name"] + " added successfully");
                              var logData =
                                  {
                                    "configuration": "Create Host",
                                    "type": "success",
                                    "message": "Host created sucessfully!",
                                    "element": hostname
                                  }
                              $.ajax({
                                url: properties.saveLog,
                                type: 'post',
                                data: JSON.stringify(logData),
                                contentType: "application/json; charset=utf-8",
                                success: function(dataReturn){
                                  console.log("Log saved");
                                },
                                error: function(dataReturn){
                                  console.log("Log not saved");
                                }
                              })
                          } else {
                              toastr.error("Error in adding host " + data["host_name"])
                          }
                        },
                        error: function(data) {
                          var logData =
                              {
                                "configuration": "Create Host",
                                "type": "Failure",
                                "message": "Host not created sucessfully!",
                                "element": hostname
                              }
                          $.ajax({
                            url: properties.saveLog,
                            type: 'post',
                            data: JSON.stringify(logData),
                            contentType: "application/json; charset=utf-8",
                            success: function(dataReturn){
                              console.log("Log saved");
                            },
                            error: function(dataReturn){
                              console.log("Log not saved");
                            }
                          })
                            toastr.error("Not able to add Host");
                        }

                    });
                    var hostData={value: data, key: data["host_name"]+"_host"}
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
              this.props.topologyModel.updateNodeModel({name: data["host_name"], formData: this.state.formData});
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
                      <FormHost schema={schema} uiSchema={uiSchema} validate={this.validate} formData={this.state.formData} className="formFB" onSubmit={this.onSubmit} onError={errors => {
                          console.log("i am errors" + errors);
                      }} onSubmit={this.onSubmit} showErrorList={false}>
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
