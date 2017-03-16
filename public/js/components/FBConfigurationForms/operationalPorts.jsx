define([
  'react', 'jquery', 'properties', 'react-jsonschema-form','toastr','agGrid','reactCellRendererFactory','reactFilterFactory', 'jsx!components/FBConfigurationForms/customReactOp','jsx!components/FBConfigurationForms/customReactToggleOp'
],function(React, $, properties, Form, toastr,agGridReact,reactCellRendererFactory,reactFilterFactory,customReactOp,customReactToggleOp){
  var FormOperationalPorts = Form.default;
  var AgGridReactGRID=agGridReact.AgGridReact;
  var a = [];
  var CreateOperationalPorts = React.createClass({
    getInitialState: function(){
      return{columnDefs:[
        {headerName: '#', suppressSorting: true, width: 100, height:50, field: "number",
          suppressMenu: true, pinned: true},
          {headerName: 'Name', field: "name",width: 260, suppressSorting: true,
          suppressMenu: true, pinned: true},
          {headerName: 'Speed', field: "speed",width:260, suppressSorting: true,
          suppressMenu: true, pinned: true},
          {headerName: 'Is DAC', field: "is_dac",width: 260, suppressSorting: true,
          suppressMenu: true, pinned: true, cellRendererFramework: customReactOp},
          {headerName: 'Activate/Deactivate', field: "activate_deactivate", width: 260,suppressSorting: true,
          suppressMenu: true, pinned: true, cellRendererFramework: customReactToggleOp}
      ], rowData:[],gridOptions:{}}
    },

    onSubmit: function(){

    },

    componentDidMount: function(){
      var newRow = [];
      var fbName = this.props.fbName;
      var getURL = properties.rmsIp +
          fbName +
          "/list-ports";
          var self = this;
          $.get(getURL, function(result) {
            result.forEach(function(v,i){
              v.port.number = i+1;
              v.port.activationStatus = v.activationStatus;
              newRow.push(v.port);
            })
            self.setState({rowData: newRow});
            self.state.gridOptions.api.sizeColumnsToFit();
          })
    },
    getRadioValues: function(data){
      debugger;
    },
    render: function() {


    return(
      <div className="ag-body-viewport">
          <div style={{padding: '15px'}}>
      <div className="ag-fresh ag-body-container logGrid operationalPorts">
      <AgGridReactGRID
        gridOptions={this.state.gridOptions}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          ref="grid"
          getRadioValues={this.getRadioValues}

          suppressRowClickSelection="true"
          enableColResize="true"
          enableSorting="true"
          enableFilter="true"
          groupHeaders="true"
          rowHeight="35"
          debug="true"
      />
      </div>
    </div>
</div>
    );
    }
});
return CreateOperationalPorts;
});
