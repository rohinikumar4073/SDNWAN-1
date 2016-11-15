define([
    'react', 'jquery', 'properties'
], function(React, $, properties) {

    var BootstrapButton = React.createClass({
        render: function() {
            return (
                <a {...this.props} href="javascript:;" role="button" className={(this.props.className || '')}>
                    {this.props.data}
                </a>
            );
        }
    });

    var CreatePatchPanel = React.createClass({
        onChangeFunction: function(e) {

            this.state.dataToBeSend[e.target.id] = e.target.value;

        },
        getInitialState: function() {

            return {
                dataToBeSend: {
                    name: "",
                    type: "patch-panel",
                    portsno: "",
                    location: ""
                }
            }

        },

        keyPressFunction: function(event) {

            var keycode = (event.keyCode
                ? event.keyCode
                : event.which);
            if (keycode == '13') {
                this.handleConfirm();
                event.stopPropagation()
            }

        },
        handleCancel: function() {
            this.props.close();
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        },
        handleConfirm: function() {
            var socket = properties.socket();
            var self = this;

            var patchinfo2 = JSON.parse(JSON.stringify(self.state.dataToBeSend))
            var patchinfo1 = JSON.parse(JSON.stringify(self.state.dataToBeSend))
            patchinfo1.name = self.state.dataToBeSend.name + "1";
            patchinfo2.name = self.state.dataToBeSend.name + "2";
            socket.emit('component-save', JSON.stringify(patchinfo1));
            socket.emit('component-save', JSON.stringify(patchinfo2));

            socket.on('component-save', function(data) {
                console.log(data);
            });

            properties.addNode(this.state.dataToBeSend.name + "1", this.props.iconType)
            properties.addNode(this.state.dataToBeSend.name + "2ß", this.props.iconType)

            var node = {}
            if (this.props.coordinates.x && this.props.coordinates.y) {
                node.x = this.props.coordinates.x - 100;
                node.y = this.props.coordinates.y - 90;
            } else {
                node.x = Math.floor(Math.random() * 400);
                node.y = Math.floor(Math.random() * 400);
            }

            this.props.topologyModel.createNode(this.state.dataToBeSend.name + "1", this.props.iconType, {
                x: node.x,
                y: node.y
            });
            this.props.topologyModel.createNode(this.state.dataToBeSend.name + "2", this.props.iconType, {
                x: node.x + 100,
                y: node.y
            });
            var patchlink = {
                source: this.state.dataToBeSend.name + "1",
                target: this.state.dataToBeSend.name + "2"

            }
            this.props.topologyModel.createLinkPatchPanel(patchlink)
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
                        <form id="add-node-pp">
                            <div className="form-group">
                                <label for="fbname">Name:</label>
                                <input onChange={this.onChangeFunction} onKeyDown={this.keyPressFunction} type="text" className="form-control" id="name"></input>
                            </div>

                            <div className="form-group">
                                <label for="portsno">Number of Ports</label>

                                <input className="form-control" type="text" onChange={this.onChangeFunction} id="portsno"></input>
                            </div>
                            <div className="form-group">
                                <label for="Location">Location</label>

                                <input className="form-control" type="text" onChange={this.onChangeFunction} id="location"></input>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div class="row">
                            <div class="col-md-12 section-divider-bottom">
                                <BootstrapButton onClick={this.handleConfirm} className="btn btn-sm btn-primary" data="Save"></BootstrapButton>
                                <BootstrapButton onClick={this.handleCancel} className="btn btn-sm btn-default" data="Cancel"></BootstrapButton>

                            </div>
                        </div>
                    </div>
                </div>

            );
        }
    });

    return CreatePatchPanel;

});
