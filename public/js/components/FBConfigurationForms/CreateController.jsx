define([
    'react', 'jquery', 'properties', 'react-jsonschema-form', 'toastr'
], function(React, $, properties, Form, toastr) {
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
              "connect_protocol":{
                "type": "string",
                "title": "Protocols",
                "enum": [
                  "TCP",
                  "UDP"
                ]
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
      editController: function(e){
        var fbName = this.props.fbName;
        var jsonData = e.formData;
          var postURL = properties.rmsIp +
              fbName +
              "/controller/edit";
              debugger;
            var self = this;
            $.ajax({
              url: postURL,
              method: 'POST',
              data: JSON.stringify(jsonData),
              contentType: "application/json; charset=utf-8",
              success: function(data){
                // var val = self.props.configurationEvents.handleSuccess(data);
                // if(val){
                  var tr = self.props.tr;
                  tr.find("td:nth-child(1)").text(jsonData.name);
                  tr.find("td:nth-child(2)").text(jsonData.controller_ip);
                  tr.find("td:nth-child(3)").text(jsonData.of_port);
                  tr.find("td:nth-child(4)").text(jsonData.connect_protocol);
                  tr.find("td:nth-child(5)").text(jsonData.fb_ip);
                //}
              },
              error: function(data){
                toastr.error("Could not update data!");
              }
            })
      },
      onSubmit: function(e) {
        if(this.props.submitMode == "Update") {
          this.editController(e);
        }
        else{
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
                    var val = self.props.configurationEvents.handleSuccess(data);
                    if(val){
                      var tr = $('<tr>');
                      tr.append($('<td class=controllerName>').append(jsonData.name));
                      tr.append($('<td>').append(jsonData.controller_ip));
                      tr.append($('<td>').append(jsonData.of_port));
                      tr.append($('<td>').append(jsonData.connect_protocol));
                      tr.append($('<td>').append(jsonData.fb_ip));
                      tr.append($('<td>').append("<div class = 'popup-section'><i class= 'fa fa-pencil editController' aria-hidden='true'><div class='label-data'>Edit</div></i></div>"))
                      tr.append($('<td>').append("<div class = 'popup-section'><i class='fa fa-trash deleteController' aria-hidden='true'><div class='label-data'>Delete</div></i></div>"))
                      $("#viewController").find('tbody')
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

                        <FormCreateController schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} validate={this.validate} formData={this.props.formData} className="FormCreateController configFB" onError={errors => {
                        }}>

                        </FormCreateController>
            );
        }
    });

    return CreateController;

});
