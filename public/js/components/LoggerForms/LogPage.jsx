define([
    'react', 'jquery', 'properties', 'toastr', 'fixedTable'
], function(React, $, properties, toastr, fixedTable) {

    var CreateLogTable = React.createClass({
        var Table = fixedTable.Table;
        var Column = fixedTable.Column;
        var Cell = fixedTable.Cell;
        onChangeFunction: function(e) {},
        handleConfirm: function() {},
        getInitialState: function() {
            return {
               rows :[['a1', 'b1', 'c1'],['a2', 'b2', 'c2'],['a3', 'b3', 'c3']]
            }
          },
            keyPressFunction : function(event) {},
            render : function() { <Table
                rowHeight = {
                    50
                }
                rowsCount = {
                    rows.length
                }
                width = {
                    5000
                }
                height = {
                    5000
                }
                headerHeight = {
                    50
                } > <Column header={<Cell> Col 1 </Cell>} cell={<Cell> Column 1 static content </Cell>} width={2000}/> <Column
                header = { <Cell> Col 2 </Cell>}
      cell={<MyCustomCell mySpecialProp="column2" / >
                }
                width = {
                    1000
                }
                />
    <Column
      header={<Cell>Col 3</Cell >
        }
        cell = {
            ({
                rowIndex,
                ...props
            }) => (
                <Cell {...props}>
                    Data for column 3: {rows[rowIndex][2]}
                </Cell>
            )
        }
        width = {
            2000
        } /> </Table>return ();
    }
});
return CreateLogTable;
});
