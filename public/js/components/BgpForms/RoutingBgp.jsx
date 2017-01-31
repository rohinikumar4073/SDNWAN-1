define([
    'react', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, properties, toastr, Form) {
    var BgpForm = Form.default;
    const schema = {
        "type": "object",
        "properties": {
            "appName": {
                "type": "string",
                "title": "App Name"
            },
            "hostName": {
                "type": "string",
                "title": "Host Name"
            },
            "asn": {
                "type": "string",
                "title": "ASN"
            },
            "ipv4Ip": {
                "type": "string",
                "title": "IPv4 IP"
            },
            "ipv6Ip": {
                "type": "string",
                "title": "IPv6 IP"
            },
            "primary": {
                "type": "string",
                "title": "Primary"
            }
        }
    };

    const uiSchema = {};
    const formData = {};
    var RoutingBgpData= React.createClass({
        /*  onClick : function(e){
      console.log("test");
        },*/
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },

        handleConfirm: function(data) {
            var self = this;
            $.ajax({
                url: properties.bgpRoutingIp,
                type: 'post',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! Routing Policy is created")
                },
                error: function(data) {
                    toastr.error("Error! Routing Policy is not created")
                }
            });
            this.props.close();
        },
        getInitialState: function() {
            return {
                dataToBeSend: {
                    "appName": "",
                    "hostName": "",
                    "asn": "",
                    "ipv4Ip": "",
                    "ipv6Ip": "",
                    "primary": ""
                }
            }
        },
        keyPressFunction: function(event) {
            var keycode = (event.keyCode
                ? event.keyCode
                : event.which);
            if (keycode == '13') {
                this.handleConfirm();
            }
            event.stopPropagation()
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
                    <BgpForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={this.props.formData} onSubmit={this.onSubmit} onError={errors => {
                        console.log("i am errors" + errors);
                    }} onSubmit={this.onSubmit}>
                        <div>
                            <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                            <button onClick={this.props.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                        </div>
                    </BgpForm>
                    </div>
                    <div className="modal-footer fixedspace"></div>
                </div>
            )
        }
    });
    return RoutingBgpData;
});
