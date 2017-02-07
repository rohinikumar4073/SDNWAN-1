define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr, Form) {
    var CloneFbForm = Form.default;
    const schema = {
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "title": "New FB Name"
            }

        }
    };



    const uiSchema = {};
    const formData = {};
    var CreateClone = React.createClass({
        /*  onClick : function(e){
      console.log("test");
        },*/
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },

        handleConfirm: function(data) {
            var self = this;
            $.ajax({
                url: properties.vpnPolicyIp,
                type: 'post',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! Forwarding Box Cloned")
                },
                error: function(data) {
                    toastr.error("Error! Unable to clone Forwarding Box")
                }

            });
            this.props.close();
        },
        getInitialState: function() {
            return {}
        },
        handleCancel:function(){
          $('#pageModal ')
                  .modal(
                      'hide')
        },
        render: function() {
            return (
                <div className={"modal-content " + this.props.className}>
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.handleCancel}>
                            &times;
                        </button>
                        <h3>{this.props.header}</h3>
                    </div>
                    <div className="modal-body">
                        <CloneFbForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={this.props.formData} onSubmit={this.onSubmit} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                                <button onClick={this.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                            </div>
                        </CloneFbForm>
                    </div>
                    <div className="modal-footer fixedspace"></div>
                </div>
            )
        }
    });
    return CreateClone;
});
