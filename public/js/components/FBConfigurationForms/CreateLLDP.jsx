define([
    'react', 'jquery', 'properties', 'react-jsonschema-form'
], function(React, $, properties, Form) {
    var FormCreateLLDP = Form.default;

    const uiSchema = {

      "per_interface_settings":{
        "port_name":{
          classNames: "row col-sm-3 osMargin"
        },
        "rxtx":{
          "ui:widget": "radio",
          "ui:options": {
            "inline": true
          },
          classNames: "row col-sm-3 osMargin"
        }
      }
    };

    const formData = {
      "per_interface_settings":{
        "port_name": "Test"
      }
    };

    var CreateLLDP = React.createClass({


      componentDidMount: function(){
        var LLDPschema = this.state.schema;
        fbName = this.props.fbName;
        var getURL = properties.rmsIp +
            fbName +
            "/list-ports";
        $.get(getURL, function(result) {
            var collection = result;
            var rows = [];
            // result.forEach(function(v,i){
            //   LLDPschema.properties["per_interface_settings"]["port_name"].defaultValue = "Test";
            // })
            this.setState({schema: LLDPschema});
        }.bind(this));
      },
      getInitialState:function(){
        return {
          schema : {
           "type": "object",
           "properties": {
               "fb_br": {
                   "type": "string",
                   "title": "FB BR"
               },
               "fb_ip":{
                 "type": "string",
                 "title": "FB IP"
               },
               "per_interface_settings": {
                 "type": "object",
                 "title": "Per Interface Setting",
                 "properties": {
                   "port_name": {
                     "type": "string",
                     "title": "Port Name"
                   },
                   "rxtx":{
                     "type": "string",
                     "title": "RX/TX",
                     "enum": [
                       "rx",
                       "tx"
                     ]
                   }
                 }
               }
           }

       }
     }
      },
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
        console.log(jsonData);
        debugger;
          jsonData["per_interface_settings"]={};
        var postURL = properties.rmsIp +
            fbName +
            "/set-lldp/perint";
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

                        <FormCreateLLDP schema={this.state.schema} uiSchema={uiSchema} validate={this.validate} onSubmit={this.onSubmit} formData={formData} className="FormCreateLLDP configFB" onError={errors => {
                            console.log("i am errors" + errors);
                        }}>
                        </FormCreateLLDP>            );
        }
    });

    return CreateLLDP;

});
