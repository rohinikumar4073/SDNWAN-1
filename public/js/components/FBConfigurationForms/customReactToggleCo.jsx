define([
  'react', 'jquery', 'properties','toastr','services/renderService'
],function(React, $, properties, toastr,renderService){
  var CreateFormCustom = React.createClass({
    getInitialState: function(){
      return {activate_status: this.props.data.activationStatus}
    },
    componentDidMount: function(){

    },
    handleClick: function(status,event){
      var value = $('#checkCo'+ this.props.rowIndex).is(":checked");
      if(value){
        this.setState({activate_status: status});
      }
      else{
        this.setState({activate_status: false});
      }
      debugger;
      renderService.setToggleStatus(this.props.rowIndex,this.props.data,value);
    },
    render: function() {
          return(
            <div>
                <label class="switch"><input type="checkbox" id ={"checkCo"+this.props.rowIndex} checked={(this.state.activate_status == "activate")? "checked": ""} onChange={this.handleClick.bind(this,"activate",event)}/><div class="slider round"></div></label>
              </div>
            );
      }
});
return CreateFormCustom;
});
