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
                url: properties.fbMonitor+ this.state.url,
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
            self.state.status = false;
            self.state.url = "save";

        },
        handleCancel:function(){
          this.props.setHidden("Monitor");
        },
        onDeploy: function() {
            var self = this;
            self.state.status = true;
            self.state.url = "deploy";
            $('#emsConfigSave').trigger('click');
        },
        getInitialState: function() {
              return {formData: {}, status: false, url: "save"}
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
                        <MonitoringForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={formData} onSubmit={this.onSubmit} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                              <button type="submit" id="emsConfigSave" className="btn btn-sm btn-primary" data="Save">Save</button>
                              <button type="button" onClick={this.onDeploy} className="btn btn-sm btn-primary" data="Deploy">Deploy</button>
                              <button onClick={this.handleCancel} type="button" className={"btn btn-sm btn-default"+this.props.buttonClassName} data="Cancel">Cancel</button>
                            </div>
                        </MonitoringForm>
                    </div>
                </div>
            )
        }
    });
    return MonitoringService;
});
