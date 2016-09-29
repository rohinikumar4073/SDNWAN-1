define(['react','jquery','jsx!components/ComponentElement','jsx!components/TemplateElement','jsx!components/RightMenu','jsx!components/CreateNewFBForm','bootstrap','jsx!components/BootstrapLinkCommon'], function(React,$,ComponentElement,TemplateElement,RightMenu,FBForm,bootstrap,BootstrapLinkCommon) {
  

 var Component = React.createClass({

    render: function() {


      return (<div className="layout-component">
        <h5>{this.props.heading} </h5>
        <hr></hr>
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
      if(title=="link"){
          this.topologyModel.setLinkMod();
          return;
      }
      console.log("title"+title);
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

            <LeftMenu className="col-xs-3 left-menu toggle-show" topologyModel={this.topologyModelController}>         

            </LeftMenu>
            <div className="toggle-left-menu col-xs-3">
            <button className="btn btn-default  pull-right left-position" type="button"  onClick={this.toggleElement} aria-haspopup="true" aria-expanded="false">
            <i className="fa fa-caret-left" aria-hidden="true"></i>
            </button> 
            </div>
            <RightMenu className="col-xs-9 right-menu " topologyModel={this.topologyModel} createLink={this.createLink}>          
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
 
  var Components = React.createClass({
    getInitialState: function() {
      return {
        forwardingBox: [],
        hosts: [],
        elements:[]
      };
      },

      componentDidMount: function() {
        var self = this;
        $.get(this.props.source, function(result) {
          var collection = result;

          if (this.isMounted()) {
            this.setState({
              elements: result
              });
          }
          }.bind(this));
        },

        componentWillUnmount: function() {
          this.serverRequest.abort();
          },

          render: function() {


            return (<div>
            {    
              this.state.elements.map(function(element,i){
                return <Component heading={element.heading} collection={element.data} key={i} className="layout-flex" topologyModel={this.props.topologyModel}/>
                }.bind(this))
            } 
            </div>
            );

          }



          });
 

  var Templates = React.createClass({
    getInitialState: function() {
      return {
        forwardingBox: [],
        hosts: [],
        elements:[]
      };
      },

      componentDidMount: function() {
        var self = this;
          var arrayData=[
                {
                  "heading": "FB Instance Creation",
                  "data": [
                    
                  ]
                },{
                  "heading": "FB Fan Template",
                  "data": [
                    
                  ]
                },{
                  "heading": "FB OS Template",
                  "data": [
                    
                  ]
                },{
                  "heading": "FB Powersupply Template",
                  "data": [
                    
                  ]
                },{
                  "heading": "FB Template",
                  "data": [
                    
                  ]
                },{
                  "heading": "FB Transiever Template",
                  "data": [
                    
                  ]
                }
              ]
               this.setState({
              elements:arrayData 
              });
                 
        },

        componentWillUnmount: function() {
          this.serverRequest.abort();
          },

          render: function() {


            return (<div>
            {    
              this.state.elements.map(function(element,i){
                return <Template heading={element.heading} collection={element.data} key={i} className="layout-flex"/>
                })
            }
            </div>
            );

          }



          });
  var Template = React.createClass({

    toggleData:function(){
      if(this.state.showData)
      this.setState({ showData: false });
      else

      this.setState({ showData: true });


      },
      getInitialState: function() {
        return { showData: true,collection:this.props.collection };

        },
        addRow:function(data){
          console.log(data);
          data.className="fa-exchange"
          this.state.collection[0]=data;
      this.setState({ collection: this.state.collection });
         },
        handleClick:function(i){
      var indexTobeAdded=i+4-(i%4);
      //console.log(indexTobeAdded);
      //console.log(this.state.collection);

        if(!this.state.collection.isOpened){
        this.state.collection.isOpened=true;
        var obj=JSON.parse(JSON.stringify(this.state.collection[i]))
        obj.isDetails=true;
        this.state.collection.splice(indexTobeAdded,0,obj)
        }else{
          this.state.collection.slice(indexTobeAdded , indexTobeAdded+1)
        this.state.collection.isOpened=false;
        }


this.setState({collection:this.state.collection})
          },
          render: function() {


            return (<div className="layout-template">
              <h5 onClick={this.toggleData}>{this.props.heading} <span className="accordion"><i className={this.state.showData ? "fa fa-caret-down" : "fa fa-caret-right" } aria-hidden="true"></i>
              </span></h5>
              <hr/>
              <div   className={this.state.showData ? "create-new" : "create-new hidden" }>
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
              <BootstrapLink data= {"Create "+this.props.heading} addRow={this.addRow}/>
              </div>

              <div className={this.state.showData ? this.props.className : this.props.className +" hidden" }>
              {    
                this.state.collection.map(function(data,i){
                                    var boundClick = this.handleClick.bind(this, i);
                                    console.log("Is details"+data.isDetails);
                   if(!data.isDetails)
                  return <TemplateElement onClick={boundClick} collection={data} key={i} />
                  else
                  return <Details collection={data} key={i} />

                  },this)
              }
              </div>
              </div>
              );
          }



          });
    var Details = React.createClass({
    render: function() {
      return (
        <div className="details">

        <DetailsElement data={this.props.collection.fb_groupid} labelData="FB Group Id" />
        <DetailsElement data={this.props.collection.forwarding_box_template} labelData="FB Box tempalte" />
        <DetailsElement data={this.props.collection.network_domain} labelData="Network Domain"  />
        <DetailsElement data={this.props.collection.site_id} labelData="Site ID" />
        <DetailsElement data={this.props.collection.location_desc} labelData="Location Desc"  />
        <DetailsElement data={this.props.collection.location_desc} labelData="Location Desc"  />
              <BootstrapLink data="View Details"/>

        </div>);
    }
    });
      var DetailsElement = React.createClass({
    render: function() {
      return (
        <div className="details-element">
          <span className="labelData">{this.props.labelData}</span>
          <span>:</span>
          <span className="data">{this.props.data}</span>
        </div>);
    }
    });
    

  
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

  var BootstrapModal = React.createClass({
    // The following two methods are the only places we need to
    // integrate Bootstrap or jQuery with the components lifecycle methods.
    componentDidMount: function() {
      // When the component is added, turn it into a modal
      $(this.refs.root).modal({backdrop: 'static', keyboard: false, show: false});

      // Bootstrap's modal class exposes a few events for hooking into modal
      // functionality. Lets hook into one of them:
      $(this.refs.root).on('hidden.bs.modal', this.handleHidden);
      },
      componentWillUnmount: function() {
        $(this.refs.root).off('hidden.bs.modal', this.handleHidden);
        },
        close: function() {
          $(this.refs.root).modal('hide');
          },
          open: function() {
            $(this.refs.root).modal('show');
            },
            render: function() {
              var confirmButton = null;
              var cancelButton = null;

              if (this.props.confirm) {
                confirmButton = (
                  <BootstrapButton
                  onClick={this.handleConfirm}
                  className="btn  btn-primary" data="Create New">
                  {this.props.confirm}
                  </BootstrapButton>
                  );
              }
              if (this.props.cancel) {
                cancelButton = (
                  <BootstrapButton onClick={this.handleCancel} className="btn-default" data="Creat New">
                  {this.props.cancel}
                  </BootstrapButton>
                  );
              }

              return (
                <div className="modal fade" ref="root">
                <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                <button
                type="button"
                className="close"
                onClick={this.handleCancel}>
                &times;
                </button>
                <h3>{this.props.title}</h3>
                </div>
                <div className="modal-body" >
                  
                    <FBForm data={this.props.children} onChangeFunction={this.setData}/>


                </div>
                <div className="modal-footer">
        <div class="row">
<div class="col-md-12 section-divider-bottom">
    {confirmButton}
</div>
</div>
           
                </div>
                </div>
                </div>
                </div>
                );
              },
              handleCancel: function() {
                if (this.props.onCancel) {
                  this.props.onCancel();
                }
                },
                setData:function(e){
                 var parnetId=e.target.getAttribute("data-parentdata")
                  if(parnetId )
                  {
                    if(this.state.dataToBeSend[parnetId]){
                      this.state.dataToBeSend[parnetId][e.target.id]=e.target.value;
                      }else{
                       this.state.dataToBeSend[parnetId][e.target.id]=e.target.value;
                      }
                  }else{
                    this.state.dataToBeSend[e.target.id]=e.target.value;
                  }
                  
this.setState({
              dataToBeSend: this.state.dataToBeSend
              });
               
                  
                  },
                handleConfirm: function() {
                  var self = this;
                  $.ajax({
            url: "http://114.8.10.211:50512/FbTemplate/getFbCreateInstances",
            type: 'post',
              data: JSON.stringify(this.state.dataToBeSend),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
     if (self.props.onConfirm) {
                    self.props.onConfirm(self.state.dataToBeSend);
                  }
            }

                 
        });

                  },
                  handleHidden: function() {
                    if (this.props.onHidden) {
                      this.props.onHidden();
                    }
                  }, getInitialState: function() {
                        return {
                          dataToBeSend:{
                          "forwarding_box_template" : "",
                          "fb_device_name" : "",
                          "network_domain" : "",
                          "site_id" : "",
                          "location_desc" : "",
                          "fb_groupid" : "",
                          "management_configuration" : {
                            "management_interface" : "",
                            "ip_address" : "",
                            "default_gatewayIp" : "",
                            "dns_serverIp" : "",
                            "dns_name" : "",
                            "agent_cert_name" : ""
                          },
                          "openFlowInfo" : {
                            "masterControllerIp" : "",
                            "slaveControllerIp" : "",
                            "protocolVersion" : "",
                            "connectionProtocol" : "",
                            "allowPassiveCon" : "",
                            "failMode" : "",
                            "dataPathId" : ""
                          },
                          "lldpEnablment" : "",
                          "dataPlaceConfiguration" : {
                            "dacUtilized" : "",
                            "dacCableUtilized" : "",
                            "transceiverType" : "",
                            "speed" : "",
                            "enableFrameSupport" : "",
                            "adminState" : "",
                            "description" : "",
                            "adminCost" : ""
                          },
                          "operatingSystemConfiguration" : {
                            "localArpResponse" : "",
                            "localArpResponseCoverage" : "",
                            "localIpv6ArpResponse" : "",
                            "localIpv6ArpResponseCoverage" : "",
                            "fb_sfp_interval" : "",
                            "interfceFlowCounterInt" : "",
                            "alarmHistory" : "",
                            "alarmHighTemp" : "",
                            "alarmLowTemp" : ""
                          }
                        }
                        }
      }
                  });

  var BootstrapLink = React.createClass({
    handleCancel: function() {
      if (confirm('Are you sure you want to cancel?')) {
        this.refs.modal.close();
      }
      },
      addRow:function(data){
       this.props.addRow(data);

      },
      render: function() {
        var modal = null;
        modal = (
          <BootstrapModal
          ref="modal"
          confirm="OK"
          cancel="Cancel"
          onCancel={this.handleCancel}
          onConfirm={this.closeModal}
          onHidden={this.handleModalDidClose}
          title="Create New Forwarding Box Template">
          </BootstrapModal>
          );
        return (
          <div className="link">
          {modal}
          <BootstrapButton  onClick={this.openModal} data={this.props.data}>
          Open modal
          </BootstrapButton>
          </div>
          );
        },
        openModal: function() {
          $(".link").find(".modal").appendTo("body");
          this.refs.modal.open();
          },
          closeModal: function(data) {
            if(data)
              this.addRow(data);
            this.refs.modal.close();
            },
            handleModalDidClose: function() {
            }
            });

  //ReactDOM.render(<Example />, document.getElementById('jqueryexample'));

return Body;
});
