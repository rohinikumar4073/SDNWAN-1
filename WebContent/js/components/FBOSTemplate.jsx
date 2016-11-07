define(['react','jsx!components/BootstrapButton'], function(React,BootstrapButton) { var FBOSData = React.createClass({
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
            url: "http://10.76.110.81:50513/FbTemplate/CreateOsTemplate",
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


  "alarmHistory": "",
  "alarmLowTemp": "",
  "enableLocalArpResponse": "",
  "enableLocalIpv6ArpResponse": "",
  "fb_sfp_interval": "",
  "interfceFlowCounterInt": "",
  "lastUpdatedBy": "",
  "localArpResponseCoverage": "",
  "localIpv6ArpResponseCoverage": "",
  "name": "",
  "puppetAgentUtilizad": "",
  "revision": "",
  "status": "",
  "templateCategory": "",
  "timeStamp": ""

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
  							<a data-toggle="collapse" href="#collapseOS"
  								aria-expanded="true">Template Information</a>
  						</h4>
  					</div>
  					<div id="collapseOS" className="panel-collapse collapse in"
  						role="tabpanel">
  						<div className="panel-body">
  							<form>
  								<div className="form-group">
  									<label for="name">Name:</label> <input type="text"
  										className="form-control" onChange={this.onChangeFunction}
  										id="name"></input>
  								</div>
  								<div className="form-group">
  									<label for="revision">Revision:</label> <input type="text"
  										className="form-control" onChange={this.onChangeFunction}
  										id="revision"></input>
  								</div>
  								<div className="form-group">
  									<label for="lastUpdatedBy">Last Updated By:</label> <input
  										type="text" className="form-control"
  										onChange={this.onChangeFunction} id="lastUpdatedBy"></input>
  								</div>
  								<div className="form-group">
  									<label for="timeStamp">Time Stamp:</label> <input type="text" disabled="true"
  										className="form-control" onChange={this.onChangeFunction} defaultValue={Date()}
  										id="timeStamp"></input>
  								</div>
  								<div className="form-group">
  									<label for="status">Status:</label>
  									<div className="radio">
  										<label><input type="radio" name="status"
  											onChange={this.onChangeFunction}></input>Draft</label>
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
  									<label for="templateCategory">Template Category:</label> <input defaultValue="Operating System" disabled="true"
  										type="text" className="form-control" id="templateCategory"
  										onChange={this.onChangeFunction}></input>

  								</div>

  							</form>
  						</div>
  					</div>
  				</div>



  				<form>

  					<div className="form-group">
  						<label for="osIdentifierOS">OS Identifier/Label:</label> <input
  							type="text" className="form-control" id="osIdentifierOS"
  							onChange={this.onChangeFunction}></input>
  					</div>
  					<div className="form-group">
  						<label for="manufacturerOS">Manufacturer:</label> <input
  							type="text" className="form-control" id="manufacturerOS"
  							onChange={this.onChangeFunction}></input>
  					</div>
  					<div className="form-group">
  						<label for="versionOS">Version:</label> <input type="text"
  							className="form-control" id="versionOS"
  							onChange={this.onChangeFunction}></input>
  					</div>
  					<div className="form-group">
  						<label for="imageFileNameOS">Image File Name:</label> <input
  							type="text" className="form-control" id="imageFileNameOS"
  							onChange={this.onChangeFunction}></input>
  					</div>

  					<div className="form-group">
  						<label for="orderablePartNumberOS">Orderable Part Number:</label>
  						<input type="text" className="form-control"
  							id="orderablePartNumberOS" onChange={this.onChangeFunction}></input>
  					</div>

  					<div className="form-group">
  						<label for="descriptionOS">Description:</label> <input type="text"
  							className="form-control" id="descriptionOS"
  							onChange={this.onChangeFunction}></input>
  					</div>

  					<div className="form-group">
  						<label for="materialIdOS">Material ID (from Vz
  							procurementsystem):</label> <input type="text" className="form-control"
  							id="materialIdOS" onChange={this.onChangeFunction}></input>
  					</div>
  					<div className="form-group">
  						<label for="openFlowVersionOS">OpenFlow Protocol
  							Version(s) Supported:</label>
  						<div className="radio">
  							<label><input type="radio" name="openFlowVersionOS"
  								onChange={this.onChangeFunction}></input>1.3</label>
  						</div>
  						<div className="radio">
  							<label><input type="radio" name="openFlowVersionOS"
  								onChange={this.onChangeFunction}></input>1.5</label>
  						</div>
  					</div>

  					<div className="form-group">
  						<label for="linuxVersionOS">Linux kernel version:</label> <input
  							type="text" className="form-control" id="linuxVersionOS"
  							onChange={this.onChangeFunction}></input>
  					</div>

  					<div className="form-group">
  						<label for="linuxBaseOS">Linux Distribution base:</label> <input
  							type="text" className="form-control" id="linuxBaseOS"
  							onChange={this.onChangeFunction}></input>
  					</div>

  				</form>
  				<div className="panel panel-default">
  					<div className="panel-heading">
  						<h4 className="panel-title">
  							<a data-toggle="collapse" href="#collapseOS2"
  								aria-expanded="true"> OS Configuration</a>
  						</h4>
  					</div>
  					<div id="collapseOS2" className="panel-collapse collapse in"
  						role="tabpanel">
  						<div className="panel-body">
  							<form>
  								<div className="form-group">
  									<label for="enableArp">Enable Local ARP Response
  										Processing:</label>
  									<div className="radio">
  										<label><input type="radio" name="enableArp"
  											onChange={this.onChangeFunction}></input>True</label>
  									</div>
  									<div className="radio">
  										<label><input type="radio" name="enableArp"
  											onChange={this.onChangeFunction}></input>False</label>
  									</div>

  								</div>
  								<div className="form-group">
  									<label for="localArp">Local ARP Response Subnet
  										Coverage:</label> <input type="text" className="form-control"
  										id="localArp" onChange={this.onChangeFunction}></input>
  								</div>

  								<div className="form-group">
  									<label for="enableNd">Enable Local IPv6 ND Response
  										Processing:</label>
  									<div className="radio">
  										<label><input type="radio" name="enableNd"
  											onChange={this.onChangeFunction}></input>True</label>
  									</div>
  									<div className="radio">
  										<label><input type="radio" name="enableNd"
  											onChange={this.onChangeFunction}></input>False</label>
  									</div>
  								</div>

  								<div className="form-group">
  									<label for="localIpv6">Local IPv6 ND Response Subnet
  										Coverage:</label> <input type="text" className="form-control"
  										id="localIpv6" onChange={this.onChangeFunction}></input>
  								</div>


  								<div className="form-group">
  									<label for="queryInterval">FB & SFP Inventory Query
  										Interval(sec):</label> <input type="text" className="form-control"
  										id="queryInterval" onChange={this.onChangeFunction}></input>
  								</div>

  								<div className="form-group">
  									<label for="interfaceInterval">Interface and Flow
  										Counter Query Interval(sec):</label> <input type="text"
  										className="form-control" id="interfaceInterval"
  										onChange={this.onChangeFunction}></input>
  								</div>

  								<div className="form-group">
  									<label for="alarmHistory">Alarm History:</label>
  									<div className="radio">
  										<label><input type="radio" name="alarmHistory"
  											onChange={this.onChangeFunction}></input>Enabled</label>
  									</div>
  									<div className="radio">
  										<label><input type="radio" name="alarmHistory"
  											onChange={this.onChangeFunction}></input>Disabled</label>
  									</div>
  								</div>

  								<div className="form-group">
  									<label for="alarmHigh">Alarm High Temperature(F
  										Degrees):</label> <input type="text" className="form-control"
  										id="alarmHigh" onChange={this.onChangeFunction}></input>
  								</div>
  								<div className="form-group">
  									<label for="alarmLow">Alarm Low Temperature(F Degrees):</label>
  									<input type="text" className="form-control" id="alarmLow"
  										onChange={this.onChangeFunction}></input>
  								</div>
  								<div className="form-group">
  									<label for="puppet">Puppet Agent Utilized:</label>
  									<div className="radio">
  										<label><input type="radio" name="puppet"
  											onChange={this.onChangeFunction}></input>True</label>
  									</div>
  									<div className="radio">
  										<label><input type="radio" name="puppet"
  											onChange={this.onChangeFunction}></input>False</label>
  									</div>
  								</div>


  							</form>
  						</div>
  					</div>
  				</div>
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
  return FBOSData;


    });
