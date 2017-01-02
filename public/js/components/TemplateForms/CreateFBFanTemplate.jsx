define([
    'react', 'jsx!components/BootstrapButton', 'properties', 'toastr','react-jsonschema-form'
], function(React, BootstrapButton, properties, toastr, Form) {
  var FanTempForm=Form.default;
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
function MyCustomWidget() {
  return <input defaultValue={Date()} className="form-control" disabled="true" />;
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
  "classNames": "greeting",
    "ui:widget": "radio",
    "ui:options": {
      "inline": true
    }
  }
};

const formData={
  "templateInfo": {
    "templateCategory": "Fan Template"
  }
};

    var FbFanData = React.createClass({
    /*  onClick : function(e){
      console.log("test");
        },*/
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




                    </div>
                    <div className="modal-footer fixedspace">
                    </div>
                </div>

            )
        }
    });
    return FbFanData;
});
