define([
    'react', 'jquery', 'properties', 'react-jsonschema-form'
], function(React, $, properties, Form) {
    var FormCreateSSL = Form.default;

    const schema = {
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "title": "Name"
            },
            "private_key":{
              "type": "string",
              "title": "Private Key"
            },
            "certificate":{
              "type": "string",
              "title": "Certificate"
            },
            "ca_cert":{
              "type": "string",
              "title": "CA Cert"
            },
            "bootstrap_ca_cert":{
              "type": "string",
              "title": "Bootstrap CA Cert"
            },
            "fb_ip":{
              "type": "string",
              "title": "FB IP",
              "format": "ipv4"
            }
        }
    };
    const uiSchema = {};
    const formData = {};

    var CreateSSL = React.createClass({
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
        var postURL = properties.rmsIp +
            fbName +
            "/ssl";
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

                        <FormCreateSSL schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} validate={this.validate} formData={this.props.formData} className="FormCreateSSL configFB" onError={errors => {
                            console.log("i am errors" + errors);
                        }}>
                      </FormCreateSSL>
            );
        }
    });

    return CreateSSL;

});
