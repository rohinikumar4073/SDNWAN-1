 define(['react','jquery','jsx!components/ComponentElement'], function(React,$,ComponentElement) {
 var Component = React.createClass({

    render: function() {


      return (<div className="layout-component">
        
        <div className={this.props.className}>
        {    
          this.props.collection.map(function(data,i){
            return <ComponentElement collection={data} key={i} topologyModel={this.props.topologyModel} />
            }.bind(this))
        }
        </div>
        </div>
        );
    }
      });
      return Component;
      });
