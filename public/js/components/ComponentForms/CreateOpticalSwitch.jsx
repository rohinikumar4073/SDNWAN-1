define([
    'react', 'jquery', 'properties', 'react-jsonschema-form', 'toastr'
], function(React, $, properties, Form, toastr) {
    var FormOS = Form.default;

    const schema = {
        "type": "object",
        "required": ["name"],
        "properties": {
            "name": {
                "type": "string",
                "title": "Name"
            },
            "listOfPorts": {
                "type": "array",
                "title": "List of Ports",
                "items": {
                    "type": "object",
                    "required": [
                        "shelf", "slot", "subSlot", "port"
                    ],
                    "properties": {
                        "shelf": {
                            "type": "integer",
                            "title": "Shelf"
                        },
                        "slot": {
                            "type": "integer",
                            "title": "Slot"
                        },
                        "subSlot": {
                            "type": "integer",
                            "title": "SubSlot"
                        },
                        "port": {
                            "type": "integer",
                            "title": "Port"
                        }
                    }
                }
            }
        }
    };
    const uiSchema = {
        "listOfPorts": {
            "items": {
                "shelf": {
                    classNames: "row col-sm-3 osMargin"
                },
                "slot": {
                    classNames: "row col-sm-3 osMargin"
                },
                "subSlot": {
                    classNames: "row col-sm-3 osMargin"
                },
                "port": {
                    classNames: "row col-sm-3 osMargin"
                }
            }
        }
    };
    const formData = {};

    var CreateOpticalSwitch = React.createClass({

        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },
        getInitialState: function() {
            return {formData: this.props.formData}
        },
        validate: function(formData, error){
          var flag = 0;
          console.log(formData);
          for(var i=0;i<formData.listOfPorts.length;i++){
              for(var j=i+1;j<formData.listOfPorts.length;j++){
                if(JSON.stringify(formData.listOfPorts[i]) === JSON.stringify(formData.listOfPorts[j])){
                  flag = 1;
                  break;
                }
              }
              if(flag){
                break;
              }
          }
          if(flag){
            error["listOfPorts"].addError("List of Ports cannot have the same combination");
          }
          return error;
        },
        handleCancel: function() {
            this.props.close();
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        },
        componentDidMount:function(){
        },
        checkDuplicate: function(dat,osname){
          if(dat){
            if(dat.nodes.length == 0){
              return true;
            }
            for(var i=0;i<dat.nodes.length;i++){
              debugger;
              if(dat.nodes[i].label == osname){
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
            var name=this.props.formData.name+"_opticalData";
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
          }else{
            this.setState({"formData":{}});
          }
        },
        handleConfirm: function(data) {

            var self = this;
            var check = true;
            data.type = "optical-switch";
            var osname = data.name;
            $.ajax({
              url: properties.getNativeTopologyData,
              type: 'get',
              contentType: "application/json; charset=utf-8",
              success:function(nodeData){
                var dat=JSON.parse(nodeData);
                if(self.props.submitMode !== "Update"){
                  check = self.checkDuplicate(dat, osname);
                }
                  if(check){
                    var portDetails=[];
                    if(!data.ports){
                      data.ports=[];
                    }
                    if (data.listOfPorts) {
                        data.listOfPorts.forEach(function(v, i) {
                          var portData=data.name + ":" + "Shelf: " + v.shelf + " Slot: " + v.slot + " Subslot: " + v.subSlot + " Port: " + v.port;

                          if( data.ports.indexOf(portData)==-1){
                            portDetails.push({
                                name: portData,
                                status: "false"
                            })
                          }

                        })
                    }
                            data.ports=portDetails;
                        //socket.emit('component-save', JSON.stringify(data));
                        $.ajax({
                            url: properties.saveComponent,
                            type: 'post',
                            data: JSON.stringify(data),
                            contentType: "application/json; charset=utf-8",
                            success: function(datareturn) {
                                if (datareturn == "success") {
                                  if(self.props.submitMode == "Update"){
                                    toastr.success("Optical Switch updated successfully");
                                    return;
                                  }
                                    self.props.topologyModel.createNode(data.name, self.props.iconType, self.props.coordinates);
                                    self.props.close();
                                    properties.addNode(data.name, self.props.iconType)
                                    toastr.success("Optical Switch " + data.name + " added successfully")
                                } else {
                                    toastr.error("Error in adding Optical Switch " + data.name + " ")

                                }
                            },
                            error: function(data) {
                                toastr.error("Not able to add Optical Switch")
                            }

                        });

                        var opticalSwitchData={value: data,key:data.name+"_opticalData"}
                        $.ajax({
                            url: properties.nodeIp+"/saveKey",
                            type: 'post',
                            data: JSON.stringify(opticalSwitchData),
                            contentType: "application/json; charset=utf-8",
                            success: function(datareturn) {
                              console.log("saved the optical detials")
                            },
                            error: function(data) {
                                toastr.error("Not able to save optical detials")
                            }

                        });
                  }
                  else{
                    toastr.error("Node already exists. Provide a different name");
                  }
            },
            error: function(data) {
            }
          });



                if (this.props.submitMode == "Update")
                    this.props.topologyModel.updateNodeModel({name: data.name, formData: this.state.formData});
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
                        <FormOS schema={schema} uiSchema={uiSchema} formData={this.state.formData} validate={this.validate} className="formFB" onSubmit={this.onSubmit} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit} showErrorList={false}>
                            <div>
                                <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                                <button onClick={this.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                            </div>
                        </FormOS>
                    </div>

                </div>

            );
        }
    });

    return CreateOpticalSwitch;

});
