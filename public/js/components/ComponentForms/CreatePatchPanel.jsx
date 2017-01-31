define([
    'react', 'jquery', 'properties','react-jsonschema-form'
], function(React, $, properties,Form) {

  var FormPatchPanel= Form.default;
      const schema = {
          "type": "object",
          "required": ["name"],
          "properties": {

              "name": {
                  "type": "string",
                  "title": "Name"
              },"portsno":{
                "type": "integer",
                "title": "Number of Ports"
              },  "location": {
                    "type": "string",
                    "title": "Location"
                }
          }

      };
    const uiSchema = {"portsno": {
    "ui:widget": "updown"
  }};
    var CreatePatchPanel = React.createClass({

        getInitialState: function() {

            return {  }

        },

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
          debugger;
              data.type= "patch-panel";
            if(this.props.submitMode=="Save"){
            var socket = properties.socket();
            var self = this;

            var patchinfo2 = JSON.parse(JSON.stringify(data))
            var patchinfo1 = JSON.parse(JSON.stringify(data))
            patchinfo1.name = data.name + "1";
            patchinfo2.name = data.name + "2";
            $.ajax({
                url: properties.saveComponent,
                type: 'post',
                data: JSON.stringify(patchinfo1),
                contentType: "application/json; charset=utf-8",
                success: function(data) {

                    toastr.success("PatchPanel 1 added successfully")

                },
                error: function(data) {
                    toastr.error("Not able to add host")
                }

            });
            $.ajax({
                url: properties.saveComponent,
                type: 'post',
                data: JSON.stringify(patchinfo2),
                contentType: "application/json; charset=utf-8",
                success: function(data) {

                    toastr.success("PatchPanel 2 added successfully")

                },
                error: function(data) {
                    toastr.error("Not able to add PatchPanel")
                }

            });
            properties.addNode(data.name + "1", this.props.iconType)
            properties.addNode(data.name + "2", this.props.iconType)

            var node = {}
            if (this.props.coordinates.x && this.props.coordinates.y) {
                node.x = this.props.coordinates.x - 100;
                node.y = this.props.coordinates.y - 90;
            } else {
                node.x = Math.floor(Math.random() * 400);
                node.y = Math.floor(Math.random() * 400);
            }

          var source=  this.props.topologyModel.createNode(data.name + "1", this.props.iconType, {
                x: node.x,
                y: node.y
            });
          var target =  this.props.topologyModel.createNode(data.name + "2", this.props.iconType, {
                x: node.x + 100,
                y: node.y
            });
            var patchlink = {
                source: source,
                target: target

            }
            this.props.topologyModel.createLinkPatchPanel(patchlink)
          }else{
            this.props.topologyModel.updateNode({name:data.name,formData:this.props.formData});
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
                      <FormPatchPanel schema={schema} uiSchema={uiSchema} formData={this.props.formData} className="formFB" onSubmit={this.onSubmit} onError={errors => {
                          console.log("i am errors" + errors);
                      }} onSubmit={this.onSubmit}>
                          <div>
                              <button type="submit" className="btn btn-sm btn-primary" data="Save">{this.props.submitMode}</button>
                              <button onClick={this.handleCancel} type="button" className="btn btn-sm btn-default" data="Cancel">Cancel</button>
                          </div>
                      </FormPatchPanel>
                    </div>

                </div>

            );
        }
    });

    return CreatePatchPanel;

});
