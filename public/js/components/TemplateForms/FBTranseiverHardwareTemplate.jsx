define([
    'react', 'jsx!components/BootstrapButton', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, BootstrapButton, properties, toastr, Form) {

  var FbTransForm = Form.default;
  const schema = {
      "type": "object",
      "required":[
        "name",
        "transceiver_type",
        "manufacturer",
        "supplier",
        "orderablePartNo",
        "description"
      ],
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
          "transceiver_type":{
            "title": "Transceiver Type",
              "type": "string",
              "enum": [
                "SFP+",
                "QSFP+"
              ]
          },
          "manufacturer": {
              "type": "string",
              "title": "Manufacturer",
              "minLength": 2,
              "maxLength": 30
          },
          "supplier":{
            "type": "string",
            "title": "Supplier",
            "minLength": 2,
            "maxLength": 30
          },
          "orderablePartNo": {
              "type": "string",
              "title": "Orderable Part Number",
              "minLength": 2,
              "maxLength": 30
          },
          "description": {
              "type": "string",
              "title": "Description",
              "minLength": 2,
              "maxLength": 128
          },
          "clei": {
              "type": "string",
              "title": "CLEI",
              "oneOf": [
                {"minLength": 10, "maxLength": 10},
                {"minLength": 0, "maxLength": 0}
              ]
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
          "templateCategory": "Transeiver Hardware Template"
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
                    toastr.success("Success! Transeiver Hardware Template is successfully created")
                },
                error: function(data) {
                    toastr.error("Error! Could not create a Transeiver Hardware Template")

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
