define(['react'], function(React) { var FBOSData = React.createClass({


render: function() { return (
<div className="accordion" className={this.props.classNameName}>
	<div className="panel-group">
		<div className="panel panel-default">
			<div className="panel-heading">
				<h4 className="panel-title">
					<a data-toggle="collapse" href="#collapseOS1">Template
						Information</a>
				</h4>
			</div>
			<div id="collapseOS1" className="panel-collapse collapse">
				<div className="panel-body">
					<form>
						<div className="form-group">
							<label for="name">Name:</label> <input type="text"
								className="form-control" onChange={this.props.onChangeFunction}
								id="name"></input>
						</div>
						<div className="form-group">
							<label for="revision">Revision:</label> <input type="text"
								className="form-control" onChange={this.props.onChangeFunction}
								id="revision"></input>
						</div>
						<div className="form-group">
							<label for="lastUpdatedBy">Last Updated By:</label> <input
								type="text" className="form-control"
								onChange={this.props.onChangeFunction} id="lastUpdatedBy"></input>
						</div>
						<div className="form-group">
							<label for="timestamp">Time Stamp:</label> <input type="text"
								className="form-control" onChange={this.props.onChangeFunction}
								id="timestamp"></input>
						</div>
						<div className="form-group">
							<label for="status">Status:</label>
							<div className="radio">
								<label><input type="radio" name="status"
									onChange={this.props.onChangeFunction}></input>Draft</label>
							</div>
							<div className="radio">
								<label><input type="radio" name="status"
									onChange={this.props.onChangeFunction}></input>Available</label>
							</div>
							<div className="radio">
								<label><input type="radio" name="status"
									onChange={this.props.onChangeFunction}></input>Decommissioned</label>
							</div>
						</div>
						<div className="form-group">
							<label for="templateCategory">Template Category:</label> <input
								type="text" className="form-control" id="templateCategory"></input>
						</div>


					</form>
				</div>
			</div>
		</div>
	



	<div className="form-group">
		<label for="osIdentifier">OS Identifier/Label:</label> <input
			type="text" className="form-control" id="osIdentifier"></input>
	</div>
	<div className="form-group">
		<label for="manufacturer">Manufacturer:</label> <input type="text"
			className="form-control" id="manufacturer"></input>
	</div>
	<div className="form-group">
		<label for="version">Version:</label> <input type="text"
			className="form-control" id="version"></input>
	</div>
	<div className="form-group">
		<label for="imageFileName">Image File Name:</label> <input type="text"
			className="form-control" id="imageFileName"></input>
	</div>

	<div className="form-group">
		<label for="orderablePartNumber">Orderable Part Number:</label> <input
			type="text" className="form-control" id="orderablePartNumber"></input>
	</div>

	<div className="form-group">
		<label for="description">Description:</label> <input type="text"
			className="form-control" id="description"></input>
	</div>

	<div className="form-group">
		<label for="materialId">Material ID (from Vz procurement
			system):</label> <input type="text" className="form-control" id="materialId"></input>
	</div>
	<div className="form-group">
		<label for="openFlowVersion">OpenFlow Protocol Version(s)
			Supported:</label>
		<div className="radio">
			<label><input type="radio" name="openFlowVersion"></input>1.3</label>
		</div>
		<div className="radio">
			<label><input type="radio" name="openFlowVersion"></input>1.5</label>
		</div>
	</div>

	<div className="form-group">
		<label for="linuxVersion">Linux kernel version:</label> <input
			type="text" className="form-control" id="linuxVersion"></input>
	</div>

	<div className="form-group">
		<label for="linuxBase">Linux Distribution base:</label> <input
			type="text" className="form-control" id="linuxBase"></input>
	</div>




		<div className="panel panel-default">
			<div className="panel-heading">
				<h4 className="panel-title">
					<a data-toggle="collapse" href="#collapseOS2"> OS Configuration</a>
				</h4>
			</div>
			<div id="collapseOS2" className="panel-collapse collapse">
				<div className="panel-body">
					<form>
						<div className="form-group">
							<label for="enableArp">Enable Local ARP Response
								Processing:</label>
							<div className="radio">
								<label><input type="radio" name="enableArp"></input>True</label>
							</div>
							<div className="radio">
								<label><input type="radio" name="enableArp"></input>False</label>
							</div>

						</div>
						<div className="form-group">
							<label for="localArp">Local ARP Response Subnet Coverage:</label>
							<input type="text" className="form-control" id="localArp"></input>
						</div>

						<div className="form-group">
							<label for="enableNd">Enable Local IPv6 ND Response
								Processing:</label>
							<div className="radio">
								<label><input type="radio" name="enableNd"></input>True</label>
							</div>
							<div className="radio">
								<label><input type="radio" name="enableNd"></input>False</label>
							</div>
						</div>

						<div className="form-group">
							<label for="localIpv6">Local IPv6 ND Response Subnet
								Coverage:</label> <input type="text" className="form-control"
								id="localIpv6"></input>
						</div>


						<div className="form-group">
							<label for="queryInterval">FB & SFP Inventory Query
								Interval(sec):</label> <input type="text" className="form-control"
								id="queryInterval"></input>
						</div>

						<div className="form-group">
							<label for="interfaceInterval">Interface and Flow Counter
								Query Interval(sec):</label> <input type="text" className="form-control"
								id="interfaceInterval"></input>
						</div>

						<div className="form-group">
							<label for="alarmHistory">Alarm History:</label>
							<div className="radio">
								<label><input type="radio" name="alarmHistory"></input>Enabled</label>
							</div>
							<div className="radio">
								<label><input type="radio" name="alarmHistory"></input>Disabled</label>
							</div>
						</div>

						<div className="form-group">
							<label for="alarmHigh">Alarm High Temperature(F Degrees):</label>
							<input type="text" className="form-control" id="alarmHigh"></input>
						</div>
						<div className="form-group">
							<label for="alarmLow">Alarm Low Temperature(F Degrees):</label> <input
								type="text" className="form-control" id="alarmLow"></input>
						</div>
						<div className="form-group">
							<label for="puppet">Puppet Agent Utilized:</label>
							<div className="radio">
								<label><input type="radio" name="puppet"></input>True</label>
							</div>
							<div className="radio">
								<label><input type="radio" name="puppet"></input>False</label>
							</div>
						</div>


					</form>
				</div>
			</div>
		</div>
	</div>




</div>


)

   }
    });
  return FBOSData;


    });
