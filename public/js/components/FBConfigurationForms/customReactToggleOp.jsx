define([
  'react', 'jquery', 'properties','toastr','services/renderService'
],function(React, $, properties, toastr,renderService){
  var CreateFormCustom = React.createClass({
    getInitialState: function(){
      return {activate_status: this.props.data.activationStatus}
    },
    componentDidMount: function(){
    
    },
    render: function() {
          return(
            <div>
                <label class="switch"><input type="checkbox" name ={"checkOp"+this.props.rowIndex} disabled="disabled" checked={(this.state.activate_status == "activate")? "checked": ""}/><div class="slider round"></div></label>
              </div>
            );
    }
});
return CreateFormCustom;
});
