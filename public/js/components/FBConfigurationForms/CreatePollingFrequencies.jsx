define([
    'react', 'jquery', 'properties', 'react-jsonschema-form'
], function(React, $, properties, Form) {
    var FormCreatePollingFrequencies = Form.default;

    const schema = {
        "type": "object",
        "properties": {
            "counter_query_interval": {
                "type": "integer",
                "title": "Counter Query Interval"
            },
            "sfp_query_interval":{
              "type": "integer",
              "title": "SFP Query Interval"
            },
            "sfp_enable":{
              "type": "string",
              "title": "SFP Enable",
              "enum":[
                "True",
                "False"
              ]
            },
            "alarm_enable":{
              "type": "string",
              "title": "Alarm Enable",
              "enum": [
                "True",
                "False"
              ]
            },
            "counter_enable":{
              "type": "string",
              "title": "Counter Enable",
              "enum": [
                "True",
                "False"
              ]
            },
            "alarm_high_temp":{
              "type": "integer",
              "title": "Alarm High Temp"
            },
            "alarm_low_temp":{
              "type": "integer",
              "title": "Alarm Low Temp"
            },
            "hwflow_enable":{
              "type": "string",
              "title": "HW Flow Enable",
              "enum": [
                "True",
                "False"
              ]
            },
            "hwflow_query_interval":{
              "type": "integer",
              "title": "HW Flow Query Interval"
            }
        }
    };
    const uiSchema = {
      "sfp_enable":{
        "ui:widget": "radio",
        "ui:options": {
          "inline": true
        }
      },
      "alarm_enable":{
        "ui:widget": "radio",
        "ui:options": {
          "inline": true
        }
      },
      "counter_enable":{
        "ui:widget": "radio",
        "ui:options": {
          "inline": true
        }
      },
      "hwflow_enable":{
        "ui:widget": "radio",
        "ui:options": {
          "inline": true
        }
      }
    };
    const formData = {};

    var CreatePollingFrequencies = React.createClass({
      componentDidMount: function(){
        var fbName = this.props.fbName;
        var pollingData;
        var self=this;
        debugger;

          $.ajax({
          url: properties.rmsIp + fbName + "/get-pollingfrequency",
          method: 'GET',
          data: "",
          contentType: "application/json; charset=utf-8",
          success: function(data){
            debugger;
            self.setState({formData: data})
          },
          error: function(data){
          }
        });
      },

      getInitialState:function(){
        return{formData: {}};
      },
      onSubmit: function(e) {
        var fbName = this.props.fbName;
        var jsonData = e.formData;
        debugger;
        var postURL = properties.rmsIp +
            fbName +
            "/configure/polling-frequency";
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

                        <FormCreatePollingFrequencies schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} formData={this.state.formData} className="FormCreatePollingFrequencies configFB" onError={errors => {
                            console.log("i am errors" + errors);
                        }}>
                        </FormCreatePollingFrequencies>
            );
        }
    });

    return CreatePollingFrequencies;

});
