define([
    'react', 'jsx!components/BootstrapButton', 'properties', 'toastr','react-jsonschema-form'
], function(React, BootstrapButton, properties, toastr,Form) {
  var SettingsForm = Form.default;
  const schema = {
      "type":"object",
      "title":"Environment Settings",
      "properties":{
        "kafka":{
          "type":"object",
          "title":"Kafka",
          "properties":{
            "ipAddress":{
              "type":"string",
              "title":"IP Address"
            },
            "port":{
              "type":"integer",
              "title":"Port"
            }
          }
        },
        "orchestrator":{
          "type":"object",
          "title":"Orchestrator",
          "properties":{
            "ipAddress":{
              "type":"string",
              "title":"IP Address"
            },
            "port":{
              "type":"integer",
              "title":"Port"
            }
          }
        },
        "rms":{
          "type":"object",
          "title":"RMS",
          "properties":{
            "ipAddress":{
              "type":"string",
              "title":"IP Address"
            },
            "port":{
              "type":"integer",
              "title":"Port"
            }
          }
        },
            "ems":{
          "type":"object",
          "title":"EMS",
          "properties":{
            "ipAddress":{
              "type":"string",
              "title":"IP Address"
            },
            "port":{
              "type":"integer",
              "title":"Port"
            }
          }
        }
      }
  };
  const uiSchema = {

  };
  const formData = {
  };

  var Environment= React.createClass({
    /*  onClick : function(e){
  console.log("test");
    },*/

    validate:function(formData, errors){
      var ipv4 = /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/;
      if(formData["ems"]["ipAddress"]){
        if (!formData["ems"]["ipAddress"].match(ipv4)){
           errors["ems"]["ipAddress"].addError("Invalid Ip Address");
           }
         }
        if(formData["rms"]["ipAddress"]){
          if (!formData["rms"]["ipAddress"].match(ipv4)) {
               errors["rms"]["ipAddress"].addError("Invalid Ip Address");
             }
        }
        if(formData["orchestrator"]["ipAddress"]){
          if (!formData["orchestrator"]["ipAddress"].match(ipv4)) {
               errors["orchestrator"]["ipAddress"].addError("Invalid Ip Address");
             }
        }
        if(formData["kafka"]["ipAddress"]){
          if (!formData["kafka"]["ipAddress"].match(ipv4)) {
               errors["kafka"]["ipAddress"].addError("Invalid Ip Address");
             }
        }


return errors;
    },
    onSubmit: function(e) {
        this.handleConfirm(e.formData)
    },

    handleConfirm: function(data) {
        var self = this;
        $.ajax({
            url: properties.envIp,
            type: 'post',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.success("Success! Added IP Details")
            },
            error: function(data) {
                toastr.error("Error! Unable to add IP Details")
            }

        });
        this.props.close();
    },
    getInitialState: function() {

        return {
          formData:{}
        }
    },
    componentDidMount: function(){

      var self = this;
      $.ajax({
          url: properties.orchestratorIp+"/getIp",
          type: 'get',
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            var formData = JSON.parse(data);
              self.setState({formData: formData});
              console.log("Pushed the details.")
          },
          error: function(data) {
              console.log("Error in saving details.")
          }

      });

    },
    render: function() {
        return (
            <div className={"modal-content " + this.props.className}>
                <div className="modal-header">
                    <button type="button" className="close" onClick={this.props.handleCancel}>
                        &times;
                    </button>
                    <h3>{this.props.header}</h3>
                </div>
                <div className="modal-body">
                <SettingsForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={this.state.formData} onSubmit={this.onSubmit} onError={errors => {
                    console.log("i am errors" + errors);
                }} onSubmit={this.onSubmit}>
                    <div>
                        <button type="submit" className="btn btn-sm btn-primary" data="Save">Save</button>
                        <button onClick={this.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                    </div>
                </SettingsForm>
                </div>
                <div className="modal-footer fixedspace"></div>
            </div>
        )
    }
  });

    return Environment;
});
