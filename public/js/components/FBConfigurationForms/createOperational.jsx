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
              "controllerIp": {
                "type": "array",
                "title": "Controller IP",
                "items":{
                  "type": "string"
                }
              }
            }
          },
          uiSchema: {
            "fb_ip": {
              "ui:disabled": true,
              classNames: "row col-md-6 osMargin"
            },
            "datapath_id": {
              "ui:disabled": true,
              classNames: "row col-md-6 osMargin"
            },
            "controllerIp": {
              "ui:disabled": true,
              classNames: "row col-md-12 osMargin"
            }
          },
          formData: {
              "controllerIp": [
                ""
              ]
          }

        }
      },

      onSubmit: function(e){
        debugger;
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
            <FormOperational schema={this.state.schema} uiSchema={this.state.uiSchema} onSubmit={this.onSubmit} formData={this.state.formData} className="FormOperational configFB"
              onError={errors => {}}>
          </FormOperational>
          )
        }
    });
    return CreateOperational;
})
