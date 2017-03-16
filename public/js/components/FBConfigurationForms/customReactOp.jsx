define([
  'react', 'jquery', 'properties','toastr','services/renderService'
],function(React, $, properties, toastr, renderService){
  var CreateFormCustomOp = React.createClass({
    getInitialState: function(){

      return {is_dac: this.props.data.is_dac}
    },
    componentDidMount: function(){
    },
    render: function() {
          return(
            <div>
              <input type = "radio" name ={"radioOp"+this.props.rowIndex} value = "true" disabled="disabled" checked={this.state.is_dac? "checked": null} />True
                <input type = "radio" name ={"radioOp"+this.props.rowIndex} value = "false" disabled="disabled" checked={this.state.is_dac? null: "checked"} />False
            </div>
          );
  }
});
return CreateFormCustomOp;
});
