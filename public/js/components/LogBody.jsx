define([
    'react', 'jquery', 'properties', 'toastr', 'fixedTable'
], function(React, $, properties, toastr, fixedTable) {

    var Cell = fixedTable.Cell;
    var Table = fixedTable.Table;
    var Column = fixedTable.Column;
    var Row = fixedTable.Row;
    var TextCell = React.createClass({
        render: function() {
            return (
                <span>{this.props.rowIndex + 1}</span>
            )
        }
    });
    var DataCell = React.createClass({
        render: function() {
            return (
                <span>{this.props.data[this.props.rowIndex][this.props.col]}</span>
            )
        }
    });
    var CreateLogTable = React.createClass({

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
                    },
                    {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    },
                    {
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    },{
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    },{
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    },{
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    },{
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    },{
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    },{
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    },{
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    },{
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    },{
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    },{
                        "event": "FB Template Creation",
                        "status": "Failure",
                        "timestamp": "1233",
                        "remarks": "Unable to post data"
                    }
                ]

            }
        },
        keyPressFunction: function(event) {},
        render: function() {

            return (
                <div>
                    <Table rowHeight={50} width={2000} height={2000} rowsCount={data} headerHeight={50}>
                        <Column header={< Cell > S.No < /Cell>} cell={< TextCell data = {
                            this.state.myJson
                        }
                        col = "S.No" />} width={400}></Column>
                        <Column header={< Cell > Event < /Cell>} cell={< DataCell data = {
                            this.state.myJson
                        }
                        col = "event" />} width={400}></Column>
                        <Column header={< Cell > Status < /Cell>} cell={< DataCell data = {
                            this.state.myJson
                        }
                        col = "status" />} width={400}></Column>
                        <Column header={< Cell > Timestamp < /Cell>} cell={< DataCell data = {
                            this.state.myJson
                        }
                        col = "timestamp" />} width={400}></Column>
                        <Column header={< Cell > Remarks < /Cell>} cell={< DataCell data = {
                            this.state.myJson
                        }
                        col = "remarks" />} width={400}></Column>
                    </Table>
                </div>
            );
        }
    });
    return CreateLogTable;
});
