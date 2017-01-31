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
            return {showData: showData, collection: this.props.collection, details: [], currentClickedElement:-1};

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
            var indexTobeAdded = i + 4 - (i % 4);
                    if(this.state.collection.isOpened){
                            if (indexTobeAdded > this.state.collection.length &&  this.state.collection[indexTobeAdded]) {
                                this.state.collection.splice(this.state.collection.length - 1, 1)
                                this.state.collection.isOpened = false;
                            } else if(this.state.collection[indexTobeAdded]) {
                                this.state.collection.splice(indexTobeAdded, 1)
                                this.state.collection.isOpened = false;
                            }
                            this.setState({collection: this.state.collection,})
                          }
          if(i==this.state.currentClickedElement){
              this.state.currentClickedElement=-1;
            return;
          }
          this.state.currentClickedElement=i;
            var templateName = this.props.collection[i].name;
            var getURL = "";
                    this.props.heading == 'FB OS Template'
                        ? getURL = properties.getAllosIp
                            : this.props.heading == 'FB Transiever Hardware Template'
                                ? getURL = properties.getAllTransIp
                                : this.props.heading == 'FB Hardware Template'
                                    ? getURL = properties.getAllHardware
                                    : ""

            $.get(getURL, function(result) {

                if (!this.state.collection.isOpened) {
                    this.state.collection.isOpened = true;
                    var obj = result;
                    debugger;
                  if(Array.isArray(obj)){
                    var j = 0;
                    for(j=0;j<obj.length;j++){
                      if(obj[j] && obj[j].templateInfo && obj[j].templateInfo.name==templateName){
                        obj[j].isDetails = true;

                      this.state.collection.splice(indexTobeAdded, 0, obj[j])
                          break;
                      }
                    }

                  } else{

                    obj.isDetails = true;

                    this.state.collection.splice(indexTobeAdded, 0, obj)
                  }

                } else {
                    if (indexTobeAdded > this.state.collection.length) {
                        this.state.collection.splice(this.state.collection.length - 1, 1)
                        this.state.collection.isOpened = false;
                    } else {
                        this.state.collection.splice(indexTobeAdded, 1)
                        this.state.collection.isOpened = false;
                    }

                }
              this.setState({collection: this.state.collection})
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
                        ? "create-new"
                        : "create-new hidden"}>
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        <BootstrapLink data={"Create " + this.props.heading} heading={this.props.heading} template={this.props.template} addRow={this.props.addRow}/>
                    </div>
                    <div className={this.state.showData
                        ? this.props.className
                        : this.props.className + " hidden"}>
                        {this.state.collection.map(function(data, i) {
                            var boundClick = this.handleClick.bind(this, i);
                            if (!data.isDetails)
                                return <TemplateElement onClick={boundClick} collection={data} key={i}/>
                            else{
                              return (this.props.heading=='FB OS Template'
                            ? <FbosDetails collection={data} key={i}/>
                          :(this.props.heading=='FB Transiever Hardware Template'
                                ? <TransHardwareDetails collection={data} key={i}/>
                              : (this.props.heading=='FB Hardware Template'
                            ? <HardwareDetails collection={data} key={i}/>
                          : ""
                        )))

                            }

                        }, this)
}
                    </div>
                </div>
            );
        }

    });

    return Template;
});
