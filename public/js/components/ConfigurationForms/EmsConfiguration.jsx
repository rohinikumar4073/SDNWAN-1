define([
    'react',
    'jquery',
    'properties',
    'toastr',
    'react-jsonschema-form',
    'react-dom'
], function(React, $, properties, toastr, Form, ReactDom) {
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
                url: properties.emsConfigIp + this.state.url,
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
            self.state.status = false;
            self.state.url = "save";
        },
        onDeploy: function() {
            var self = this;
            self.state.status = true;
            self.state.url = "deploy";
            $('#emsConfig').trigger('click');
        },
        getInitialState: function() {
            return {formData: {}, status: false, url: "save"}
        },
        handleCancel:function(){
          this.props.setHidden("EMS");
        },
        render: function() {
            return (
                <div className={this.props.className}>
                  <div className="modal-header">
                      <h3>{this.props.header}<button type="button" className="close" onClick={this.handleCancel}>
                          &times;
                      </button></h3>

                  </div>
                    <div className="configuration">
                        <EmsForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={this.state.formData} onSubmit={this.onSubmit} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" id="emsConfig" className="btn btn-sm btn-primary" data="Save">Save</button>
                                <button type="button" onClick={this.onDeploy} className="btn btn-sm btn-primary" data="Deploy">Deploy</button>
                                  <button onClick={this.handleCancel} type="button" className={"btn btn-sm btn-default"+this.props.buttonClassName} data="Cancel">Cancel</button>
                            </div>
                        </EmsForm>
                    </div>
                </div>
            )
        }
    });
    return EmsConfiguration;
});
