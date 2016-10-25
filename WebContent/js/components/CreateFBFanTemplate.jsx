define(['react','jsx!components/BootstrapButton'], function(React,BootstrapButton) { var FbFanData = React.createClass({

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
            url: "http://10.76.110.81:50513/FbTemplate/createFanTemplate",
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
                          		    "orderablePartNo": "",
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
<div  className={this.props.className}>
   <div className="modal-header">
                <button
                type="button"
                className="close"
                onClick={this.props.handleCancel}>
                &times;
                </button>
                <h3>{this.props.header}</h3>
                </div>
                <div className="modal-body" >

	<div className="accordion" >
	
	
	
		<div className="panel panel-default">
			<div className="panel-heading">
				<h4 className="panel-title">
					<a data-toggle="collapse" href="#collapseFan" aria-expanded="true">Fan Information</a>
						
				</h4>
			</div>
			<div id="collapseFan" className="panel-collapse collapse in"
				role="tabpanel">
				<div className="panel-body">
					<form>
						<div className="form-group">
							<label for="name">Name:</label> 
								<input onChange={this.onChangeFunction} type="text"
								className="form-control" id="name"></input>
						</div>
						<div className="form-group">
							<label for="revision">Revision:</label> 
								<input onChange={this.onChangeFunction} type="text"
								className="form-control" id="revision"></input>
						</div>
						<div className="form-group">
							<label for="lastUpdatedBy">Last Updated By:</label>
								 <input onChange={this.onChangeFunction} type="text"
								className="form-control" id="lastUpdatedBy"></input>
						</div>
						<div className="form-group">
							<label for="status">Status:</label>
							<div className="radio">
								<label><input onChange={this.onChangeFunction}
									type="radio" name="status"></input>Draft</label>
							</div>
							<div className="radio">
								<label><input onChange={this.onChangeFunction}
									type="radio" name="status"></input>Available</label>
							</div>
							<div className="radio">
								<label><input onChange={this.onChangeFunction}
									type="radio" name="status"></input>Decommissioned</label>
							</div>
						</div>
						<div className="form-group">
							<label for="templateCategory">Template Category:</label> 
								<input onChange={this.onChangeFunction} type="text"
								className="form-control" id="templateCategory"></input>
						</div>


					</form>
				</div>
			</div>
		</div>
	


<div className="form-group">
	<label for="manufacturer">Manufacturer:</label> 
		<input onChange={this.onChangeFunction} type="text"
		className="form-control" id="manufacturer"></input>
</div>

<div className="form-group">
	<label for="orderablePartNumber">Orderable Part Number:</label> 
		 <input onChange={this.onChangeFunction} type="text"
		className="form-control" id="orderablePartNumber"></input>
</div>

<div className="form-group">
	<label for="description">Description:</label> 
		<input onChange={this.onChangeFunction} type="text"
		className="form-control" id="description"></input>
</div>

<div className="form-group">
	<label for="clei">CLEI:</label> 
		<input onChange={this.onChangeFunction} type="text"
		className="form-control" id="clei"></input>
</div>

<div className="form-group">
	<label for="materialId">Material ID (from Vz procurement
		system):</label> <input onChange={this.onChangeFunction} type="text"
		className="form-control" id="materialId"></input>
</div>

<div className="form-group">
	<label for="airFlow">Air Flow </label>
	<div className="radio">
		<label><input onChange={this.onChangeFunction}
			type="radio" name="airFlow"></input>Front-to-Back</label>
	</div>
	<div className="radio">
		<label><input onChange={this.onChangeFunction}
			type="radio" name="airFlow"></input>Back-to-Front</label>
	</div>

</div>
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

) } }); return FbFanData; });
