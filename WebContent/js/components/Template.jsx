define([
    'react', 'jquery', 'jsx!components/TemplateElement', 'jsx!components/BootstrapLink', 'jsx!components/Details'
], function(React, $, TemplateElement, BootstrapLink, Details) {
    var Template = React.createClass({

        toggleData: function() {
            if (this.state.showData)
                this.setState({showData: false});
            else

                this.setState({showData: true});

            }
        ,
        getInitialState: function() {
            return {showData: true, collection: this.props.collection};

        },
        addRow: function(data) {
            console.log(data);
            data.className = "fa-exchange"
            this.state.collection[0] = data;
            this.setState({collection: this.state.collection});
        },
        handleClick: function(i) {
            var indexTobeAdded = i + 4 - (i % 4);
            //console.log(indexTobeAdded);
            //console.log(this.state.collection);

            if (!this.state.collection.isOpened) {
                this.state.collection.isOpened = true;
                var obj = JSON.parse(JSON.stringify(this.state.collection[i]))
                obj.isDetails = true;
                this.state.collection.splice(indexTobeAdded, 0, obj)
            } else {
                this.state.collection.slice(indexTobeAdded, indexTobeAdded + 1)
                this.state.collection.isOpened = false;
            }


            this.setState({collection: this.state.collection})
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
                        <BootstrapLink data={"Create " + this.props.heading} addRow={this.addRow} heading={this.props.heading} template={this.props.template}/>
                    </div>

                    <div className={this.state.showData
                        ? this.props.className
                        : this.props.className + " hidden"}>
                        {this.state.collection.map(function(data, i) {
                            var boundClick = this.handleClick.bind(this, i);
                            console.log("Is details" + data.isDetails);
                            if (!data.isDetails)
                                return <TemplateElement onClick={boundClick} collection={data} key={i}/>
                            else
                                return <Details collection={data} key={i}/>

                        }, this)
}
                    </div>
                </div>
            );
        }

    });

    return Template;
});
