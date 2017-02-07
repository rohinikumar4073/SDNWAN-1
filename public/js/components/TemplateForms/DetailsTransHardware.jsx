define([
    'react', 'jsx!components/BootstrapButton', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, BootstrapButton, properties, toastr, Form) {

  var DetTransForm = Form.default;
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
      }
  };
  function MyCustomWidget(props) {
      return <input defaultValue={Date()} className="form-control" disabled="true"/>;
  }

  const uiSchema = {
      "ui:readonly": true,
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



    var DetTranseiverData = React.createClass({


        getInitialState: function() {
            return {collection: this.props.collection}
        },
        componentDidMount: function() {
            this.setState({collection: this.props.collection});
        },
        componentWillUnmount: function() {
            //this.serverRequest.abort();
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

                    <DetTransForm schema={schema} uiSchema={uiSchema} formData={this.props.collection} >
                    <div>
                        <button type="submit" className="btn  btn-primary btn-sm fixedbt hideLink">Create New
                        </button>
                    </div>
                    </DetTransForm>

                  </div>

              </div>


            )
        }
    });
    return DetTranseiverData;

});
