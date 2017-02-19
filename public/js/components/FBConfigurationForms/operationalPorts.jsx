define([
  'react', 'jquery', 'properties', 'react-jsonschema-form','toastr','agGrid','reactCellRendererFactory','reactFilterFactory', 'jsx!components/FBConfigurationForms/customReact','jsx!components/FBConfigurationForms/customReactToggle'
],function(React, $, properties, Form, toastr,agGridReact,reactCellRendererFactory,reactFilterFactory,customReact,customReactToggle){
  var FormOperationalPorts = Form.default;
  var AgGridReactGRID=agGridReact.AgGridReact;

  var CreateOperationalPorts = React.createClass({
    getInitialState: function(){
      return{columnDefs:[
        {headerName: '#', suppressSorting: true, width: 67, height:50, field: "number",
          suppressMenu: true, pinned: true},
          {headerName: 'Name', field: "name",width: 250, suppressSorting: true,
          suppressMenu: true, pinned: true},
          {headerName: 'Speed', field: "speed",width:200, suppressSorting: true,
          suppressMenu: true, pinned: true},
          {headerName: 'Is DAC', field: "is_dac",width: 200, suppressSorting: true,
          suppressMenu: true, pinned: true, cellRendererFramework: customReact},
          {headerName: 'Activate/Deactivate', field: "activate_deactivate", width: 200,suppressSorting: true,
          suppressMenu: true, pinned: true, cellRendererFramework: customReactToggle}
      ], rowData:[]}
    },

    onSubmit: function(){

    },

    componentDidMount: function(){
      var fbName = this.props.fbName;
      var getURL = properties.rmsIp +
          fbName +
          "/list-ports";
          var self = this;
          debugger;
          $.get(getURL, function(result) {
            self.setState({rowData: result})
            result.forEach(function(v,i){
              if(v.is_dac == true){
                $("input[type='radio'][name='"+i+"']").prop('checked', true);
              }
              else{
                $("input[type='radio'][name='"+i+"']").prop('checked', false);
              }
            })
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
