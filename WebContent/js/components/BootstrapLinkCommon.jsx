define(['react'], function(React) {
var BootstrapButton = React.createClass({
    render: function() {
      return (
        <a {...this.props}
        href="javascript:;"
        role="button"
        className={(this.props.className || '') } > {this.props.data} </a>
        );
    }
    });

  var BootstrapLinkCommon = React.createClass({ 

    componentDidMount: function() {
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
       onChangeFunction: function(e) {
           this.setState({
              fbName: e.target.value
              });
       },
    render: function() {
              return (
                <div className="modal fade" ref="root">
                	<div className="modal-dialog">
                		<div className="modal-content">
                			<div className="modal-header">
                				<button type="button" className="close" onClick={this.handleCancel}> &times;</button>
                				<h3>{this.props.title}</h3>
                			</div>
                			<div className="modal-body" >
                			<div className="form-group" >
                			<label for="fbname">Name:</label>
                				<input onChange={this.onChangeFunction} type="text"
                  					className="form-control" id="fb_name"></input>
              					</div>
              					<div  className={this.props.title.split(" ")[1]=="Host"?"":"hidden"}>
              					<div className="form-group">
              					  <label for="nodeId">Node Id:</label>
              					
                				<input  type="text"
                  					className="form-control" id="nodeId"></input>
              					</div>
              					<div className="form-group">
              					  <label for="nodeId">Subnets</label>
              					
                				<input  type="text"
                  					className="form-control" id="subnets"></input>
              					</div>
              					<div className="form-group">
              					  <label for="nodeId">Static Subnet :</label>
              					
                				<input  type="text"
                  					className="form-control" id="static-subnet"></input>
              					</div>
              					<div className="form-group">
              					  <label for="nodeId">TP ID:</label>
              					
                				<input  type="text"
                  					className="form-control" id="tp_id"></input>
              					</div>
              					<div className="form-group">
              					  <label for="nodeId">Host Port Name :</label>
              					
                				<input  type="text"
                  					className="form-control" id="host-port-name"></input>
              					</div>
              					<div className="form-group">
              					  <label for="nodeId">IP Address :</label>
              					
                				<input  type="text"
                  					className="form-control" id="ip-address"></input>
              					</div>
              					</div>
                			</div>
                			<div className="modal-footer">
        						<div class="row">
									<div class="col-md-12 section-divider-bottom">
    								<BootstrapButton
					                  onClick={this.handleConfirm}
					                  className="btn btn-sm btn-primary" data="Save">
	
					                  </BootstrapButton>
					                    <BootstrapButton onClick={this.handleCancel} className="btn btn-sm btn-default" data="Cancel">
							                  </BootstrapButton>


									</div>
								</div>
           	 				</div>
                		</div>
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
        setData:function(e){
                 },
        handleConfirm: function() {
        	this.props.topologyModel.createNode(this.state.fbName,this.props.iconType);
          console.log("iconType"+this.props.iconType)
        	this.close();

        	},
         handleHidden: function() {
             if (this.props.onHidden) {
                  this.props.onHidden();
                    }
        },getInitialState:function(){

        		return{
        			fbName:""
        		}

        }
       });



  return BootstrapLinkCommon;


});
