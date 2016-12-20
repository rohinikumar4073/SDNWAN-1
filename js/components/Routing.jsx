define([
    'react', 'jsx!components/Container',  'jsx!components/Policy', 'jsx!components/Header', 'jsx!components/Bgp'
], function(React, Container,Policy,Header,Bgp) {

    var RoutingFile = React.createClass({
      getInitialState:function(){
        return {
          displayPage:"Container"
        }
      },
      setLink:function(value){
        this.setState({displayPage:value})
        $(".navbar-header .navbar-toggle").click()
        console.log(value);
        this.onChangeFunction(displayPage);


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
                : ( this.state.displayPage == 'Policy'
                    ? <Policy/>
                  : ( this.state.displayPage == 'Bgp'
                      ? <Bgp/>
                    : ""
                  ))
              }</div>
            );
        }
    });

    return RoutingFile;
});
