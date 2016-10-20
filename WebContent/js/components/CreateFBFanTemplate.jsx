define(['react'], function(React) { var FbFanData = React.createClass({


render: function() { return (

<div className="accordion" className={this.props.className}>
	<div className="panel-group">
		<div className="panel panel-default">
			<div className="panel-heading">
				<h4 className="panel-title">
					<a data-toggle="collapse" href="#collapseFan" aria-expanded="true">Device
						Information</a>
				</h4>
			</div>
			<div id="collapseFan" className="panel-collapse collapse in"
				role="tabpanel">
				<div className="panel-body">
					<form>
						<div className="form-group">
							<label for="name">Name:</label> <input
								onChange={this.props.onChangeFunction} type="text"
								className="form-control" id="name"></input>
						</div>
						<div className="form-group">
							<label for="revision">Revision:</label> <input
								onChange={this.props.onChangeFunction} type="text"
								className="form-control" id="revision"></input>
						</div>
						<div className="form-group">
							<label for="lastUpdatedBy">Last Updated By:</label> <input
								onChange={this.props.onChangeFunction} type="text"
								className="form-control" id="lastUpdatedBy"></input>
						</div>
						<div className="form-group">
							<label for="status">Status:</label>
							<div className="radio">
								<label><input onChange={this.props.onChangeFunction}
									type="radio" name="status"></input>Draft</label>
							</div>
							<div className="radio">
								<label><input onChange={this.props.onChangeFunction}
									type="radio" name="status"></input>Available</label>
							</div>
							<div className="radio">
								<label><input onChange={this.props.onChangeFunction}
									type="radio" name="status"></input>Decommissioned</label>
							</div>
						</div>
						<div className="form-group">
							<label for="templateCategory">Template Category:</label> <input
								onChange={this.props.onChangeFunction} type="text"
								className="form-control" id="templateCategory"></input>
						</div>


					</form>
				</div>
			</div>
		</div>
	</div>


<div className="form-group">
	<label for="manufacturer">Manufacturer:</label> <input
		onChange={this.props.onChangeFunction} type="text"
		className="form-control" id="manufacturer"></input>
</div>

<div className="form-group">
	<label for="orderablePartNumber">Orderable Part Number:</label> <input
		onChange={this.props.onChangeFunction} type="text"
		className="form-control" id="orderablePartNumber"></input>
</div>

<div className="form-group">
	<label for="description">Description:</label> <input
		onChange={this.props.onChangeFunction} type="text"
		className="form-control" id="description"></input>
</div>

<div className="form-group">
	<label for="clei">CLEI:</label> <input
		onChange={this.props.onChangeFunction} type="text"
		className="form-control" id="clei"></input>
</div>

<div className="form-group">
	<label for="materialId">Material ID (from Vz procurement
		system):</label> <input onChange={this.props.onChangeFunction} type="text"
		className="form-control" id="materialId"></input>
</div>

<div className="form-group">
	<label for="airFlow">Air Flow </label>
	<div className="radio">
		<label><input onChange={this.props.onChangeFunction}
			type="radio" name="airFlow"></input>Front-to-Back</label>
	</div>
	<div className="radio">
		<label><input onChange={this.props.onChangeFunction}
			type="radio" name="airFlow"></input>Back-to-Front</label>
	</div>

</div>
</div>

) } }); return FbFanData; });
