define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr, Form) {
    var EmsForm = Form.default;
    const schema = {
        "type": "object",
        "title": "Polling Frequency Time",
        "properties": {
            "fb_inventory": {
                "type": "integer",
                "title": "FB Inventory Polling Frequency Time"
            },
            "system_status": {
                "type": "integer",
                "title": "System Status Polling Frequency Time"
            },
            "flow_count": {
                "type": "integer",
                "title": "Flow Count Polling Frequency Time"
            },
            "neighbor_discovery": {
                "type": "integer",
                "title": "Neighbour Discovery Polling Frequency Time"
            },
            "port_attributes": {
                "type": "integer",
                "title": "Port Attributes Polling Frequency Time"
            },
            "port_statistics": {
                "type": "integer",
                "title": "Port Statistics Polling Frequency Time"
            },
            "transceiver_inventory": {
                "type": "integer",
                "title": "Transceiver Inventory Polling Frequency Time"
            },
            "fb_ip": {
                "type": "string",
                "title": "FB IP"
            }
        }
    };
    const uiSchema = {};
    const formData = {};

    var EmsConfiguration = React.createClass({
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
                    toastr.success("Success! EMS Configuration Updated")
                },
                error: function(data) {
                    toastr.error("Error! Unable to update EMS Configuration")
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
                        <EmsForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={formData} onSubmit={this.onSubmit} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" className="btn btn-sm btn-primary" data="Save">Save</button>
                            </div>
                        </EmsForm>
                    </div>
                </div>
            )
        }
    });
    return EmsConfiguration;
});
