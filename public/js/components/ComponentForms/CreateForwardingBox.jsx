define([
    'react', 'jquery', 'properties', 'react-jsonschema-form'
], function(React, $, properties, Form) {
    var FormFB = Form.default;

    const schema = {
        "type": "object",
        "required": ["name"],
        "properties": {

            "name": {
                "type": "string",
                "title": "Name"
            }
        }

    };
    const uiSchema = {};
    const formData = {};

    var CreateFBComponent = React.createClass({

        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },
        handleCancel: function() {
            this.props.close();
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        },
        handleConfirm: function(data) {
          if(this.props.submitMode=="Save"){
            this.props.topologyModel.createNode(data.name, this.props.iconType, this.props.coordinates);
            properties.addNode(data.name, this.props.iconType);
          }else{
            this.props.topologyModel.updateNode({name:data.name,formData:this.props.formData});
          //  properties.updateNode(data.name, this.props.formData.name);
          }
          this.props.close();
        },
        render: function() {
            return (

                <div className={"modal-content " + this.props.className}>

                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.handleCancel}>
                            &times;</button>
                        <h3>{this.props.title}</h3>
                    </div>
                    <div className="modal-body">

                        <FormFB schema={schema} uiSchema={uiSchema} formData={this.props.formData} className="formFB" onSubmit={this.onSubmit} onError={errors => {
                            console.log("i am errors" + errors);
                        }} onSubmit={this.onSubmit}>
                            <div>
                                <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                                <button onClick={this.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                            </div>
                        </FormFB>
                    </div>

                </div>

            );
        }
    });

    return CreateFBComponent;

});
