define([
    'react', 'jquery', 'properties', 'toastr','react-jsonschema-form'
], function(React, $, properties, toastr,Form) {
  var VpnBgpForm = Form.default;
  const schema = {
      "type": "object",
      "properties": {
        "vpnName":{
          "type": "string",
          "title": "VPN Name"
        },
        "ipv4":{
          "type":"object",
          "title":"IPv4",
          "properties":{
            "ipv4Enable":{
              "type": "boolean",
              "title": "IPv4 Enable"

            },
            "routerNameIpv4":{
              "type": "string",
              "title": "Router Name"
            },
            "portIpv4":{
              "type": "string",
              "title": "Port"
            },
            "ipAddressIpv4":{
              "type": "string",
              "title": "IP Address"
            },
            "bfdIpv4":{
              "type": "string",
              "title": "BFD"
            },
            "multiplierIpv4":{
              "type": "string",
              "title": "Multiplier"
            },
            "minIntervalIpv4":{
              "type": "string",
              "title": "Minimum Interval"
            }
          }
        },
        "ipv6":{
          "type":"object",
          "title":"IPv6",
          "properties":{
            "ipv6Enable":{
              "type": "boolean",
              "title": "IPv6 Enable"

            },
            "routerNameIpv6":{
              "type": "string",
              "title": "Router Name"
            },
            "portIpv6":{
              "type": "string",
              "title": "Port"
            },
            "ipAddressIpv6":{
              "type": "string",
              "title": "IP Address"
            },
            "bfdIpv6":{
              "type": "string",
              "title": "BFD"
            },
            "multiplierIpv6":{
              "type": "string",
              "title": "Multiplier"
            },
            "minIntervalIpv6":{
              "type": "string",
              "title": "Minimum Interval"
            }
          }
        }
      }
  };
  const uiSchema = {
    "ipv4":{
      "ipv4Enable":{
        "ui:widget": "radio",
        "ui:options": {
          "inline": true
        }
      }
    },
    "ipv6":{
      "ipv6Enable":{
        "ui:widget": "radio",
        "ui:options": {
          "inline": true
        }
      }
    }
  };
const formData = {};

var CreateBgpSession= React.createClass({
    /*  onClick : function(e){
  console.log("test");
    },*/
    onSubmit: function(e) {
        this.handleConfirm(e.formData)
    },

    handleConfirm: function(data) {
        var self = this;
        $.ajax({
            url: properties.vpnBgpSessionIp,
            type: 'post',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.success("Success! VPN BGP Session is created")
            },
            error: function(data) {
                toastr.error("Error! VPN BGP Session is not created")
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
                <VpnBgpForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={this.props.formData} onSubmit={this.onSubmit} onError={errors => {
                    console.log("i am errors" + errors);
                }} onSubmit={this.onSubmit}>
                    <div>
                        <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                        <button onClick={this.props.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                    </div>
                </VpnBgpForm>
                </div>
                <div className="modal-footer fixedspace"></div>
            </div>
        )
    }
});
    return CreateBgpSession;
});
