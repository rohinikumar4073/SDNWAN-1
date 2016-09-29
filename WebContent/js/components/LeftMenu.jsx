 define(['react','jquery','jsx!components/Components','jsx!components/Templates'], function(React,$,Components,Templates) {
 
 var LeftMenu = React.createClass({
    render: function() {
      return (
        <div className={(this.props.className || '') } >
        <ul className="nav nav-tabs">
        <li role="presentation" className="active"><a href="#component" data-toggle="tab">Components</a></li>
        <li role="presentation"><a href="#templates" data-toggle="tab">Templates</a></li>
        </ul>
        <div className="tab-content clearfix">
        <div className="tab-pane active" id="component">
        <Components source="js/data/ComponentData.json" topologyModel={this.props.topologyModel}/>

        </div>
        <div className="tab-pane" id="templates" >
        <Templates source="http://114.8.10.211:50512/FbTemplate/getAllFbInstances" />

        </div>       
        </div>
        </div>
        );
      },

      });
 
  return LeftMenu;
   });