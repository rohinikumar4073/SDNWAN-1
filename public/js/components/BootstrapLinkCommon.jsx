define(['react','jsx!components/ComponentForms/CreateForwardingBox','jsx!components/ComponentForms/CreateHost','jsx!components/ComponentForms/CreatePatchPanel','jsx!components/ComponentForms/CreateOpticalSwitch','jsx!components/ComponentForms/CreateBGPServer'], function(React,CreateForwardingBox,CreateHost,CreatePatchPanel,CreateOpticalSwitch,CreateBGPServer) {
    var BootstrapButton = React.createClass({
        render: function() {
            return (
                <a {...this.props} href="javascript:;" role="button" className={(this.props.className || '')}>
                    {this.props.data}
                </a>
            );
        }
    });

    var BootstrapLinkCommon = React.createClass({

        componentDidMount: function() {},
        componentWillUnmount: function() {
            $(this.refs.root).off('hidden.bs.modal', this.handleHidden);
        },
        close: function() {
            $(this.refs.root).modal('hide');
        },
        open: function() {
            $(this.refs.root).modal('show');
            switch (this.props.iconType) {
              case "optical-switch":
                this.refs.os.updateData()
                break;
              case "fb-icon":
                this.refs.fb.updateData()
                break;
              case "host":
                this.refs.host.updateData()
                break;
              case "bgp":
                this.refs.bgp.updateData()
                break;
              default:

            }
        },

        render: function() {
            return (
                <div className="modal fade" ref="root">
                    <div className="modal-dialog">

                      {this.props.iconType=='fb-icon'
                      ? <CreateForwardingBox ref="fb" close={this.close} title={this.props.title} formData={this.props.formData} submitMode={this.props.submitMode} iconType={this.props.iconType} coordinates={this.props.coordinates} topologyModel={this.props.topologyModel} />
                      : (this.props.iconType=='patch-panel'
                  ? <CreatePatchPanel close={this.close} title={this.props.title} iconType={this.props.iconType} submitMode={this.props.submitMode} formData={this.props.formData} coordinates={this.props.coordinates} topologyModel={this.props.topologyModel} />
                  : (this.props.iconType=='host'
              ? <CreateHost ref="host" close={this.close} title={this.props.title} iconType={this.props.iconType} submitMode={this.props.submitMode} formData={this.props.formData} coordinates={this.props.coordinates} topologyModel={this.props.topologyModel} />
              : (this.props.iconType=='optical-switch'
          ? <CreateOpticalSwitch ref="os" close={this.close} title={this.props.title}  submitMode={this.props.submitMode} formData={this.props.formData} iconType={this.props.iconType} coordinates={this.props.coordinates} topologyModel={this.props.topologyModel} />
        :( this.props.iconType=='bgp' ?

        <CreateBGPServer ref="bgp" close={this.close}
          title={this.props.title}  submitMode={this.props.submitMode}
          formData={this.props.formData} iconType={this.props.iconType} coordinates={this.props.coordinates}
          topologyModel={this.props.topologyModel} />
          : ""
      ))))}



                  </div>
                </div>
            );
        },
        handleCancel: function() {
            this.close();
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        },
        handleHidden: function() {
            if (this.props.onHidden) {
                this.props.onHidden();
            }
        }

    });

    return BootstrapLinkCommon;

});
