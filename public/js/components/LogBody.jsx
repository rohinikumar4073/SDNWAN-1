define([
    'react', 'jquery', 'properties', 'toastr', 'fixedTable', 'sockjs','properties','agGrid','reactCellRendererFactory','reactFilterFactory','stomp'
], function(React, $, properties, toastr, fixedTable, SockJS, properties,agGridReact,reactCellRendererFactory,reactFilterFactory) {
//const {Table, Column, Cell} = fixedTable;
var AgGridReactGRID=agGridReact.AgGridReact;
    var CreateLogTable = React.createClass({
      getInitialState: function(){
        return{showToolPanel: false, quickFilterText: null,height:50, icons: {
                columnRemoveFromGroup: '<i class="fa fa-remove"/>',
                filter: '<i class="fa fa-filter"/>',
                sortAscending: '<i class="fa fa-long-arrow-down"/>',
                sortDescending: '<i class="fa fa-long-arrow-up"/>',
                groupExpanded: '<i class="fa fa-minus-square-o"/>',
                groupContracted: '<i class="fa fa-plus-square-o"/>',
                columnGroupOpened: '<i class="fa fa-minus-square-o"/>',
                columnGroupClosed: '<i class="fa fa-plus-square-o"/>'
            }, columnDefs:[
              {headerName: '#', suppressSorting: true, width: 50, height:50, field: "number",
                suppressMenu: true, pinned: true},
                {headerName: 'Configuration', field: "configuration",width: 300, suppressSorting: true,
                suppressMenu: true, pinned: true},
                {headerName: 'Status', field: "type",width:300, suppressSorting: true,
                suppressMenu: true, pinned: true},
                {headerName: 'Element', field: "element",width: 300, suppressSorting: true,
                suppressMenu: true, pinned: true},
                {headerName: 'Message', field: "message", width: 300,suppressSorting: true,
                suppressMenu: true, pinned: true},
                {headerName: 'Time Stamp', field: "timestamp",width:300, suppressSorting: true,
                suppressMenu: true, pinned: true}
            ], rowData:[]}
      },
      componentDidMount:function(){
        debugger;
        var self = this;
        $.ajax({
          url: properties.getLog,
          type: 'get',
          data: "",
          contentType: "application/json; charset=utf-8",
          success: function(data){
            console.log(data);
            debugger;
            self.setState({rowData: data})
          },
          error: function(data){
            toastr.error("Could not get the logs!");
          }
        })
      },
      onShowGrid(show) {
       this.setState({
           showGrid: show
       });
     },
     onQuickFilterText(event) {
        this.setState({quickFilterText: event.target.value});
    },
      onGridReady: function(){

      },
      render: function(){
        var gridTemplate;
        var bottomHeaderTemplate;
        var topHeaderTemplate;
         gridTemplate =(
          <div className="ag-fresh logGrid">
        <AgGridReactGRID

            showToolPanel={this.state.showToolPanel}
            quickFilterText={this.state.quickFilterText}
            icons={this.state.icons}
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}

            suppressRowClickSelection="true"
            enableColResize="true"
            enableSorting="true"
            enableFilter="true"
            groupHeaders="true"
            rowHeight="35"
            debug="true"
        />
    </div>
  );
    topHeaderTemplate = (
      <div className="form-group">
          <input type="text" className="form-control gridFilter" onChange={this.onQuickFilterText.bind(this)}
                 placeholder="Type text to filter..."/>
      </div>
    );
        return <div className="container-fluid" >
            <div style={{padding: '15px'}}>
                {topHeaderTemplate}
                {bottomHeaderTemplate}
                {gridTemplate}
            </div>
        </div>;
    }
  })
  return CreateLogTable
})
