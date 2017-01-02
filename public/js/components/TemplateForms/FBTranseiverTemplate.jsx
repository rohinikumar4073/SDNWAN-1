define([
    'react', 'jsx!components/BootstrapButton', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, BootstrapButton, properties, toastr, Form) {

  var FbTransForm = Form.default;
  const schema = {
      "type": "object",
      "properties": {
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
              "type": "string",
              "title": "Manufacturer"
          },
          "orderablePartNo": {
              "type": "string",
              "title": "Orderable Part Number"
          },
          "description": {
              "type": "string",
              "title": "Description"
          },
          "clei": {
              "type": "string",
              "title": "CLEI"
          },
          "materialId": {
              "type": "string",
              "title": "Material ID (from Vz procurement system)"
          },
          "powerSupplyType": {
              "type": "string",
              "title": "Power Supply Type",
              "enum": ["AC", "DC"]
          },
          "maxPowerRating": {
              "type": "string",
              "title": "Max Power Rating(Watts)"
          },
          "airFlow": {
              "type": "string",
              "title": "Air Flow",
              "enum": ["Front-to-Back", "Back-to-Front"]
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
      },
      "airFlow": {
          "ui:widget": "radio",
          "ui:options": {
              "inline": true
          }
      },
      "powerSupplyType": {
          "ui:widget": "radio",
          "ui:options": {
              "inline": true
          }
      }
  };

  const formData = {
      "templateInfo": {
          "templateCategory": "Transeiver Template"
      }
  };



    var FBTranseiverData = React.createClass({
      onSubmit: function(e) {

          this.handleConfirm(e.formData)

      },
        handleConfirm: function(data) {
            var self = this;
            $.ajax({
                url: properties.templateIp + "createTransceiver",
                type: 'post',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! Transeiver Template is successfully created")
                },
                error: function(data) {
                    toastr.error("Error! Could not create a Transeiver Template")

                }

            });
            this.props.close();

        },
        getInitialState: function() {
            return {}
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

                    <FbTransForm schema={schema} uiSchema={uiSchema} formData={formData} onError={errors => {
                        console.log("i am errors" + errors);
                    }} onSubmit={this.onSubmit}>
                    <div>
                        <button type="submit" className="btn  btn-primary btn-sm fixedbt">Create New
                        </button>
                    </div>
                    </FbTransForm>

                  </div>
                  <div className="modal-footer fixedspace">
                  </div>
              </div>


            )
        }
    });
    return FBTranseiverData;

});
