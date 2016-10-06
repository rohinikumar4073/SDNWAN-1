define(['react','jquery','jsx!components/LeftMenu','jsx!components/RightMenu','jsx!components/BootstrapLinkCommon','TopologyModel'], function(React,$,LeftMenu,RightMenu,BootstrapLinkCommon) {
  




  
  var Body = React.createClass({
    getInitialState:function(){
      return{     
       bootstrapTitle:"",
       iconType:""
      }
      },
    topologyModel:new com.cisco.TopologyModel(),
createLink:function(s,d){

this.topologyModel.createLink({
                    source: s,
                    target: d
                });

},
    topologyModelController:function(title,iconDetails){
      if(title=="linkSet"){
          this.topologyModel.setLinkMod();
          return;
      }else if(title=="linkReset"){
        this.topologyModel.resetLinkMod();
          return;
      }
    	this.refs.modal.open();
            console.log("iconDetails"+iconDetails);

      this.setState({bootstrapTitle:"Add "+title,iconType:iconDetails})
    	},
    toggleElement:function(){
      console.log("Leftmenu toggle")
      if($(".left-menu").hasClass("toggle-show")){
        $(".left-menu").removeClass("toggle-show").addClass("toggle-hide").hide();
        $(".right-menu").addClass("col-xs-12").removeClass("col-xs-9");
        $(".toggle-left-menu button").removeClass("pull-right").removeClass("left-position");
        $(".toggle-left-menu i").removeClass("fa-caret-left").addClass("fa-caret-right");

        }else{
          $(".left-menu").removeClass("toggle-hide").addClass("toggle-show").show();
          $(".right-menu").removeClass("col-xs-12").addClass("col-xs-9");
          $(".toggle-left-menu button").addClass("pull-right").addClass("left-position");
          $(".toggle-left-menu i").removeClass("fa-caret-right").addClass("fa-caret-left");
        }
        },
        render: function() {
          return (
            <div className={(this.props.className || '') } >
            <div className="row">
            <LeftMenu className="col-xs-6 col-md-4 col-lg-3 left-menu toggle-show" topologyModel={this.topologyModelController}>         
            </LeftMenu>
            <div className="toggle-left-menu col-xs-6 col-md-4 col-lg-3">
              <button className="btn btn-default  pull-right left-position" type="button"  onClick={this.toggleElement} aria-haspopup="true" aria-expanded="false">
              <i className="fa fa-caret-left" aria-hidden="true"></i>
              </button> 
            </div>
            <RightMenu className="col-xs-6 col-md-8 col-lg-9 right-menu " topologyModel={this.topologyModel} createLink={this.createLink}>          
            </RightMenu>
            <BootstrapLinkCommon ref="modal" title={this.state.bootstrapTitle} iconType={this.state.iconType} topologyModel={this.topologyModel} />
           
            </div>
            </div>
            );
          },
          componentDidMount :function(){
            //console.log("Inside component mount");
            var height=$(window).height();
            $(".left-menu ,.right-menu ").height(height-89);

          }
          });
 

 
   
     
    

  
 

 


return Body;
});
