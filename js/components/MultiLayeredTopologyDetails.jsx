define([
    'react', 'jsx!components/BootstrapButton', 'properties'
], function(React, BootstrapButton, properties) {

    var MultiLayeredTopologyDetails = React.createClass({
        handleConfirm: function() {
            var self = this;
            this.props.close()

        },
        getInitialState: function() {

            return {dataToBeSend: {}}

        },

        render: function() {
            confirmButton = (
                <BootstrapButton onClick={this.handleConfirm} className="btn  btn-primary btn-sm" data="Cancel">
                    Cancel
                </BootstrapButton>
            );

            return (


                  <div className={this.props.className}>


                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">{this.props.data}</h4>
                      </div>
                      <div className="modal-body">
                          <h2></h2>
                      </div>
                      <div className="modal-footer">

                      </div>
                    </div>
                    <div className="modal-footer">
                <div class="row">
                <div class="col-md-12 section-divider-bottom">
                   {confirmButton}
                </div>
                </div>
                </div>

                  </div>
                  )

        }
    });
    return MultiLayeredTopologyDetails;

});
