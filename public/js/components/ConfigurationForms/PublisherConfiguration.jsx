define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr, Form) {
    var PublisherConfiguration = Form.default;
    const schema = {
        "title": "Publisher Configuration",
        "type": "object",
        "properties": {
            "includeStats": {
                "type": "array",
                "items":{
                  "type":"string"
                },
                "title": "Include Stats"
            },
            "updateInterval": {
                "type": "integer",
                "title": "Update Interval"
            }
        }
    };
    const uiSchema = {
        "includeStats": {
            "ui:autofocus": true
        }
    };
    const formData = {};

    var CreatePublisherConfiguration = React.createClass({
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },
        handleCancel:function(){
          this.props.setHidden("Publisher");
        },
        handleConfirm: function(data) {
            var self = this;
            $.ajax({
                url: properties.publisherConfiguration,
                type: 'post',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! Publisher Configuration is created")
                },
                error: function(data) {
                    toastr.error("Error! Publisher Configuration is not created")
                }
            });
        },
        getInitialState: function() {
            return {}
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
                        <PublisherConfiguration schema={schema} uiSchema={uiSchema} formData={formData} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" id="publisher" className="btn  btn-primary btn-sm" data="Save">Save</button>
                                  <button onClick={this.handleCancel} type="button" className={"btn btn-sm btn-default"+this.props.buttonClassName}
                                  data="Cancel">Cancel</button>
                            </div>
                        </PublisherConfiguration>
                    </div>
                </div>
            )
        }
    });
    return CreatePublisherConfiguration;
});
