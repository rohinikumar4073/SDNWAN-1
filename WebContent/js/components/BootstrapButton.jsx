 define(['react','jquery'], function(React,$) {
 
 'use strict';

  // Simple pure-React component so we don't have to remember
  // Bootstrap's classes
  var BootstrapButton = React.createClass({
    render: function() {
      return (
        <a {...this.props}	
        href="javascript:;"
        role="button"
        className={(this.props.className || '') } > {this.props.data} </a>
        );
    }
    });
    
    
    return BootstrapButton;
    
    });