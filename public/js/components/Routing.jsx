define([
    'react', 'jsx!components/Container',  'jsx!components/Policy', 'jsx!components/Header', 'jsx!components/Bgp', 'jsx!components/Configuration','jsx!components/Logs',
    'jsx!components/Inventory',
    'jsx!components/Vlan'
], function(React, Container,Policy,Header,Bgp,Configuration,Logs,Inventory,Vlan) {

    var RoutingFile = React.createClass({
      getInitialState:function(){
        return {
          displayPage:"Container"
        }
      },
      setLink:function(value){
        this.setState({displayPage:value})
        	$(".n-topology-tooltip").hide()
        $(".navbar-header .navbar-toggle").click()
        console.log(value);



      //  $(".vz-global-header .navbar-toggle").click()
      },
      onChangeFunction:function(value){
        this.setState({
             displayPage: displayPage
           });
      },
     isActive:function(highlight){
               return((highlight===this.state.displayPage) ?'active':'default');
       },

        render: function() {
            return (
              <div>
                <Header className="container-fluid" setLink={this.setLink} isActive={this.isActive} />

              { this.state.displayPage == 'Container'
                  ? <Container  />
                : ( this.state.displayPage == 'Inventory'
                    ? <Inventory/>
                  :  ( this.state.displayPage == 'Policy'
                      ? <Policy/>
                    : ( this.state.displayPage == 'Bgp'
                      ? <Bgp/>
                    : ( this.state.displayPage == 'Vlan'
                        ? <Vlan/>
                    : ( this.state.displayPage == 'Configuration'
                      ? <Configuration/>
                    : ( this.state.displayPage == 'Logs'
                        ? <Logs/>
                    : ""
                  ))))))
              }</div>
            );
        }
    });

    return RoutingFile;
});
