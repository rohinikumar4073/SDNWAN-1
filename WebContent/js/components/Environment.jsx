define(['react','jsx!components/BootstrapButton'], function(React,BootstrapButton) { var Environment = React.createClass({
  onChangeFunction:function(e){
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


                    },    handleConfirm: function() {
                    var self = this;
                    $.ajax({
              url: "http://10.76.110.81:50514/orchestrator/ipDetails",


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
   getInitialState: function() {

                          return {
                            dataToBeSend:{

  "orchestrator": {
    "ipAddress": "",
    "port":-1
  },
  "rms": {
    "ipAddress": "",
    "port":-1
  }

  }
  }

        },


  render: function() {
    confirmButton = (
                      <BootstrapButton
                      onClick={this.handleConfirm}
                      className="btn  btn-primary btn-sm" data="Create New">
                      {this.props.confirm}
                      </BootstrapButton>
                      );

  return (


    <div className={this.props.className}>


      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Environment Settings</h4>
        </div>
        <div className="modal-body">
<form>
<div><h3>RMS</h3></div>
  <div className="form-group">
    <label for="rmsIpAddress">IP Address:</label>
    <input type="text" className="form-control" id="rmsIpAddress" onChange={this.onChangeFunction}></input>
  </div>
  <div className="form-group">
    <label for="rmsPort">Port:</label>
    <input type="text" className="form-control" id="rmsPort" onChange={this.onChangeFunction}></input>
  </div>
<div><h3>Orchestrator</h3></div>

 <div className="form-group">
    <label for="orcIpAddress">IP Address:</label>
    <input type="text" className="form-control" id="orcIpAddress" onChange={this.onChangeFunction}></input>
  </div>
  <div className="form-group">
    <label for="orcPort">Port:</label>
    <input type="text" className="form-control" id="orcPort" onChange={this.onChangeFunction}></input>
  </div>

</form>



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
    return Environment;


      });
