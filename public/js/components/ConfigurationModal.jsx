define([
    'react', 'jquery', 'jsx!components/BootstrapButton','jsx!components/ConfigurationForms/PeriodicConfiguration', 'jsx!components/ConfigurationForms/PublisherConfiguration', 'jsx!components/ConfigurationForms/EmsConfiguration', 'jsx!components/ConfigurationForms/MonitoringService'
], function(React, $, BootstrapButton,PeriodicConfiguration,PublisherConfiguration,EmsConfiguration,MonitoringService) {

    var ConfigurationModal = React.createClass({
        // The following two methods are the only places we need to
        // integrate Bootstrap or jQuery with the components lifecycle methods.
        componentDidMount: function() {
            // When the component is added, turn it into a modal
            $(this.refs.root).modal({backdrop: 'static', keyboard: false, show: false});

            // Bootstrap's modal class exposes a few events for hooking into modal
            // functionality. Lets hook into one of them:
            $(this.refs.root).on('hidden.bs.modal', this.handleHidden);
        },
        componentWillUnmount: function() {
            $(this.refs.root).off('hidden.bs.modal', this.handleHidden);
        },
        close: function() {
            $(this.refs.root).modal('hide');
        },
        open: function() {
            $(this.refs.root).modal('show');
        },
        render: function() {
            var confirmButton = null;
            var cancelButton = null;

            if (this.props.confirm) {
                confirmButton = (
                    <BootstrapButton onClick={this.handleConfirm} className="btn  btn-primary btn-sm" data="Create New">
                        {this.props.confirm}
                    </BootstrapButton>
                );
            }
            if (this.props.cancel) {
                cancelButton = (
                    <BootstrapButton onClick={this.handleCancel} className="btn-default btn-sm" data="Cancel">
                        {this.props.cancel}
                    </BootstrapButton>
                );
            }

            return (
                <div className="modal fade" ref="root">
                    <div className="modal-dialog">
                        <div className="modal-content"></div>

                <PeriodicConfiguration header="Create Periodic Configuration"  close={this.close} handleCancel={this.handleCancel} className={this.props.template=='periodicConfiguration' ? "" :"hidden"}></PeriodicConfiguration>
                <PublisherConfiguration header="Create Publisher Configuration"  close={this.close} handleCancel={this.handleCancel} className={this.props.template=='publisherConfiguration' ? "" :"hidden"}></PublisherConfiguration>
                <EmsConfiguration header="Create EMS Configuration"  close={this.close} handleCancel={this.handleCancel} className={this.props.template=='emsConfiguration' ? "" :"hidden"}></EmsConfiguration>
                <MonitoringService header="FB Monitoring Service"  close={this.close} handleCancel={this.handleCancel} className={this.props.template=='fbMonitoring' ? "" :"hidden"}></MonitoringService>

                    </div>
                </div>
            );
        },
        handleCancel: function() {
            debugger;
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        },
        setData: function(e) {
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
                url: "http://10.76.110.81:50102/FbTemplate/CreateTemplate",
                type: 'post',
                data: JSON.stringify(this.state.dataToBeSend),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    if (self.props.onConfirm) {
                        self.props.onConfirm(self.state.dataToBeSend);
                    }
                }

            });

        },
        handleHidden: function() {
            if (this.props.onHidden) {
                this.props.onHidden();
            }
        }
    });

    return ConfigurationModal;

});
