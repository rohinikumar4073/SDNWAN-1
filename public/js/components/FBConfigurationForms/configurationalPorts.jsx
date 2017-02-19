define([
  'react', 'jquery', 'properties', 'react-jsonschema-form','toastr','agGrid','reactCellRendererFactory','reactFilterFactory'
],function(React, $, properties, Form, toastr,agGridReact,reactCellRendererFactory,reactFilterFactory){
  var FormOperationalPorts = Form.default;
  var AgGridReactGRID=agGridReact.AgGridReact;

  var CreateConfigurationalPorts = React.createClass({
    getInitialState: function(){
      return{formData: {}, columnDefs:[
        {headerName: '#', suppressSorting: true, width: 67, height:50, field: "number",
          suppressMenu: true, pinned: true},
          {headerName: 'Name', field: "name",width: 250, suppressSorting: true,
          suppressMenu: true, pinned: true},
          {headerName: 'Speed', field: "speed",width:200, suppressSorting: true,
          suppressMenu: true, pinned: true},
          {headerName: 'Is DAC', field: "is_dac",width: 200, suppressSorting: true,
          suppressMenu: true, pinned: true, cellRenderer: this.isDacCellRendererFunc},
          {headerName: 'Activate/Deactivate', field: "activate_deactivate", width: 200,suppressSorting: true,
          suppressMenu: true, pinned: true, cellRenderer: this.activateDeactivateCellRendererFunc}
      ], rowData:[]}
    },
    isDacCellRendererFunc: function(a){
      return '<input type = "radio" name ='+a.rowIndex+' value = "true" checked="checked">True</input> <input type = "radio" name = '+a.rowIndex+' value = "false" checked="checked">False</input>';
    },
    activateDeactivateCellRendererFunc: function(a){
      return '<label class="switch"><input type="checkbox"><div class="slider round"></div></label>';
    },
    validate: function(){

    },
    onSubmit: function(){

    },
    componentDidMount: function(){
      var fbName = this.props.fbName;
      var getURL = properties.rmsIp +
          fbName +
          "/list-ports";
          var self = this;
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
    getAllRows: function(rows){
      debugger;

    },
    onChange: function(){
      debugger;
    },
    render: function() {

        return(
          <div className="container-fluid">
              <div style={{padding: '15px'}}>
          <div className="ag-fresh ag-body-container logGrid configurationalPorts">
          <AgGridReactGRID
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
              getAllRows = {this.getAllRows}
              onChange = {this.onChange}

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
return CreateConfigurationalPorts;
});
