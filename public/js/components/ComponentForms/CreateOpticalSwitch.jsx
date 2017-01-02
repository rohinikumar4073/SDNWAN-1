define([
    'react', 'jquery','properties','react-jsonschema-form'
], function(React, $,properties,Form) {
  var FormOS= Form.default;

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


    var CreateOpticalSwitch = React.createClass({
      onSubmit: function(e) {
          this.handleConfirm(e.formData)
      },
      getInitialState: function() {
                  return {}
      },

      handleCancel: function() {
          this.props.close();
          if (this.props.onCancel) {
              this.props.onCancel();
          }
      },
      handleConfirm: function(data) {

        var socket = properties.socket();
            var self=this;
                data.type="optical-switch";
              if(this.props.submitMode=="Save"){
                        this.setState({dataToBeSend:{name: data.name, type: "optical-switch"}})
                        socket.emit('component-save',JSON.stringify(data));
                        this.props.topologyModel.createNode(data.name, this.props.iconType, this.props.coordinates);
                        this.props.close();
                        properties.addNode(data.name,this.props.iconType)
                        }else{
                this.props.topologyModel.updateNode({name:data.name,formData:this.props.formData});

              }
              this.props.close();



      },
        render: function() {
            return (


              <div  className={"modal-content "+this.props.className}>
                  <div className="modal-header">
                      <button type="button" className="close" onClick={this.handleCancel}>
                          &times;</button>
                      <h3>{this.props.title}</h3>
                  </div>
                  <div className="modal-body">
                    <FormOS schema={schema} uiSchema={uiSchema} formData={this.props.formData} className="formFB" onSubmit={this.onSubmit} onError={errors => {
                        console.log("i am errors" + errors);
                    }} onSubmit={this.onSubmit}>
                        <div>
                            <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                            <button onClick={this.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                        </div>
                    </FormOS>
                  </div>

              </div>

            );
        }
    });

    return CreateOpticalSwitch;

});
