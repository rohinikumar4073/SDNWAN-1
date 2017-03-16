define([
  'react', 'jquery', 'properties','toastr','services/renderService'
],function(React, $, properties, toastr, renderService){
  var CreateFormCustomCo = React.createClass({
    getInitialState: function(){

      return {is_dac: this.props.data.is_dac}
    },
    componentDidMount: function(){
    },
    handleClick: function(status){
      this.setState({is_dac: status});
      renderService.setRadioStatus(this.props.rowIndex,this.props.data,status);
    },
    render: function() {

      return(
          <div>
            <input type = "radio" name ={"radioCo"+this.props.rowIndex} value = "true" checked={this.state.is_dac? "checked": ""} onClick={this.handleClick.bind(this,true)}/>True
            <input type = "radio" name ={"radioCo"+this.props.rowIndex} value = "false" checked={this.state.is_dac? "": "checked"} onClick={this.handleClick.bind(this,false)} />False
          </div>
        );
  }
});
return CreateFormCustomCo;
});
