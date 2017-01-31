define([
    'react', 'jquery', 'properties', 'react-jsonschema-form'
], function(React, $, properties, Form) {
    var FormCreateARP = Form.default;

    const schema = {
        "type": "object",
        "properties": {
            "arp_subnet": {
                "type": "array",
                "title": "ARP Subnet",
                "items": {
                  "type": "string"
                }
            },
            "nd_subnet":{
              "type": "array",
              "title": "ND Subnet",
              "items": {
                "type": "string"
              }
            }
        }

    };
    const uiSchema = {};
    const formData = {};

    var CreateARP = React.createClass({
      onSubmit: function(e) {
        var fbName = this.props.fbName;
        var jsonData = e.formData;
        debugger;
        console.log(jsonData);
        var postURL = properties.rmsIp +
            fbName +
            "/configure/neighbor-discovery";
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

                        <FormCreateARP schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} formData={this.props.formData} className="FormCreateARP configFB" onError={errors => {
                            console.log("i am errors" + errors);
                        }}>
                        </FormCreateARP>
            );
        }
    });

    return CreateARP;

});
