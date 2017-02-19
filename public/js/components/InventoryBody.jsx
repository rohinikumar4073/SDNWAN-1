define([
    'react', 'jquery', 'properties', 'toastr', 'fixedTable', 'sockjs','properties','agGrid','reactCellRendererFactory','reactFilterFactory','axios','stomp'
], function(React, $, properties, toastr, fixedTable, SockJS, properties,agGridReact,reactCellRendererFactory,reactFilterFactory,axios) {
//const {Table, Column, Cell} = fixedTable;
var AgGridReactGRID=agGridReact.AgGridReact;
    var InventoryBody = React.createClass({
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

            },  scrollbarWidth	:function(){
                  return ($(window).width() * 100) / 120 - 50 ;
            }, columnDefs:[
              {headerName: '#', width: 50, height:50, field: "id",
              pinned: true},
                {headerName: 'Name', field: "label",width: 300,
              pinned: true},
                {headerName: 'Type', field: "type",width:300,
              pinned: true},
                {headerName: 'Category', field: "category",width: 300,
              pinned: true},
                {headerName: 'Latitute', field: "latitude", width: 300,
              pinned: true},
                {headerName: 'Longitude', field: "Longitude",width:300
                , pinned: true},

                  {headerName: 'Node Group', field: "nodeGroup",width:300
                  , pinned: true},
            ], rowData:[]}
      },
      getNodeType(type){
        switch (type) {
          case "fb-icon":
            return "Forwarding Box"
            break;
            case "host":
              return "Host"
              break;
              case "optical-switch":
                return "Optical Switch"
                break;

          default:

        }

      },  getNodeGroup(id,nodeGroupArr){

        if(nodeGroupArr[id]){
          return nodeGroupArr[id];
        }else{
          return " ";
        }


        },
      componentDidMount:function(){
        var self = this;
        var height = $(window).height()-156;
         $(".inventoryGrid").height(height)

        axios.get(properties.getNativeTopologyData).then(function(response){
          response.data;
          var nodeDataArr=[];
          var nodeGroupArr=[]
          if(  response.data.nodeSet)
          response.data.nodeSet.forEach(function(v,i){
            if(v.nodes)
              v.nodes.forEach(function(v2,i2){
                nodeGroupArr[v2]=v.label;
              })

          })
          response.data.nodes.forEach(function(v,i){
            var nodeData={
                id:v.id,
                label:v.label,
                type:self.getNodeType(v.iconType),
                category:"Node",
                latitude:v.latitude,
                Longitude:v.longitude,
                nodeGroup:self.getNodeGroup(v.id,nodeGroupArr)
            }
            nodeDataArr.push(nodeData)

          })
          self.setState({rowData: nodeDataArr})
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
          <div className="ag-fresh inventoryGrid">
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
  return InventoryBody;
})
