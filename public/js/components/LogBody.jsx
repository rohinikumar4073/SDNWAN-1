define([
    'react', 'jquery', 'properties', 'toastr', 'fixedTable'
], function(React, $, properties, toastr, fixedTable) {
//const {Table, Column, Cell} = fixedTable;
    var Cell = fixedTable.Cell;
    var Table = fixedTable.Table;
    var Column = fixedTable.Column;
    var Row = fixedTable.Row;
    var TextCell = React.createClass({
        render: function() {
            return (
                <cell>{this.props.rowIndex + 1}</cell>
            )
        }
    });
    var DataCell = React.createClass({
        render: function() {
            return (
                <cell>{this.props.data[this.props.rowIndex][this.props.col]}</cell>
            )
        }
    });

    var CreateLogTable = React.createClass({
        onFilterChange: function(e) {
            if (!e.target.value) {
                this.setState({filteredJson: this.state.myJson});
            }
            var filterBy = e.target.value.toLowerCase();
            var size = this.state.myJson.length;
            var filteredIndexes = [];
            for (var index = 0; index < size; index++) {
                var {event} = this.state.myJson[index];
                if (event.toLowerCase().indexOf(filterBy) !== -1) {
                    filteredIndexes.push(index);
                }
            }
            this.setState({
                filteredJson: new DataListWrapper(filteredIndexes, this.state.myJson)
            });
        },
        onChangeFunction: function(e) {
            this.setState({myJson: this.state.myJson});
        },
        handleConfirm: function() {},
        getInitialState: function() {
            return {
                number: 1,
                myJson: [
                    {
                        "event": "Fan Template Creation",
                        "status": "Success",
                        "timestamp": "1233",
                        "remarks": "Fan template created"
                    }, {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    }, {
                        "event": "OS Template Creation",
                        "status": "Success",
                        "timestamp": "1233",
                        "remarks": "Succesfully created"
                    }, {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    }, {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    }, {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    }, {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    }, {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    }, {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    }, {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    }, {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    }, {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    }, {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    }, {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    }, {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    }
                ],
                filteredJson: []
            }
        },
        keyPressFunction: function(event) {},
        render: function() {
            return (
                <div className="divtable"><div className="filterJson">
                    <input onChange={this.onFilterChange} placeholder="Filter by Event"></input></div>
                    <Table rowHeight={50} width={1500} height={500} rowsCount={this.state.myJson.length} headerHeight={50}>
                        <Column header={<Cell> S.No </Cell>} cell={<TextCell data = {
                            this.state.myJson
                        }
                        col = "S.No" />} width={300}></Column>
                      <Column header={<Cell> Event < /Cell>} cell={<DataCell data = {
                            this.state.myJson
                        }
                        col = "event" />} width={300}></Column>
                      <Column header={<Cell> Status </Cell>} cell={<DataCell data = {
                            this.state.myJson
                        }
                        col = "status" />} width={300}></Column>
                      <Column header={<Cell> Timestamp </Cell>} cell={<DataCell data = {
                            this.state.myJson
                        }
                        col = "timestamp" />} width={300}></Column>
                        <Column header={<Cell> Remarks </Cell>} cell={<DataCell data = {
                            this.state.myJson
                        }
                        col = "remarks" />} width={300}></Column>
                        </Table></div>
                      );
                  }
              });
              return CreateLogTable;
          });
