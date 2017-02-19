define([
  'react', 'jquery', 'properties', 'react-jsonschema-form','toastr','agGrid','reactCellRendererFactory','reactFilterFactory'
], function(React, $, properties, Form, toastr,agGridReact,reactCellRendererFactory,reactFilterFactory){
  var FormOperational = Form.default;
  var AgGridReactGRID=agGridReact.AgGridReact;

    var CreateOperational = React.createClass({
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
              "datapath_id": {
                "type": "string",
                "title": "Datapath ID"
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
          uiSchema: {},
          formData: {}

        }
      },

      onSubmit: function(e){
        var val = this.props.mode;
        if(val == "deploy"){
          e.formData["datapath_id"] = "";
          var jsonData = e.formData;
          var fbname = this.props.fbName;
          var postURL = properties.rmsIp + fbname + "/composite/deploy";
          console.log(e.formData);
          $.ajax({
            url: postURL,
            method: 'POST',
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            success: function(data){
              toastr.success("Data successfully deployed");
            },
            error: function(data){
              toastr.error("Could not deploy the data successfully");
            }
          })
        }
        else if (val == "save") {
          e.formData["datapath_id"] = "";
          var jsonData = e.formData;
          var fbname = this.props.fbName;
          var postURL = properties.rmsIp + fbname + "/composite/save";
          console.log(e.formData);
          $.ajax({
            url: postURL,
            method: 'POST',
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            success: function(data){
              toastr.success("Data successfully saved");
            },
            error: function(data){
              toastr.error("Could not deploy the data successfully");
            }
          })
        }

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
      componentDidMount: function(){
        var fbname = this.props.fbName;
        var getURL = properties.rmsIp + fbname + "/getOperationalData";
        var self = this;
        $.ajax({
          url: getURL,
          method: 'GET',
          data: "",
          contentType: "application/json; charset=utf-8",
          success: function(result){
            self.setState({formData: result})
          },
          error: function(data){
            toastr.error("Could not get the data!");
          }
        })
      },
      render: function() {

          return(
            <FormOperational schema={this.state.schema} uiSchema={this.state.uiSchema} onSubmit={this.onSubmit} validate={this.validate} formData={this.state.formData} className="FormOperational configFB"
              onError={errors => {}} showErrorList={false}>
          </FormOperational>
          )
        }
    });
    return CreateOperational;
})
