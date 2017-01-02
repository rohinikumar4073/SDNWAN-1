define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr, Form) {
    var PublisherConfiguration = Form.default;
    const schema = {
        "title": "Publisher Configuration",
        "type": "object",
        "properties": {
            "includeStats": {
                "type": "string",
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
            this.props.close();
        },
        getInitialState: function() {
            return {}
        },

        render: function() {
            return (
                <div className={"modal-content " + this.props.className}>
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.props.handleCancel}>
                            &times;
                        </button>
                        <h3>{this.props.header}</h3>
                    </div>
                    <div className="modal-body">

                        <PublisherConfiguration schema={schema} uiSchema={uiSchema} formData={formData} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" className="btn  btn-primary btn-sm">Create New</button>
                            </div>
                        </PublisherConfiguration>
                    </div>
                    <div className="modal-footer">
                        <div className="row">
                            <div className="col-md-12 section-divider-bottom"></div>
                        </div>
                    </div>
                </div>

            )

        }
    });
    return CreatePublisherConfiguration;
});
