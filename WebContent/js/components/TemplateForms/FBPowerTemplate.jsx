define(['react','jsx!components/BootstrapButton'], function(React,BootstrapButton) { var FBPowerData = React.createClass({

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
            url: "http://10.76.110.81:50513/FbTemplate/CreatePowerSupply",
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
  "airFlow": "",
  "clei": "",
  "description": "",
  "manufacturer": "",
  "materialId": "",
  "maxPowerRating": "",
  "orderablePartNo": "",
  "powerSupplyType": "",
  "templateInfo": {
    "lastUpdatedBy": "",
    "name": "",
    "revision": "",
    "status": "",
    "templateCategory": "",
    "timeStamp": ""
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
    	<div className="modal-header">
    		<button type="button" className="close"
    			onClick={this.props.handleCancel}>&times;</button>
    		<h3>{this.props.header}</h3>
    	</div>
    	<div className="modal-body">

    		<div id="accordion">
    			<div className="panel-group">
    				<div className="panel panel-default">
    					<div className="panel-heading">
    						<h4 className="panel-title">
    							<a data-toggle="collapse" href="#collapseP1"
      								aria-expanded="true">Template
    								Information</a>
    						</h4>
    					</div>
    						<div id="collapseP1" className="panel-collapse collapse in"
      						role="tabpanel">
    						<div className="panel-body">
    							<form>
    								<div className="form-group">
    									<label for="name">Name:</label> <input type="text"
    										className="form-control" id="name"
    										onChange={this.onChangeFunction}></input>
    								</div>
    								<div className="form-group">
    									<label for="revision">Revision:</label> <input type="text"
    										className="form-control" id="revision"
    										onChange={this.onChangeFunction}></input>
    								</div>
    								<div className="form-group">
    									<label for="lastUpdatedBy">Last Updated By:</label> <input
    										type="text" className="form-control" id="lastUpdatedBy"
    										onChange={this.onChangeFunction}></input>
    								</div>
    								<div className="form-group">
    									<label for="timeStamp">Time Stamp:</label> <input type="text" disabled="true"
    										className="form-control" id="timeStamp" defaultValue={Date()}
    										onChange={this.onChangeFunction}></input>
    								</div>
    								<div className="form-group">
    									<label for="status">Status:</label>
    									<div className="radio">
    										<label><input type="radio" name="status"
    											onChange={this.onChangeFunction}></input>raft</label>
    									</div>
    									<div className="radio">
    										<label><input type="radio" name="status"
    											onChange={this.onChangeFunction}></input>Available</label>
    									</div>
    									<div className="radio">
    										<label><input type="radio" name="status"
    											onChange={this.onChangeFunction}></input>Decommissioned</label>
    									</div>
    								</div>
    								<div className="form-group">
    									<label for="templateCategory">Template Category:</label> <input
    										type="text" className="form-control" id="templateCategory" defaultValue="Power Supply" disabled="true"
    										onChange={this.onChangeFunction}></input>
    								</div>


    							</form>
    						</div>
    					</div>
    				</div>


    <form>
    			<div className="form-group">
    				<label for="manufacturer">Manufacturer:</label> <input type="text"
    					className="form-control" id="manufacturer"
    					onChange={this.onChangeFunction}></input>
    			</div>

    			<div className="form-group">
    				<label for="orderablePartNumber">Orderable Part Number:</label> <input
    					type="text" className="form-control" id="orderablePartNumber"
    					onChange={this.onChangeFunction}></input>
    			</div>

    			<div className="form-group">
    				<label for="description">Description:</label> <input type="text"
    					className="form-control" id="description"
    					onChange={this.onChangeFunction}></input>
    			</div>

    			<div className="form-group">
    				<label for="clei">CLEI:</label> <input type="text"
    					className="form-control" id="clei" onChange={this.onChangeFunction}></input>
    			</div>

    			<div className="form-group">
    				<label for="materialId">Material ID (from Vz procurement
    					system):</label> <input type="text" className="form-control"
    					id="materialId" onChange={this.onChangeFunction}></input>
    			</div>
    			<div className="form-group">
    				<label for="powerType">Power Supply Type:</label>
    				<div className="radio">
    					<label><input type="radio" name="powerType"
    						onChange={this.onChangeFunction}></input>AC</label>
    				</div>
    				<div className="radio">
    					<label><input type="radio" name="powerType"
    						onChange={this.onChangeFunction}></input>DC</label>
    				</div>

    			</div>

    			<div className="form-group">
    				<label for="maxPower">Max Power Rating(Watts):</label> <input
    					type="text" className="form-control" id="maxPower"
    					onChange={this.onChangeFunction}></input>
    			</div>

    			<div className="form-group">
    				<label for="airFlow">Air Flow </label>
    				<div className="radio">
    					<label><input type="radio" name="airFlow"
    						onChange={this.onChangeFunction}></input>Front-to-Back</label>
    				</div>
    				<div className="radio">
    					<label><input type="radio" name="airFlow"
    						onChange={this.onChangeFunction}></input>Back-to-Front</label>
    				</div>

    			</div>
    </form>
    </div>

    		</div>
    	</div>
    	<div className="modal-footer">
    		<div className="row">
    			<div className="col-md-12 section-divider-bottom">{confirmButton}</div>
    		</div>
    	</div>
    </div>


)

   }
    });
  return FBPowerData;


    });
