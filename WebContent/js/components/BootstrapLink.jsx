define(['react','jquery','jsx!components/BootstrapButton','jsx!components/BootstrapModal'], function(React,$,BootstrapButton,BootstrapModal) {

var BootstrapLink = React.createClass({
    handleCancel: function() {
  //    if (confirm('Are you sure you want to cancel?')) {
        this.refs.modal.close();
     //
      },
      addRow:function(data){
       this.props.addRow(data);

      },
      render: function() {
       
        return (
          <div className="link">
        <BootstrapModal
          ref="modal"
          confirm="OK"
          cancel="Cancel"
          onCancel={this.handleCancel}
          onConfirm={this.closeModal}
          onHidden={this.handleModalDidClose}
          title={"Create "+this.props.heading}
          template={this.props.template}
          >
          
          </BootstrapModal>
          <BootstrapButton  onClick={this.openModal} data={this.props.data}>
          Open modal
          </BootstrapButton>
          </div>
          );
        },
        openModal: function() {
          $(".link").find(".modal").appendTo("body");
          this.refs.modal.open();
          },
          closeModal: function(data) {
            if(data)
              this.addRow(data);
            this.refs.modal.close();
            },
            handleModalDidClose: function() {
            }
            });
            
            return BootstrapLink;
            
            });