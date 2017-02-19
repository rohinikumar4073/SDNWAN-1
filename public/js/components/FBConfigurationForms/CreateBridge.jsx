define([
    'react', 'jquery', 'properties', 'react-jsonschema-form'
], function(React, $, properties, Form) {
    var FormCreateBridge = Form.default;

    const schema = {
        "type": "object",
        "required": ["name"],
        "properties": {
            "name": {
                "type": "string",
                "title": "Name"
            },
            "datapath_type":{
              "type": "string",
              "title": "Datapath Type"
            },
            "fail_mode":{
              "type": "string",
              "title": "Fail Mode",
              "default": "secure"
            },
            "fb_ip":{
              "type": "string",
              "title": "FB IP",
            },
            "protocol":{
              "type": "string",
              "title": "Protocols",
              "enum": [
                "OpenFlow12",
                "OpenFlow13",
                "OpenFlow14"
              ]
            },
            "bridge_other_config":{
              "type": "object",
              "title": "Other Config",
              "properties": {
                "datapath-id": {
                  "type": "string",
                  "title": "Datapath ID"
                },
                "disable-in-band": {
                  "type": "string",
                  "title": "Disable In Band",
                  "default": "true"
                }
              }
            }
        }

    };
    const uiSchema = {};
    const formData = {};
    
    var CreateBridge = React.createClass({
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

      editBridge: function(e){
        var fbName = this.props.fbName;
        var jsonData = e.formData;
          var postURL = properties.rmsIp +
              fbName +
              "/edit-bridge";
              debugger;
            var self = this;
            debugger;
            $.ajax({
              url: postURL,
              method: 'POST',
              data: JSON.stringify(jsonData),
              contentType: "application/json; charset=utf-8",
              success: function(data){
                // var val = self.props.configurationEvents.handleSuccess(data);
                // if(val){
                  debugger;
                  var tr = self.props.tr;
                  console.log(tr.find("td:nth-child(2)"));
                  tr.find("td:nth-child(1)").html(jsonData.name);
                  tr.find("td:nth-child(2)").html(jsonData.datapath_type);
                  tr.find("td:nth-child(3)").html(jsonData["datapath-id"]);
                  tr.find("td:nth-child(4)").html(jsonData.protocol);
                  tr.find("td:nth-child(5)").html(jsonData.fb_ip);
                //}
              },
              error: function(data){
                toastr.error("Could not update data!");
              }
            })
      },
      onSubmit: function(e) {
        if(this.props.submitMode == "Update") {
          this.editBridge(e);
        }
        else{
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
                      tr.append($('<td class=bridgeName>').append(jsonData.name));
                      tr.append($('<td>').append(jsonData.datapath_type));
                      tr.append($('<td>').append(data["dataPathId"]));
                      tr.append($('<td>').append(jsonData.protocol));
                      tr.append($('<td>').append(jsonData.fb_ip));
                      tr.append($('<td>').append("<div class = 'popup-section'><i class= 'fa fa-pencil editBridge' aria-hidden='true'><div class='label-data'>Edit</div></i></div>"))
                      tr.append($('<td>').append("<div class = 'popup-section'><i class='fa fa-trash deleteBridge' aria-hidden='true'><div class='label-data'>Delete</div></i></div>"))
                      $("#viewBridge").find('tbody')
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

                        <FormCreateBridge schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} validate={this.validate} formData={this.props.formData} className="FormCreateBridge configFB" onError={errors => {
                        }}>

                        </FormCreateBridge>
            );
        }
    });

    return CreateBridge;

});
