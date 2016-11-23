define([
    'react', 'jsx!components/BootstrapButton', 'properties', 'toastr','react-jsonschema-form'
], function(React, BootstrapButton, properties, toastr, Form) {
  var JSFormTest=Form.default;
  const schema ={
  "definitions": {
    "address": {
      "type": "object",
      "properties": {
        "Name": {
          "type": "string"
        },
        "Revision": {
          "type": "string"
        },
        "Last Updated By": {
          "type": "string"
        },
        "radio": {
          "type": "string",
          "title": "Status",
          "enum": [
            "Draft",
            "Available",
            "Decommissioned"
          ]
        },
        "Template Category": {
          "type": "string"
        },
        "Time Stamp": {
          "type": "string"
        }
      },
      "required": [
        "Name",
        "Revision",
        "Last Updated By"
      ]
    },
    "address2": {
      "type": "object",
      "properties": {
        "Manufacturer": {
          "type": "string"
        },
        "Orderable Part Number": {
          "type": "string"
        },
        "Description": {
          "type": "string"
        },
        "CLEI": {
          "type": "string"
        },
        "Material ID (from Vz procurement system)": {
          "type": "string"
        },
        "radio": {
          "type": "number",
          "title": "Status",
          "enum": [
            "Front-to-Back",
            "Back-to-Front"
          ]
        }
      }
    }
  },
  "type": "object",
  "properties": {
    "billing_address": {
      "title": "",
      "$ref": "#/definitions/address2"
    },
    "Fan_Information": {
      "title": "Fan Information",
      "$ref": "#/definitions/address"
    }
  }
};
const uiSchema ={
  "ui:order": [
    "Fan_Information",
    "billing_address"
  ],
  "Fan_Information": {
    "radio": {
      "ui:widget": "radio",
      "ui:options": {
        "inline": true
      }
    }
  },
  "billing_address": {
    "radio": {
      "ui:widget": "radio",
      "ui:options": {
        "inline": true
      }
    }
  }
};
    var FbFanData = React.createClass({

        onChangeFunction: function(e) {
            var parnetId = e.target.getAttribute("data-parentdata")
            if (parnetId) {
                if (this.state.dataToBeSend[parnetId]) {
                    this.state.dataToBeSend[parnetId][e.target.id] = e.target.value;
                } else {
                    this.state.dataToBeSend[parnetId][e.target.id] = e.target.value;
                }
            } else {
                this.state.dataToBeSend[e.target.id] = e.target.value;
            }

            this.setState({dataToBeSend: this.state.dataToBeSend});

        },
        handleConfirm: function() {
            var self = this;
            $.ajax({
                url: properties.templateIp + "createFanTemplate",
                type: 'post',
                data: JSON.stringify(this.state.dataToBeSend),
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
                dataToBeSend: {
  "billing_address": {
    "Manufacturer": "",
    "Orderable Part Number": "",
    "Description": "",
    "CLEI": "",
    "Material ID (from Vz procurement system)": "",
    "radio": "Front-to-Back"
  },
  "Fan_Information": {
    "Name": "",
    "Revision": "",
    "Last Updated By": "",
    "radio": "Available",
    "Template Category": "",
    "Time Stamp": ""
  }
}

            }

        },
        render: function() {

            confirmButton = (
                <BootstrapButton onClick={this.handleConfirm} className="btn  btn-primary btn-sm" data="Create New">
                    {this.props.confirm}
                </BootstrapButton>
            );

            return (
                <div className={this.props.className}>
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.props.handleCancel}>
                            &times;
                        </button>
                        <h3>{this.props.header}</h3>
                    </div>
                    <div className="modal-body">
                      <JSFormTest schema={schema}
                                  uiSchema={uiSchema}  onChange={console.log("changed")}
                                   onSubmit={console.log("submitted")}
                                   onError={console.log("errors")} />



                    </div>
                    <div className="modal-footer">
                        <div className="row">
                            <div className="col-md-12 section-divider-bottom">
                                {confirmButton}
                            </div>
                        </div>
                    </div>
                </div>

            )
        }
    });
    return FbFanData;
});
