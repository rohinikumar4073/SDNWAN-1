define([
    'react', 'jsx!components/BootstrapButton', 'properties', 'toastr', 'react-jsonschema-form','jsx!components/Template',
       'jsx!components/DetailsElement'
], function(React, BootstrapButton, properties, toastr, Form, Template, DetailsElement) {

    var DetHardwareForm = Form.default;
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
        "physical_interface":{
          "type": "array",
          "title": "Physical Interface",
      "items": {
        "type": "object",
        "properties": {
          "physical_interface_#": {
            "title": "Physical Interface",
            "type": "integer",
            "minimum": 0
          },
          "physical_interface_speed/type": {
            "title": "Physical Interface Speed/Type",
            "type": "string",
            "enum": [
              "10G_SFP+",
              "40G_QSFP+"
            ]
          }
        },
        "required": [
          "physical_interface_#",
          "physical_interface_speed/type"
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
            "templateCategory": "FB Hardware Template"
        }
    };

    var DetHardwareData = React.createClass({
        getInitialState: function() {
            return {
              collection: this.props.collection
            }
        },
        componentDidMount: function() {
            this.setState({collection: this.props.collection});
        },
        componentWillUnmount: function() {
            //this.serverRequest.abort();
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
                        <DetHardwreForm schema={schema} uiSchema={uiSchema} formData={this.props.collection}>
                        <div>
                            <button type="submit" className="btn  btn-primary btn-sm fixedbt hideLink">Create New
                            </button>
                        </div>
                        </DetHardwreForm>
                    </div>

                </div>
            )
        }
    });
    return DetHardwareData;
});
