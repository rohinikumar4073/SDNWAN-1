define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr, Form) {
    var PeriodicConfiguration = Form.default;
    const schema = {
        "title": "Periodic Configuration",
        "type": "object",
        "properties": {
            "bootstrapServers": {
                "type": "string",
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

                        <PeriodicConfiguration schema={schema} uiSchema={uiSchema} formData={formData} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" className="btn  btn-primary btn-sm">Create New</button>
                            </div>
                        </PeriodicConfiguration>
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
    return CreatePeriodicConfiguration;
});
