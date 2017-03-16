define([
    'react', 'jquery', 'properties', 'react-jsonschema-form', 'toastr'
], function(React, $, properties, Form, toastr) {
    var FormCustom = Form.default;

    var CreateFbOti = React.createClass({
        onChangeFunction: function(e) {
          var fbName=this.props.data.label;

          debugger;
                if ($("#"+e.target.getAttribute("id")).is(":checked")) {
                    $.ajax({
                        url: properties.templateIp  + fbName + "/oti/activate",
                        type: 'get',
                        contentType: "application/json; charset=utf-8",
                        success: function() {
                            toastr.success("Success! FB activated")
                        },
                        error: function(data) {
                            toastr.error("Error! Unable to activate FB")
                        }
                    });
                } else{
                    $.ajax({
                        url: properties.templateIp  + fbName + "/oti/deactivate",
                        type: 'get',
                        contentType: "application/json; charset=utf-8",
                        success: function() {
                            toastr.success("Success! FB deactivated")
                        },
                        error: function(data) {
                            toastr.error("Error! Unable to deactivate FB")
                        }
                    });
                }

        },
        render: function() {
            if (this.props.data.type == "Forwarding Box") {
                return (
                    <div>
                        <input type="checkbox" id={"oti"+this.props.data.label} className={"oti"+this.props.data.label} onChange={this.onChangeFunction.bind(this)}></input>
                    </div>
                );
            } else {
                return (
                    <div></div>
                );
            }
        }
    });
    return CreateFbOti;
});
