define([
  'react', 'jquery', 'properties','toastr','services/renderService'
],function(React, $, properties, toastr, renderService){

  var CreateFormCustom = React.createClass({

    render: function() {
      debugger;
    return(
      <div>
          <input type = "radio" name ={"radio"+this.props.rowIndex} value = "true" onClick={renderService.setRadioStatus.bind(this,this.props.rowIndex,this.props.data,true)}/>True<input type = "radio" name ={"radio"+this.props.rowIndex} value = "false" onClick={renderService.setRadioStatus.bind(this,this.props.rowIndex,this.props.data,false)} />False
      </div>
    );

    }
});
return CreateFormCustom;
});
