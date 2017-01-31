define([
    'react', 'jsx!components/BootstrapButton', 'properties', 'toastr', 'react-jsonschema-form'
], function(React, BootstrapButton, properties, toastr, Form) {

  var DetTransSoftwareForm = Form.default;
  const schema = {
      "type": "object",
      "required":[
        "name"
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
          "templateCategory": "Transeiver Software Template"
      }
  };



    var DetTranseiverSoftwareData = React.createClass({
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

                    <DetTransSoftwareForm schema={schema} uiSchema={uiSchema} formData={this.props.collection} onError={errors => {
                        console.log("i am errors" + errors);
                    }} onSubmit={this.onSubmit}>
                    <div>
                        <button type="submit" className="btn  btn-primary btn-sm fixedbt">Create New
                        </button>
                    </div>
                    </DetTransSoftwareForm>

                  </div>
              </div>


            )
        }
    });
    return DetTranseiverSoftwareData;

});
