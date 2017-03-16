define([
  'react', 'jquery', 'properties', 'react-jsonschema-form','toastr','services/renderService'
],function(React, $, properties, Form, toastr,renderService){
  var FormCustom = Form.default;

  var CreateFormCustom = React.createClass({

    render: function() {
    return(
      <div>
          <label class="switch">
          <input type="checkbox" onChange={renderService.setToggleStatus.bind(this,this.props.rowIndex,this.props.data)}/>
          <div class="slider round">
          </div>
          </label>
      </div>
    );
    }
});
return CreateFormCustom;
});
