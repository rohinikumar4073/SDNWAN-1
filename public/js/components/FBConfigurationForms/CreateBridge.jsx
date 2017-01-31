define([
    'react', 'jquery', 'properties', 'react-jsonschema-form'
], function(React, $, properties, Form) {
    var FormCreateBridge = Form.default;

    const schema = {
        "type": "object",
        "required": [
   "name"
 ],
        "properties": {
            "name": {
                "type": "string",
                "title": "Name"
            },
            "datapath_type":{
              "type": "string",
              "title": "Datapath Type"
            },
            "protocols":{
              "type": "string",
              "title": "Protocols",
              "enum": [
                "OpenFlow12",
                "OpenFlow13",
                "OpenFlow14"
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

    var CreateBridge = React.createClass({
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
            "/add-bridge";
var self=this;

        $
            .ajax({
                url: postURL,
                method: 'POST',
                data: JSON.stringify(jsonData),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                  var val = self.props.configurationEvents.handleSuccess(data);
                  if(val){
                    var tr = $('<tr>')
                    tr.append($('<td>').append(jsonData.name));
                    tr.append($('<td>').append(jsonData.datapath_type));
                    tr.append($('<td>').append(jsonData.datapath_id));
                    tr.append($('<td>').append(jsonData.protocols));
                    tr.append($('<td>').append(jsonData.fb_ip));
                    $("#viewBridge").find('tbody')
                        .append(tr)
                  }
                },
                error: function(data) {
                    self.props.configurationEvents.handleError(data);
                }
            });
      },
        render: function() {
            return (

                        <FormCreateBridge schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} validate={this.validate} formData={this.props.formData} className="FormCreateBridge configFB" onError={errors => {
                        }}>
                        </FormCreateBridge>
            );
        }
    });

    return CreateBridge;

});
