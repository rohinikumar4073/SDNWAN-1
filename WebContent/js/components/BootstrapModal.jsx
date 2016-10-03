 define(['react','jquery','jsx!components/BootstrapButton','jsx!components/CreateNewFBForm'], function(React,$,BootstrapButton,FBForm) {

 var BootstrapModal = React.createClass({
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
                  <BootstrapButton
                  onClick={this.handleConfirm}
                  className="btn  btn-primary btn-sm" data="Create New">
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
                <div className="modal-content">
                <div className="modal-header">
                <button
                type="button"
                className="close"
                onClick={this.handleCancel}>
                &times;
                </button>
                <h3>{this.props.title}</h3>
                </div>
                <div className="modal-body" >
                  
                    <FBForm data={this.props.children} onChangeFunction={this.setData}/>


                </div>
                <div className="modal-footer">
        <div class="row">
<div class="col-md-12 section-divider-bottom">
    {confirmButton}
</div>
</div>
           
                </div>
                </div>
                </div>
                </div>
                );
              },
              handleCancel: function() {
                if (this.props.onCancel) {
                  this.props.onCancel();
                }
                },
                setData:function(e){
                 var parnetId=e.target.getAttribute("data-parentdata")
                  if(parnetId )
                  {
                    if(this.state.dataToBeSend[parnetId]){
                      this.state.dataToBeSend[parnetId][e.target.id]=e.target.value;
                      }else{
                       this.state.dataToBeSend[parnetId][e.target.id]=e.target.value;
                      }
                  }else{
                    this.state.dataToBeSend[e.target.id]=e.target.value;
                  }
                  
this.setState({
              dataToBeSend: this.state.dataToBeSend
              });
               
                  
                  },
                handleConfirm: function() {
                  var self = this;
                  $.ajax({
            url: "http://114.8.10.211:50512/FbTemplate/getFbCreateInstances",
            type: 'post',
              data: JSON.stringify(this.state.dataToBeSend),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
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
                  }, getInitialState: function() {
                        return {
                          dataToBeSend:{
                          "forwarding_box_template" : "",
                          "fb_device_name" : "",
                          "network_domain" : "",
                          "site_id" : "",
                          "location_desc" : "",
                          "fb_groupid" : "",
                          "management_configuration" : {
                            "management_interface" : "",
                            "ip_address" : "",
                            "default_gatewayIp" : "",
                            "dns_serverIp" : "",
                            "dns_name" : "",
                            "agent_cert_name" : ""
                          },
                          "openFlowInfo" : {
                            "masterControllerIp" : "",
                            "slaveControllerIp" : "",
                            "protocolVersion" : "",
                            "connectionProtocol" : "",
                            "allowPassiveCon" : "",
                            "failMode" : "",
                            "dataPathId" : ""
                          },
                          "lldpEnablment" : "",
                          "dataPlaceConfiguration" : {
                            "dacUtilized" : "",
                            "dacCableUtilized" : "",
                            "transceiverType" : "",
                            "speed" : "",
                            "enableFrameSupport" : "",
                            "adminState" : "",
                            "description" : "",
                            "adminCost" : ""
                          },
                          "operatingSystemConfiguration" : {
                            "localArpResponse" : "",
                            "localArpResponseCoverage" : "",
                            "localIpv6ArpResponse" : "",
                            "localIpv6ArpResponseCoverage" : "",
                            "fb_sfp_interval" : "",
                            "interfceFlowCounterInt" : "",
                            "alarmHistory" : "",
                            "alarmHighTemp" : "",
                            "alarmLowTemp" : ""
                          }
                        }
                        }
      }
                  });

  return BootstrapModal;
  
  });