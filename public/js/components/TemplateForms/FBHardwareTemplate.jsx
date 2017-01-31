define([
    'react', 'jsx!components/BootstrapButton', 'properties', 'toastr','react-jsonschema-form'
], function(React, BootstrapButton, properties, toastr, Form){
  var FBHardwareForm = Form.default;
  const schema={
    "type": "object",
    "properties":{
      "templateInfo": {
        "type": "object",
        "title": "Template Information",
        "properties": {
            "name": {
                "type": "string",
                "title": "Name"
            },
            "revision": {
                "type": "string",
                "title": "Revision"
            },
            "lastUpdatedBy": {
                "type": "string",
                "title": "Last Updated By"
            },
            "timeStamp": {
                "type": "string",
                "title": "Time Stamp",
                "format": "date-time"
            },
            "status": {
                "type": "string",
                "title": "Status",
                "enum": ["Draft", "Available", "Decommissioned"]
            },
            "templateCategory": {
                "type": "string",
                "title": "Template Category"
            }
        },
        "required": ["name"]
      },
      "manufacturer": {
        "title": "Manufacturer",
        "type": "string",
        "minLength": 2,
        "maxLength": 30
      },
      "supplier": {
        "title": "Supplier",
        "type": "string",
        "minLength": 2,
        "maxLength": 30
      },
      "orderable_part_number": {
        "title": "Orderable Part Number",
        "type": "string",
        "minLength": 2,
        "maxLength": 30
      },
      "description": {
        "title": "Description",
        "type": "string",
        "minLength": 2,
        "maxLength": 128
      },
      "clei":{
        "title": "CLEI",
        "type": "string",
        "oneOf":[
          {"minLength": 10, "maxLength": 10},
          {"minLength": 0, "maxLength": 0}
        ]
      },
      "interfaces":{
        "type": "array",
        "title": "Physical Interface",
    "items": {
      "type": "object",
      "properties": {
        "physical_interface": {
          "title": "Physical Interface",
          "type": "integer",
          "minimum": 0
        },
        "physical_interface_speed": {
          "title": "Physical Interface Speed/Type",
          "type": "string",
          "enum": [
            "10G_SFP+",
            "40G_QSFP+"
          ]
        }
      },
      "required": [
        "physical_interface",
        "physical_interface_speed"
      ],
      "additionalProperties": false
    },
    "additionalItems": false
      }
    }
  };
  function MyCustomWidget(props) {
      return <input defaultValue={Date()} className="form-control" disabled="true"/>;
  }
  const uiSchema = {
    "templateInfo": {
        "status": {
            "ui:widget": "radio",
            "ui:options": {
                "inline": true
            }
        },
        "timeStamp": {
            "ui:widget": MyCustomWidget
        },
        "templateCategory": {
            "ui:disabled": true
        }
    }
  };
  const formData = {
      "templateInfo": {
          "name": "HP_Altoline_6920",
          "templateCategory": "FB Hardware Template"
      },
      "manufacturer": "HP",
      "supplier": "OnX",
      "orderable_part_number": "JL167A",
      "description": "HPE AL 6920 48X 6Q O AC FB Swc",
      "clei": ""
  };

  var hardwareForm = React.createClass({
    onSubmit: function(e) {
      this.handleConfirm(e.formData)

    },
      handleConfirm: function(data) {
          var self = this;
          $.ajax({
              url: properties.templateIp + "createHardware",
              type: 'post',
              data: JSON.stringify(data),
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                  toastr.success("Success! A new instance is successfully created")
              },
              error: function(data) {
                  toastr.error("Error! Could not create an instance")
                  if (self.props.onConfirm) {
                      self.props.onConfirm(self.state.dataToBeSend);
                  }
              }

          });
          this.props.close();

      },
      handleCancel: function() {
          if (this.props.onCancel) {
              this.props.onCancel();
          }
      },
      render: function() {
          return (
              <div className={this.props.className}>
                  <div className="modal-header">
                      <button type="button" className="close" onClick={this.props.handleCancel}>
                          &times;
                      </button>
                      <h3>{this.props.header}</h3>
                  </div>
                  <div className="modal-body">

                    <FBHardwareForm  schema={schema} uiSchema={uiSchema} formData={formData}
                                onError={errors => {
                                  console.log("i am errors" + errors);
                                  }}
                                  onSubmit={this.onSubmit}>
                                  <div>
                                      <button type="submit" className="btn  btn-primary btn-sm fixedbt">Create New
                                      </button>
                                  </div>
                                     </FBHardwareForm>
                  </div>
                  <div className="modal-footer fixedspace">
                  </div>
              </div>

          )
      }
  });
  return hardwareForm;
});
