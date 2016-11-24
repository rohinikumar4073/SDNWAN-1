define([
    'react', 'jsx!components/BootstrapButton', 'properties', 'toastr','react-jsonschema-form'
], function(React, BootstrapButton, properties, toastr, Form) {
  var JSFormTest=Form.default;
  const schema = {
  "type": "object",
  "properties": {
    "templateInfo": {
      "type": "object",
      "title": "Fan Information",
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
        "status": {
          "type": "string",
          "title": "Status",
          "enum": [
            "Draft",
            "Available",
            "Decommissioned"
          ]
        },
        "templateCategory": {
          "type": "string",
          "title": "Template Category"
        },
        "timeStamp": {
          "type": "string",
          "title": "Time Stamp"
        }
      },
      "required": [
        "name",
        "revision",
        "lastUpdatedBy"
      ]
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
    "airFlow": {
      "type": "string",
      "title": "Air Flow",
      "enum": [
        "Front-to-Back",
        "Back-to-Front"
      ]
    }
  }
};

  const uiSchema = {
  "templateInfo": {
    "status": {
      "ui:widget": "radio",
      "ui:options": {
        "inline": true
      }
    }
  },
  "airFlow": {
    "ui:widget": "radio",
    "ui:options": {
      "inline": true
    }
  }
};



    var FbFanData = React.createClass({

        onSubmit: function(e) {

          this.handleConfirm(e.formData)

        },

        handleConfirm: function(data) {

            var self = this;
                        $.ajax({
                url: properties.templateIp + "createFanTemplate",
                type: 'post',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.success("Success! Fan template is created")
                },
                error: function(data) {
                    toastr.error("Error! Fan template is not created")
                }

            });
this.props.close();
        },
        getInitialState: function() {

            return {


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

                        <JSFormTest  schema={schema}
                                    uiSchema={uiSchema} 
                                     onError={console.log("errors")}
                                       onSubmit={this.onSubmit}>
                                       <div>

                                               <button type="submit" className="btn  btn-primary btn-sm" >Create New
                                                   </button>
                                           </div>
                                          </JSFormTest>



                    </div>
                    <div className="modal-footer">
                        <div className="row">
                            <div className="col-md-12 section-divider-bottom">

                            </div>
                        </div>
                    </div>
                </div>

            )
        }
    });
    return FbFanData;
});
