define([
    'react', 'jquery', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, $, properties, toastr,Form) {
  var VpnForm = Form.default;
  const schema = {
      "type": "object",
      "properties": {
          "vpnName": {
              "type": "string",
              "title": "VPN Name"
          },
          "vlan": {
              "type": "object",
              "title": "VLAN",
              "properties":{
                "ipv4Enable": {
                  "type": "boolean",
                  "title": "IPv4",

                },
                "ipv4": {
                    "type": "string",
                    "title": "IPv4 Address"
                },
                "ipv6Enable": {
                  "type": "boolean",
                  "title": "IPv6",
                },
                "ipv6": {
                    "type": "string",
                    "title": "IPv6 Address"
                }
              }
          },
          "asn":{
            "type":"object",
            "title":"ASN",
            "properties":{
              "holdTime": {
                  "type": "string",
                  "title": "Hold Time"
              },
              "restartEnable": {
                "type": "boolean",
                "title": "Restart Enable"

              },
              "restart": {
                  "type": "string",
                  "title": "Restart"
              },
              "restartTime": {
                  "type": "string",
                  "title": "Restart Time"
              },
              "routeTime": {
                  "type": "integer",
                  "title": "Route Time"
              },
              "md5Key": {
                  "type": "string",
                  "title": "MD5 Key"
              }
            }
          }

      }
  };
  const uiSchema = {
    "vlan":{
      "ipv4Enable":{
        "ui:widget": "radio",
        "ui:options": {
          "inline": true
        }
      },
      "ipv4":{
        "classNames":"showIpv4"
      },
      "ipv6Enable":{
        "ui:widget": "radio",
        "ui:options": {
          "inline": true
        }
      },
      "ipv6":{
        "classNames":"showIpv6"
      }
    },
    "asn":{
      "restartEnable":{
        "ui:widget": "radio",
        "ui:options": {
          "inline": true
        }
      },
  "restart":{
    "classNames":"showRestart"
  },
  "restartTime":{
    "classNames":"showRestart"
  },
  "routeTime":{
    "classNames":"showRestart"
  }
    }
  };
  const formData = {
    "asn": {
        "routeTime": 120
    }
  };
  var CreateVpnBgp= React.createClass({
      /*  onClick : function(e){
    console.log("test");
      },*/
      onSubmit: function(e) {
          this.handleConfirm(e.formData)
      },

      handleConfirm: function(data) {
          var self = this;
          $.ajax({
              url: properties.vpnBgpIp,
              type: 'post',
              data: JSON.stringify(data),
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                  toastr.success("Success! VPN Policy is created")
              },
              error: function(data) {
                  toastr.error("Error! VPN Policy is not created")
              }

          });
          this.props.close();
      },
      onChange: function(vpnSchema) {
          if (vpnSchema.formData.vlan.ipv4Enable == true) {
              $(".showIpv4").show();
          } else if (vpnSchema.formData.vlan.ipv4Enable == false) {
              $(".showIpv4").hide();
          };

          if (vpnSchema.formData.vlan.ipv6Enable == true) {
              $(".showIpv6").show();
          } else if (vpnSchema.formData.vlan.ipv6Enable == false) {
              $(".showIpv6").hide();
          };
          if (vpnSchema.formData.asn.restartEnable == true) {
              $(".showRestart").show();
          } else if (vpnSchema.formData.asn.restartEnable == false) {
              $(".showRestart").hide();
          };
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
                  <VpnForm schema={schema} uiSchema={uiSchema} validate={this.validate} formData={formData} onChange={this.onChange} onSubmit={this.onSubmit} onError={errors => {
                      console.log("i am errors" + errors);
                  }} onSubmit={this.onSubmit}>
                      <div>
                          <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                          <button onClick={this.props.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                      </div>
                  </VpnForm>
                  </div>
                  <div className="modal-footer fixedspace"></div>
              </div>
          )
      }
  });
    return CreateVpnBgp;
});
