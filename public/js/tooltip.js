define(
    ['linkMode', 'configurationEvents', 'jquery', 'properties', 'socket', 'toastr', 'bootstrap'],
    function(linkMode, configurationEvents, $, properties, io, toastr) {
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
                                    var model = value.model();
                                    this._node = value.node();
                                    var view = this.view('portData')
                                    var fbName = value.node().get("label");
                                    var iconType = value.node().get("iconType");
                                    var isLinkMode = linkMode.getFlag();
                                    switch (iconType) {
                                        case "optical-switch":
                                        case "patch-panel":
                                        case "host":
                                            this.view("configData").set("class", "linkhide");
                                            this.view("templateData").set("class", "linkhide");
                                            // Setting config and template data to hidden
                                            var finalResults = []
                                            var fetchComplete=function(data,view){
                                              var result = JSON.parse(data)
                                              if (iconType == "optical-switch" ||iconType == "host") {
                                                  result = JSON.parse(result)
                                              }
                                              result.forEach(function(v, i) {
                                                      var res = null;
                                                      if (iconType == "optical-switch" ||iconType == "host") {
                                                          res = v;
                                                      }else {
                                                          res = JSON.parse(v)
                                                      }
                                                      if (res.status == "false") {
                                                          res.isAllocated = false
                                                      } else {
                                                          res.isAllocated = true
                                                      }
                                                      finalResults.push(res);
                                                  })


                                            }
                                            var resources = view._resources;
                                            var socket = properties.socket();
                                            if (isLinkMode) {
                                                this.view("deleteComponent").set("class", "linkhide")
                                                this.view("editData").set("class", "linkhide");
                                                this.view("classNamePort").set("class", "popup-section")
                                                var patchfetch = {
                                                    "name": fbName,
                                                    "type": iconType
                                                };
                                                $.ajax({
                                                    url: properties.getPortStatus,
                                                    type: 'post',
                                                    data: JSON.stringify(patchfetch),
                                                    contentType: "application/json; charset=utf-8",
                                                    success: fetchComplete,
                                                    error: function(data) {
                                                      //  toastr.error("Not able to add Optical Switch")
                                                    }

                                                });
                                                setTimeout(function() {
                                                    view.set('items', finalResults)

                                                }, 500)
                                              //  socket.emit('port-status-fetch', JSON.stringify(patchfetch));
                                                //debugger;
                                                socket.on('port-status', function(data) {
                                                  fetchComplete(data)
                                                }.bind(fetchComplete))


                                            } else {
                                                this.view("editData").set("class", "popup-section");
                                                this.view("classNamePort").set("class", "linkhide")
                                                this.view("deleteComponent").set("class", "popup-section");
                                            }
                                            break;

                                        case "fb-icon":
                                            if (isLinkMode) {

                                                var postURL = properties.rmsIp + "/" +
                                                    fbName +
                                                    "/port/find";

                                                this.view("classNamePort").set("class", "popup-section")
                                                this.view("configData").set("class", "linkhide")
                                                this.view("templateData").set("class", "linkhide")
                                                this.view("editData").set("class", "linkhide")
                                                this.view("deleteComponent").set("class", "linkhide")
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
                                                this.view("classNamePort").set("class", "linkhide")
                                                this.view("editData").set("class", "popup-section")
                                                this.view("configData").set("class", "popup-section")
                                                this.view("templateData").set("class", "popup-section")
                                                this.view("deleteComponent").set("class", "popup-section")

                                            }
                                            break;
                                            //  //debugger

                                    } //  //debugger


                                }
                            },
                            // NeXt automatically
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
                                content: [{
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
                                    }, {
                                        tag: 'div',
                                        name: "editData",

                                        events: {
                                            'click': '{#editData}'
                                        },
                                        content: [{
                                                tag: "i",
                                                props: {
                                                    'class': "fa fa-pencil",
                                                    'aria-hidden': "true"
                                                }
                                            }, {
                                                tag: "div",
                                                content: "Edit",
                                                props: {
                                                    'class': "label-data"
                                                }
                                            }

                                        ]
                                    }, {
                                        tag: 'div',
                                        name: "deleteComponent",

                                        events: {
                                            'click': '{#deleteNode}'
                                        },
                                        content: [{
                                                tag: "i",
                                                props: {
                                                    'class': "fa fa-trash",
                                                    'aria-hidden': "true"
                                                }
                                            }, {
                                                tag: "div",
                                                content: "Delete",
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
                                $("#pageModal")
                                    .load(
                                        "templates/tab.html",
                                        function() {
                                            $('#pageModal ')
                                                .modal(
                                                    'show')

                                            configurationEvents.init(self);
                                            configurationEvents.savingDetails(self);
                                            configurationEvents.bridgeTable(self);
                                            configurationEvents.portTable(self);
                                            //configurationEvents.getDetails(self);
                                        });

                            },
                            "onClickEvent1": function() {
                                    var self = this.node();
                                $("#pageModal")
                                    .load(
                                        "templates/templates.html",
                                        function() {
                                            $('#pageModal ')
                                                .modal(
                                                    'show')
                                                    debugger;
                                            //configurationEvents.init(self);
                                            configurationEvents.templateTable(self);
                                        });

                            },
                            "deleteNode": function() {
                                var sureDel=confirm("Please confirm to delete node")
                                if(!sureDel){
                                  return;
                                }
                              var self = this.node();
                           var name = self.get("label");
                           var type = self.get("iconType");
                           var data = {
                             "name": name,
                             "type": type
                           }

                          $.ajax({
                            url: properties.deleteNode,
                            type: 'post',
                            data: JSON.stringify(data),
                            contentType: "application/json; charset=utf-8",
                            success: function(returnData){
                              self.topology().removeNode(
                                  self.node().id());
                                  $.ajax({
                                      url: properties.saveNativeTopologyData,
                                      type: 'post',
                                      data: JSON.stringify( self.topology().getData()),
                                      contentType: "application/json; charset=utf-8",
                                      success: function(data) {
                                          $.ajax({
                                            url: properties.rmsIp + name + "/delete",
                                            type: 'delete',
                                            data: "",
                                            contentType: "application/json; charset=utf-8",
                                            success: function(data){

                                            },
                                            error:function(data){

                                            }
                                          })
                                      }
                                  })
                              toastr.success("Deleted " +data.name+ " successfully");
                            },
                            error: function(returnData){
                              toastr.error("Could not delete  " +data.name);
                            }
                          })

                           $(".n-topology-tooltip").hide()
                            },

                            "onClickEvent2": function() {
                                if (!configurationEvents.isSourceSelected()) {
                                    //debugger;
                                    configurationEvents.setSourceNodeDetails({
                                        node: this
                                            .node().get("label"),
                                        id: this
                                            .node().id(),
                                        iconType: this
                                            .node().get('iconType'),
                                        "data": $("input[name='portselcted']:checked").next().text()
                                    });
                                } else {
                                    if (!configurationEvents.isValidLink(this.node().get('iconType'), configurationEvents.getSourceNodeDetails().iconType)) {
                                        toastr.error("Components cannot be connected")
                                        return;
                                    }
                                    var self = this;
                                    var templatedToLoad = "templates/tab1.html";
                                    var isFbTarget = this.node().get('iconType') == "fb-icon"
                                    var isFbSrc = configurationEvents.getSourceNodeDetails().iconType == "fb-icon"
                                    var isOpticalSwitchSrc = this.node().get('iconType') == "optical-switch"
                                    var isOpticalSwitchtarget = configurationEvents.getSourceNodeDetails().iconType == "optical-switch"
                                    var isFBTrgOrSrc = ((isFbTarget || isFbSrc) & !(isFbTarget & isFbSrc));
                                    var isOptTrgOrSrc = ((isOpticalSwitchSrc || isOpticalSwitchtarget) & !(isOpticalSwitchSrc & isOpticalSwitchtarget));

                                    if (isFBTrgOrSrc && isOptTrgOrSrc) {
                                        configurationEvents.initFStoOB(self);
                                        return;
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
                            "editData": function() {
                                var self = this.node();

                                var uploadedData = {
                                    bootstrapTitle: "",
                                    submitMode: "Update",
                                    iconType:self.iconType(),
                                    formData: {
                                        name: self.get("label"),
                                        id: self.get("id")
                                    }
                                };
                                switch (self.iconType()) {
                                    case "fb-icon":
                                        uploadedData.bootstrapTitle = "Editing Foward Box"
                                        break;
                                    case "optical-switch":
                                        uploadedData.bootstrapTitle = "Editing Optical Switch"
                                        break;
                                    case "patch-panel":
                                        uploadedData.bootstrapTitle = "Editing Patch Panel";
                                        break;
                                    case "host":
                                          uploadedData.bootstrapTitle = "Editing Host";
                                          uploadedData.formData["node-id"]=self.get("label");

                                }
                                var bodyElement = configurationEvents.getBodyReference();
                                bodyElement.setState(uploadedData)

                                bodyElement.refs.modal.open();
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
