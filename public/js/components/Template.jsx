define([
    'react',
    'jquery',
    'configurationEvents',
    'properties',
    'jsx!components/TemplateElement',
    'jsx!components/BootstrapLink',
    'jsx!components/Details',
    'jsx!components/TemplateDetails',
    'jsx!components/FbosDetails',
      'jsx!components/TransHardwareDetails',
      'jsx!components/HardwareDetails',
], function(React, $, configurationEvents, properties, TemplateElement, BootstrapLink, Details, TemplateDetails, FbosDetails, TransHardwareDetails, HardwareDetails) {
    var Template = React.createClass({

        toggleData: function() {
            if (this.state.showData)
                this.setState({showData: false});
            else
                this.setState({showData: true});

            }
        ,

        getInitialState: function() {
          var showData=false;
          if(this.props.index==0){
            showData=true
          }
            return {showData: showData, collection: this.props.collection, details: [], currentClickedElement:-1, templateCollection: {}};

        },
        setCollection: function() {
            this.setState({collection: this.props.collection});
        },
        addRow: function(data) {
            data.className = "fa-caret-right"
            this.state.collection[0] = data;
            this.setState({collection: this.state.collection});
        },
        handleClick: function(i) {
          this.state.currentClickedElement = i;
          var templateName = this.props.collection[i].name;
          var getURL = "";
          this.props.heading == 'FB OS Template'
            ? getURL = properties.getAllosIp
            : this.props.heading == 'FB Transiever Hardware Template'
              ? getURL = properties.getAllTransIp
              : this.props.heading == 'FB Hardware Template'
                  ? getURL = properties.getAllHardware
                  : ""

                  $.get(getURL, function(result){
                    var obj = result;
                    var j = 0;
                    for(j = 0; j < obj.length; j++){
                      debugger;
                      if(obj[j] && obj[j].templateInfo && obj[j].templateInfo.name==templateName){
                        debugger;
                        this.setState({templateCollection: obj[j]})
                      }
                    }
                }.bind(this));
              },

        render: function() {

            return (

                <div className="layout-template">
                    <h5 onClick={this.toggleData}>{this.props.heading}
                        <span className="accordion">
                            <i className={this.state.showData
                                ? "fa fa-caret-down"
                                : "fa fa-caret-right"} aria-hidden="true"></i>
                        </span>
                    </h5>
                  <hr/>

                    <div className={this.state.showData
                        ? ""
                        : "hidden"}>
                        {this.state.collection.map(function(data, i) {
                            var boundClick = this.handleClick.bind(this, i);
                            return <TemplateElement onClick={boundClick} collection={data} templateCollection={this.state.templateCollection} heading={this.props.heading} template={this.props.template}  key={i}/>

                        }, this)
}
                    </div>
                </div>
            );
        }

    });

    return Template;
});
