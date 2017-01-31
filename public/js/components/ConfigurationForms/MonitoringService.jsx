define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr, Form) {
    var MonitoringForm = Form.default;
    const schema = {
        "type": "object",
        "title": "FB Monitoring Service",
        "properties": {
            "fb_name": {
                "type": "string",
                "title": "FB Name"
            },
            "fb_ip": {
                "type": "string",
                "title": "FB IP"
            }

        }
    };
    const uiSchema = {};
    const formData = {};
    var MonitoringService = React.createClass({
        /*  onClick : function(e){
  console.log("test");
    },*/
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },

        handleConfirm: function(data) {
            var self = this;
            $.ajax({
                url: properties.emsConfigIp,
                type: 'post',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! Monitoring Service Started")
                },
                error: function(data) {
                    toastr.error("Error! Unable to Start FB Monitoring Service")
                }

            });
            this.props.close();
        },
        getInitialState: function() {
            return {}
        },
        render: function() {
            return (
                <div className={this.props.className}>

                    <div className="configuration">
                        <MonitoringForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={formData} onSubmit={this.onSubmit} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" className="btn btn-sm btn-primary" data="Save">Start</button>
                                <button type="submit" className="btn btn-sm btn-primary" data="Save">Stop</button>
                            </div>
                        </MonitoringForm>
                    </div>
                </div>
            )
        }
    });
    return MonitoringService;
});
