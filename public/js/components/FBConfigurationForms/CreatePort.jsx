define([
    'react', 'jquery', 'properties', 'react-jsonschema-form','toastr'
], function(React, $, properties, Form, toastr) {
    var FormCreatePort = Form.default;

    const schema = {
        "type": "object",
        "required":["name"],

          "properties": {
              "name": {
                  "type": "string",
                  "title": "Name"
              },
              "tp_id": {
                "type": "string",
                "title": "TP ID"
              },
              "tag":{
                "type": "integer",
                "title": "Tag"
              },
              "fb_ip":{
                "type": "string",
                "title": "FB IP",
              },
              "type":{
                "type": "string",
                "title": "Type"
              },
              "speed":{
                "type": "string",
                "title": "Speed"
              },
              "trunks":{
                "type":"array",
                "title":"Trunks",
                "items":{
                  "type":"string",
                }
              },
              "is_dac":{
                "type": "string",
                "title": "DAC",
                "enum":[
                  "True",
                  "False"
                ]
              },
              "vlan_mode":{
                "type":"string",
                "title":"Vlan Mode"
              },
              "flow_ctl": {
                "type": "string",
                "title": "Flow CTL"
              }
        }



    };
    const uiSchema = {
      "is_dac":{
        "ui:widget": "radio",
        "ui:options": {
          "inline": true
        }
      }
    };
    const formData = {};

    var CreatePort = React.createClass({
      getInitialState: function(){
        return{formData: {}}
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
      editPort: function(e){
        var fbName = this.props.fbName;
        var jsonData = e.formData;
          var postURL = properties.rmsIp +
              fbName +
              "/port/edit";
              debugger;
            var self = this;
            $.ajax({
              url: postURL,
              method: 'POST',
              data: JSON.stringify(jsonData),
              contentType: "application/json; charset=utf-8",
              success: function(data){
                var val = self.props.configurationEvents.handleSuccess(data);
                if(val){
                  var tr = self.props.tr;
                  tr.find("td:nth-child(1)").text(jsonData.name);
                  tr.find("td:nth-child(2)").text("");
                  tr.find("td:nth-child(3)").text(jsonData.tag);
                  tr.find("td:nth-child(4)").text(jsonData.fb_ip);
                  tr.find("td:nth-child(5)").text(jsonData.type);
                  tr.find("td:nth-child(6)").text(jsonData.speed);
                  tr.find("td:nth-child(7)").text(jsonData.is_dac);
                  tr.find("td:nth-child(8)").text(jsonData.vlan_mode);
                }
              },
              error: function(data){
                toastr.error("Could not update data!");
              }
            })
      },
      onSubmit: function(e) {
        if(this.props.submitMode == "Update") {
          debugger;
          this.editPort(e);
        }
        else{
          var fbName = this.props.fbName;
          var jsonData = e.formData;
          var postURL = properties.rmsIp +
              fbName +
              "/port/add";
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
                      tr.append($('<td class=portName>').append(jsonData.name));
                      tr.append($('<td>').append(""));
                      tr.append($('<td>').append(jsonData.tag));
                      tr.append($('<td>').append(jsonData.fb_ip));
                      tr.append($('<td>').append(jsonData.type));
                      tr.append($('<td>').append(jsonData.speed));
                      tr.append($('<td>').append(jsonData.is_dac));
                      tr.append($('<td>').append(jsonData.vlan_mode));
                      tr.append($('<td>').append("<div class = 'popup-section'><i class= 'fa fa-pencil editPort' aria-hidden='true'></i><div class='label-data'>Edit</div></div>"))
                      tr.append($('<td>').append("<div class = 'popup-section'><i class='fa fa-trash deletePort' aria-hidden='true'></i><div class='label-data'>Delete</div></div>"))
                      $("#viewPort").find('tbody')
                          .append(tr)
                    }
                  },
                  error: function(data) {
                      self.props.configurationEvents.handleError(data);
                  }
              });
        }

      },
        render: function() {
            return (

                        <FormCreatePort schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} validate={this.validate} formData={this.props.formData} className="FormCreatePort configFB" onError={errors => {
                        }}>
                        </FormCreatePort>
            );
        }
    });

    return CreatePort;

});
