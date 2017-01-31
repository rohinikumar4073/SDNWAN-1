define([
    'react', 'jquery', 'jsx!components/Components', 'jsx!components/Templates', 'configurationEvents'
], function(React, $, Components, Templates, configurationEvents) {

    var LeftMenu = React.createClass({
        render: function() {
            return (
                <div className={(this.props.className || '')}>
                    <ul className="nav nav-tabs">
                        <li role="presentation" className="active">
                            <a href="" data-toggle="tab">Components</a>
                        </li>

                    </ul>
                    <div className="tab-content clearfix">
                        <div className="tab-pane active" id="component">
                            <Components source="js/data/ComponentData.json" topologyModel={this.props.topologyModel}/>

                        </div>

                    </div>
                    <ul className="nav nav-tabs left-tabs">
                        <li role="presentation" className="active">
                            <a href="" data-toggle="tab">Templates</a>
                        </li>
                    </ul>
                    <div className="tab-content clearfix">
                        <div className="tab-pane active" id="templates">
                            <Templates source="http://114.8.10.211:50512/FbTemplate/getAllFbInstances"/>
                        </div>
                    </div>
                </div>
            );
        }
    });

    return LeftMenu;
});
