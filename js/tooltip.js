define(
    ['linkMode', 'configurationEvents', 'jquery', 'properties', 'socket', 'toastr','bootstrap'],
    function(linkMode, configurationEvents, $, properties, io,toastr) {
        (function(nx) {
            // node tooltip class
            // see nx.graphic.Topology.Node reference to learn what node's
            // properties you're able to use
            var flag = true;
            nx
                .define(
                    'TooltipNode',
                    nx.ui.Component, {
                        properties: {
                            'node': {

                                get: function() {

                                    return this._node;
                                },
                                set: function(value) {
                                    debugger;
                                    var model = value.model();
                                    this._node = value.node();
                                    var view = this.view('portData')
                                    var fbName = value.node().get("label");
                                    var iconType = value.node().get("iconType")

                                    if (iconType == "optical-switch" || iconType == "patch-panel") {
                                        this.view("configData").set("class", "linkhide")
                                        this.view("templateData").set("class", "linkhide")
                                        if (!linkMode.getFlag()){
                                            this.view("classNamePort").set("class", "linkhide")
                                        }else{
                                          this.view("classNamePort").set("class", "popup-section")
                                        }
                                        var finalResults = []
                                        var resources = view._resources;
                                        var socket = properties.socket();
                                        var fetchComplete = function(data, view) {
                                              var result = JSON.parse(data)
                                          if(iconType == "optical-switch" ){
                                            result=JSON.parse(result)
                                          }

                                            result.forEach(function(v, i) {
                                              var res=null;
                                              if(iconType == "optical-switch" ){
                                               res = v
                                              }else{
                                                 res = JSON.parse(v)
                                              }


                                                    if (res.status == "false") {
                                                        res.isAllocated = false
                                                    } else {
                                                        res.isAllocated = true
                                                    }
                                                    finalResults.push(res);
                                                })
                                                // //debugger;

                                            //  socket.removeListener('port-status-fetch', fetchComplete);
                                        }
                                        var patchfetch = {
                                            "name": fbName,
                                            "type": iconType
                                        };

                                        socket.emit('port-status-fetch', JSON.stringify(patchfetch));
                                        //debugger;
                                        socket.on('port-status', function(data) {
                                            //debugger;
                                            fetchComplete(data, view)
                                        }.bind(view))
                                        setTimeout(function() {
                                            view.set('items', finalResults)

                                        }, 500)

                                    } else if (iconType == "host") {
                                        this.view("configData").set("class", "linkhide")
                                        this.view("templateData").set("class", "linkhide")

                                        if (!linkMode.getFlag()){
                                            this.view("classNamePort").set("class", "linkhide")
                                        }else{
                                          this.view("classNamePort").set("class", "popup-section")
                                        }
                                        var postURL = properties.rmsIp +
                                            fbName +
                                            "/port/find";

                                        //  //debugger;


                                        $.post(postURL, function(result) {
                                            var collection = result;

                                            result.forEach(function(v, i) {
                                                if (v.isFree == "true") {
                                                    v.isAllocated = false
                                                } else {
                                                    v.isAllocated = true
                                                }
                                            })
                                            view.set('items', result)


                                        })
                                    } else {

                                        if (!linkMode.getFlag()){
                                            this.view("classNamePort").set("class", "linkhide")
                                              this.view("configData").set("class", "popup-section")
                                              this.view("templateData").set("class", "popup-section")

                                        }else{
                                          this.view("classNamePort").set("class", "popup-section")
                                            this.view("configData").set("class", "linkhide")
                                            this.view("templateData").set("class", "linkhide")
                                        }
                                        var postURL = properties.rmsIp +
                                            fbName +
                                            "/port/find";

                                        //  //debugger;


                                        $.post(postURL, function(result) {
                                            var collection = result;

                                            result.forEach(function(v, i) {
                                                if (v.isFree == "true") {
                                                    v.isAllocated = false
                                                } else {
                                                    v.isAllocated = true
                                                }
                                            })
                                            view.set('items', result)


                                        })
                                    }
                                }
                            }, // NeXt automatically
                            // provides you the
                            // access to the
                            // selected
                            // nx.graphic.Topology.Node
                            // instance
                            'topology': {}, // NeXt also
                            // provides you the
                            // access to the
                            // topology object
                            'newNodeName': '',
                            'classNameConfig': function() {
                                if (linkMode.getFlag())
                                    return "popup-section linkhide ";
                                else {
                                    return "popup-section "
                                }
                            },
                            'classNamePort': function() {
                                if (linkMode.getFlag())
                                    return "popup-section  ";
                                else {
                                    return "popup-section linkhide "
                                }
                            }

                        },

                        // 'view' defines the appearance of the
                        // tooltip
                        view: {
                            content: {
                                content: [



                                  {
                                        tag: 'div',
                                        name: "configData",

                                        events: {
                                            'click': '{#onClickEvent}'
                                        },
                                        content: [{
                                                tag: "i",
                                                props: {
                                                    'class': "fa fa-cog",
                                                    'aria-hidden': "true"
                                                }
                                            }, {
                                                tag: "div",
                                                content: "Config",
                                                props: {
                                                    'class': "label-data"
                                                }
                                            }

                                        ]
                                    },


                                    {
                                            tag: 'div',
                                            name: "templateData",

                                            events: {
                                                'click': '{#onClickEvent1}'
                                            },
                                            content: [{
                                                    tag: "i",
                                                    props: {
                                                        'class': "fa fa-file-text",
                                                        'aria-hidden': "true"
                                                    }
                                                }, {
                                                    tag: "div",
                                                    content: "Templates",
                                                    props: {
                                                        'class': "label-data"
                                                    }
                                                }

                                            ]
                                        },

                                         {
                                        tag: 'div',
                                        name: 'classNamePort',


                                        content: [{
                                                tag: 'h6',
                                                content: "Select Port"
                                            }, {
                                                tag: 'div',
                                                name: "portData",
                                                props: {
                                                    'class': "tooltip-container",
                                                    template: {
                                                        tag: "div",
                                                        content: [{
                                                            tag: "input",
                                                            props: {
                                                                'type': "radio",
                                                                'name': "portselcted",
                                                                'disabled': "{isAllocated}"
                                                            },
                                                            events: {
                                                                'click': '{#onClickEvent2}'
                                                            },
                                                        }, {
                                                            tag: "div",
                                                            content: "{name}",
                                                            props: {
                                                                'class': "label-data"
                                                            }
                                                        }]
                                                    }
                                                }

                                            }

                                        ]
                                    }

                                ],
                                // applies to the whole tooltip box
                                props: {
                                    // css class; see
                                    // ./css/custom.css
                                    'class': 'custom-tooltip'
                                }
                            }
                        },
                        methods: {

                            "onClickEvent": function() {
                                var self = this.node();
                                var fbName = $('g.node-selected')
                                    .attr('data-id');
                                $("#pageModal")
                                    .load(
                                        "templates/tab.html",
                                        function() {
                                            $('#pageModal ')
                                                .modal(
                                                    'show')

                                            configurationEvents.init(self);
                                            configurationEvents.savingDetails();
                                            configurationEvents.bridgeTable();
                                            configurationEvents.portTable();
                                        });

                            },
                            "onClickEvent1": function() {
                              {var self = this.node();
                                /*var fbName = $('g.node-selected')
                                    .attr('data-id');*/}
                                $("#pageModal")
                                    .load(
                                        "templates/templates.html",
                                        function() {
                                            $('#pageModal ')
                                                .modal(
                                                    'show')

                                            configurationEvents.init(self);
                                            //configurationEvents.savingDetails();
                                            //configurationEvents.bridgeTable();
                                            configurationEvents.templateTable();
                                        });

                            },
                            "onClickEvent2": function() {
                                if (!configurationEvents.isSourceSelected()) {
                                    //debugger;
                                    configurationEvents.setSourceNodeDetails( {
                                        node: this
                                            .node().id(),
                                        iconType: this
                                            .node().get('iconType'),
                                        "data": $("input[name='portselcted']:checked").next().text()
                                    }
                                  );
                                } else {
                                    if(!configurationEvents.isValidLink(this.node().get('iconType'),configurationEvents.getSourceNodeDetails().iconType)){
                                        toastr.error("Components cannot be connected")
                                        return;
                                    }
                                    var self = this;
                                    var templatedToLoad="templates/tab1.html";
                                    var isFbTarget=this.node().get('iconType')=="fb-icon"
                                    var isFbSrc=configurationEvents.getSourceNodeDetails().iconType=="fb-icon"
                                    var isOpticalSwitchSrc=this.node().get('iconType')=="optical-switch"
                                    var isOpticalSwitchtarget=configurationEvents.getSourceNodeDetails().iconType=="optical-switch"
                                    var isFBTrgOrSrc=((isFbTarget || isFbSrc) & !(isFbTarget & isFbSrc  ));
                                    var isOptTrgOrSrc=  ((isOpticalSwitchSrc || isOpticalSwitchtarget) & !(isOpticalSwitchSrc & isOpticalSwitchtarget  ));

                                    if( isFBTrgOrSrc && isOptTrgOrSrc ){
                                          configurationEvents.initFStoOB(self);
                                      return;
                                    }
                                    if(isFBTrgOrSrc){
                                      templatedToLoad="templates/configuringFbLink.html";
                                    }
                                    $("#pageModal")
                                        .load(
                                        templatedToLoad,
                                            function() {
                                                $('#pageModal ')
                                                    .modal(
                                                        'show')
                                                $('#pageModal #saveLinkData').click(function() {
                                                    configurationEvents.initLinkEvents(self);

                                                });

                                            });


                                    //	linkMode.setFlag(false);

                                }

                            },
                            "modalEvent": function() {

                                $('#myModal').modal('show');

                            },
                            //
                            'onRemoveNode': function() {
                                // get a selected node's id and pass it to removeNode() of topology instance
                                this.topology().removeNode(
                                    this.node().id());
                            },
                            // what happens when you hit 'Save' button
                            'onSaveName': function() {
                                // get current node's instance and access its label value. when pass something inside, NeXt consider
                                // you set new value
                                this.node().label(this.newNodeName());
                            }
                        }
                    });
            // link tooltip class
            // see nx.graphic.Topology.Link reference to learn what link's properties you're able to use
            nx.define('TooltipLink', nx.ui.Component, {
                properties: {
                    link: {},
                    topology: {}
                },
                view: {
                    content: {
                        content: [{
                            tag: 'h1',
                            content: [{
                                tag: 'span',
                                content: 'Link #'
                            }, {
                                tag: 'span',
                                content: '{#link.id}'
                            }]
                        }, {
                            tag: 'div',
                            content: [{
                                tag: 'span',
                                content: 'From: ',
                                props: {
                                    'class': 'bold-text'
                                }
                            }, {
                                tag: 'span',
                                // we access link's model to show a source node's name
                                content: '{#link.model.source.name}'
                            }]
                        }, {
                            tag: 'div',
                            content: [{
                                tag: 'span',
                                content: 'To: ',
                                props: {
                                    'class': 'bold-text'
                                }
                            }, {
                                tag: 'span',
                                // we access link's model to show a target node's name
                                content: '{#link.model.target.name}'
                            }]
                        }],
                        props: {
                            'class': 'custom-tooltip'
                        }



                    }
                }
            });
        })(nx);
    });
