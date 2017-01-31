define([
    'react', 'jquery', 'properties', 'react-jsonschema-form'
], function(React, $, properties, Form) {
    var FormCreateController = Form.default;

    const schema = {
        "title": "Create Controller",
          "type": "object",
          "properties": {
              "name": {
                  "type": "string",
                  "title": "Name"
              },
              "controller_ip":{
                "type": "string",
                "title": "Controller IP"
              },
              "of_port":{
                "type": "string",
                "title": "OF Port",
                "enum":[
                  "6633",
                  "6653"
                ]
              },
              "protocols":{
                "type": "string",
                "title": "Protocols",
                "enum": [
                  "TCP",
                  "UDP"
                ]
              },
              "fb_ip":{
                "type": "string",
                "title": "FB IP",
              }
          }



    };
    const uiSchema = {};
    const formData = {};

    var CreateController = React.createClass({
      validate:function(formData, errors){
        var ipv4 = /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/;
        if(formData["fb_ip"]){
          if (!formData["fb_ip"].match(ipv4)){
             errors["fb_ip"].addError("Invalid Ip Address");
             }
        }
return errors;
      },
      onSubmit: function(e) {
        var fbName = this.props.fbName;
        var jsonData = e.formData;
        debugger;
        var postURL = properties.rmsIp +
            fbName +
            "/set-controller";
var self=this;

        $
            .ajax({
                url: postURL,
                method: 'POST',
                data: JSON.stringify(jsonData),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                        self.props.configurationEvents.handleSuccess(data);

                },
                error: function(data) {
                    self.props.configurationEvents.handleError(data);
                }
            });
      },
        render: function() {
            return (

                        <FormCreateController schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} validate={this.validate} formData={this.props.formData} className="FormCreateController configFB" onError={errors => {
                        }}>
                        </FormCreateController>
            );
        }
    });

    return CreateController;

});
