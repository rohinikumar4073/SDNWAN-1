define([
  'react', 'jquery', 'properties', 'react-jsonschema-form','toastr','agGrid','reactCellRendererFactory','reactFilterFactory','services/renderService'
], function(React, $, properties, Form, toastr,agGridReact,reactCellRendererFactory,reactFilterFactory,renderService){
  var editMode;
  var FormConfigurational = Form.default;
  var AgGridReactGRID=agGridReact.AgGridReact;

    var CreateConfigurational = React.createClass({
      getInitialState: function(){
        return{
          schema:
          {
            "type": "object",
            "properties": {
              "fb_ip": {
                "type": "string",
                "title": "FB IP"
              },
              "controller_ip": {
                "type": "array",
                "title": "Controller IP",
                "items":{
                  "type": "string"
                }
              }
            }
          },
          uiSchema: {
            "fb_ip":{
              classNames: "row col-md-12 osMargin"
            },
            "controller_ip":{
              classNames: "row col-md-12 osMargin"
            }
          },
          formData: {}

        }
      },

      onSubmit: function(e){
        var a =[];
        var toggleStatus;
        var val = this.props.mode;
        var portData = renderService.getRadioStatus();
        portData.forEach(function(v,i){
          var individualPorts = {
            "port": {
              "is_dac": v.status,
              "name": v.name,
              "speed": ""
            },
            "activationStatus": v.toggle
          }
          a.push(individualPorts);
        })

        if(editMode == "edit" && val == "save"){
          val = "";
          var jsonData = e.formData;
          var fbname = this.props.fbName;
          var postURL = properties.rmsIp + fbname + "/Composite";
          var dataToBeSent = {
            "controller_ip": e.formData.controller_ip,
            "fb_ip": e.formData.fb_ip,
            "listPort": a,
          };
          debugger;
          $.ajax({
            url: postURL,
            method: 'POST',
            data: JSON.stringify(dataToBeSent),
            contentType: "application/json; charset=utf-8",
            success: function(data){
              toastr.success("Data successfully edited");
              a = [];
            },
            error: function(data){
              toastr.error("Could not edit the data successfully");
            }
          })
        }

        if(val == "deploy"){
          var jsonData = e.formData;
          var fbname = this.props.fbName;
          var postURL = properties.rmsIp + fbname + "/deployComposite";
          console.log(e.formData);
          var dataToBeSent = {
            "controller_ip": e.formData.controller_ip,
            "fb_ip": e.formData.fb_ip,
            "listPort": a,
          };
          debugger;
          $.ajax({
            url: postURL,
            method: 'POST',
            data: JSON.stringify(dataToBeSent),
            contentType: "application/json; charset=utf-8",
            success: function(data){
              toastr.success("Data successfully deployed");
              a = [];
            },
            error: function(data){
              toastr.error("Could not deploy the data successfully");
            }
          })
        }

        else if (val == "save") {
          var jsonData = e.formData;
          var fbname = this.props.fbName;
          debugger;
          var postURL = properties.rmsIp + fbname + "/Composite";
          var dataToBeSent = {
            "controller_ip": e.formData.controller_ip,
            "fb_ip": e.formData.fb_ip,
            "listPort": a,
          };
          debugger;
          $.ajax({
            url: postURL,
            method: 'POST',
            data: JSON.stringify(dataToBeSent),
            contentType: "application/json; charset=utf-8",
            success: function(data){
              toastr.success("Data successfully saved");
              a = [];
            },
            error: function(data){
              toastr.error("Data could not be saved");
            }
          })
        }
      },
      componentDidMount: function(){
        var controllerArray = [];
        var fbname = this.props.fbName;
        var getURL = properties.rmsIp + fbname + "/getConfigData";
        var self = this;
        $.ajax({
          url: getURL,
          method: 'GET',
          data: "",
          contentType: "application/json; charset=utf-8",
          success: function(result){
            debugger;
            if(result){
              result.controllers.forEach(function(v,i){
                controllerArray.push(v.controller_ip);
              })
              result.controller_ip = controllerArray;
              debugger;
              self.setState({formData: result});
              editMode = "edit";
              debugger;
            }

          },
          error: function(data){
            toastr.error("Could not get the data!");
          }
        })
      },
      validate: function(formData, errors){
        var ipv4 = /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/;
        if(formData["fb_ip"]){
          if (!formData["fb_ip"].match(ipv4)){
             errors["fb_ip"].addError("Invalid Ip Address");
             }
        }

        return errors;
      },

      render: function() {

          return(
            <FormConfigurational schema = {this.state.schema} uiSchema = {this.state.uiSchema} onSubmit = {this.onSubmit} validate = {this.validate} formData = {this.state.formData} className = "FormConfigurational configFB" onError = {errors => {
            }} showErrorList = {false}>
            </FormConfigurational>
          );

      }
    });
    return CreateConfigurational;
});
