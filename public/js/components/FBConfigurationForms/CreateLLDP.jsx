define([
    'react', 'jquery', 'properties', 'react-jsonschema-form'
], function(React, $, properties, Form) {
    var FormCreateLLDP = Form.default;
    const schema = {
      "type": "object",
      "properties": {
        "global_lldp_enable": {
          "type": "boolean",
          "title": "Global LLDP Enable",
          "default": true
        },
        "lldp_msg_tx_hold":{
          "type": "string",
          "title": "LLDP Message TX Hold",
          "default": "120"
        },
        "lldp_msg_tx_interval":{
          "type": "string",
          "title": "LLDP Message TX Interval",
          "default": "30"
        },
        "lldp_reinit_delay":{
          "type": "string",
          "title": "LLDP Reinit Delay",
          "default": "2"
        },
        "lldp_tx_delay":{
          "type": "string",
          "title": "LLDP TX Delay",
          "default": "2"
        },
        "fb_ip": {
          "type": "string",
          "title": "FB IP"
        }
      }
 };

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

    const formData = {};

    var CreateLLDP = React.createClass({

      componentDidMount: function(){
        var fbName = this.props.fbName;
        var lldpData;
        var self=this;
        debugger;

          $.ajax({
          url: properties.rmsIp + fbName + "/get-lldp",
          method: 'GET',
          data: "",
          contentType: "application/json; charset=utf-8",
          success: function(data){
            self.setState({formData: data})
          },
          error: function(data){
          }
        });
      },

      getInitialState:function(){
        return{formData: {}};
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
            "/set-lldp";
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

                        <FormCreateLLDP schema={schema} uiSchema={uiSchema} validate={this.validate} onSubmit={this.onSubmit} formData={this.state.formData} className="FormCreateLLDP configFB" onError={errors => {
                            console.log("i am errors" + errors);
                        }}>
                        </FormCreateLLDP>            );
        }
    });

    return CreateLLDP;

});
