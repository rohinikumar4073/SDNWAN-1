define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr, Form) {
    var PeriodicConfiguration = Form.default;
    const schema = {
        "title": "Periodic Configuration",
        "type": "object",
        "properties": {
            "bootstrapServers": {
              "type":"array",
              "items":{
                "type":"string"
              },
                "title": "Bootstrap Servers"
            },
            "producerId": {
                "type": "string",
                "title": "Producer ID"
            }
        }
    };
    const uiSchema = {
        "bootstrapServers": {
            "ui:autofocus": true
        }
    };
    const formData = {};
    var CreatePeriodicConfiguration = React.createClass({
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },
        handleConfirm: function(data) {
            var self = this;
            $.ajax({
                url: properties.periodicConfiguration,
                type: 'post',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! Periodic Configuration is created")
                },
                error: function(data) {
                    toastr.error("Error! Periodic Configuration is not created")
                }
            });
        },
        getInitialState: function() {
            return {}
        },
        handleCancel:function(){
          this.props.setHidden("Periodic");
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
                        <PeriodicConfiguration schema={schema} uiSchema={uiSchema} formData={formData} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" className="btn  btn-primary btn-sm" data="Save">Save</button>
                                  <button onClick={this.handleCancel} type="button" className={"btn btn-sm btn-default"+this.props.buttonClassName}
                                  data="Cancel">Cancel</button>
                            </div>
                        </PeriodicConfiguration>
                    </div>
                </div>
            )
        }
    });
    return CreatePeriodicConfiguration;
});
