define(['react','jsx!components/ComponentForms/CreateForwardingBox','jsx!components/ComponentForms/CreateHost','jsx!components/ComponentForms/CreatePatchPanel','jsx!components/ComponentForms/CreateOpticalSwitch'], function(React,CreateFBComponent,CreateHost,CreatePatchPanel,CreateOpticalSwitch) {
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
             if (this.props.iconType=='host') {
              $('#add-node-host')[0].reset();
            }

            $(this.refs.root).modal('show');
        },

        render: function() {
            return (
                <div className="modal fade" ref="root">
                    <div className="modal-dialog">

                      {this.props.iconType=='fb-icon'
                      ? <CreateFBComponent close={this.close} title={this.props.title} formData={this.props.formData} submitMode={this.props.submitMode} iconType={this.props.iconType} coordinates={this.props.coordinates} topologyModel={this.props.topologyModel} />
                      : (this.props.iconType=='patch-panel'
                  ? <CreatePatchPanel close={this.close} title={this.props.title} iconType={this.props.iconType} submitMode={this.props.submitMode} formData={this.props.formData} coordinates={this.props.coordinates} topologyModel={this.props.topologyModel} />
                  : (this.props.iconType=='host'
              ? <CreateHost close={this.close} title={this.props.title} iconType={this.props.iconType} coordinates={this.props.coordinates} topologyModel={this.props.topologyModel} />
              : (this.props.iconType=='optical-switch'
          ? <CreateOpticalSwitch close={this.close} title={this.props.title}  submitMode={this.props.submitMode} formData={this.props.formData} iconType={this.props.iconType} coordinates={this.props.coordinates} topologyModel={this.props.topologyModel} />
          : ""
      )))}



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
