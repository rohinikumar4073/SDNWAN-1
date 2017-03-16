define(
    ['linkMode', 'configurationEvents', 'jquery', 'properties', 'socket', 'toastr', 'services/linkService', 'axios', 'services/dynamicLinkService'],
    function(linkMode, configurationEvents, $, properties, io, toastr, linkService, axios, dynamicLinkService) {
        (function(nx) {
            // node tooltip class
            // see nx.graphic.Topology.Node reference to learn what node's
            // properties you're able to use
            var flag = true;
            var isDynamicSourceSelected = false;
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
                                    var isDynamicLink = linkMode.getDynamicFlag();
                                    debugger;
                                    switch (iconType) {
                                        case "optical-switch":
                                        case "patch-panel":
                                        case "host":
                                        case "bgp":
                                            this.view("configData").set("class", "linkhide");
                                            this.view("templateData").set("class", "linkhide");
                                            this.view("dynamicLinkData").set("class", "linkhide");
                                            //  this.view("cloneData").set("class", "linkhide");
                                            // Setting config and template data to hidden
                                            var finalResults = []

                                            var fetchComplete = function(data, view) {
                                                var result = JSON.parse(data)
                                                if (iconType == "optical-switch" || iconType == "host" || iconType == "bgp") {
                                                    result = JSON.parse(result)
                                                }
                                                result.forEach(function(v, i) {
                                                    var res = null;
                                                    if (iconType == "optical-switch" || iconType == "host" || iconType == "bgp") {
                                                        res = v;
                                                    } else {
                                                        res = JSON.parse(v)
                                                    }
                                                    if (res.status == "false") {
                                                        res.isAllocated = false
                                                        res.clasName = "fa fa-square portGreen"
                                                    } else {
                                                        res.isAllocated = true
                                                        res.clasName = "fa fa-square portRed"
                                                    }
                                                    finalResults.push(res);
                                                })



                                            }
                                            var resources = view._resources;
                                            var socket = properties.socket();
                                            if (isLinkMode) {
                                                debugger;
                                                this.view("deleteComponent").set("class", "linkhide")
                                                this.view("editData").set("class", "linkhide");
                                                this.view("dynamicLinkData").set("class", "linkhide")
                                                this.view("cloneData").set("class", "linkhide");
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
                                                this.view("dynamicLinkData").set("class", "linkhide")
                                                this.view("deleteComponent").set("class", "popup-section");
                                                this.view("cloneData").set("class", "popup-section");

                                            }
                                            break;

                                        case "fb-icon":
                                            if (isLinkMode) {

                                                var postURL = properties.rmsIp +
                                                    fbName +
                                                    "/port/find";

                                                this.view("classNamePort").set("class", "popup-section")
                                                this.view("dynamicLinkData").set("class", "linkhide")
                                                this.view("configData").set("class", "linkhide")
                                                this.view("templateData").set("class", "linkhide")
                                                this.view("editData").set("class", "linkhide")
                                                this.view("deleteComponent").set("class", "linkhide")
                                                this.view("cloneData").set("class", "linkhide")
                                                $.post(postURL, function(result) {
                                                    var collection = result;

                                                    result.forEach(function(v, i) {
                                                        if (v.isFree == "true") {
                                                            v.isAllocated = false
                                                            v.clasName = "fa fa-square portGreen"
                                                        } else {
                                                            v.isAllocated = true
                                                            v.clasName = "fa fa-square portRed"
                                                        }
                                                    })
                                                    view.set('items', result)


                                                })
                                            } else {
                                                this.view("classNamePort").set("class", "linkhide")
                                                this.view("dynamicLinkData").set("class", "linkhide")
                                                this.view("editData").set("class", "popup-section")
                                                this.view("configData").set("class", "popup-section")
                                                this.view("templateData").set("class", "popup-section")
                                                this.view("deleteComponent").set("class", "popup-section")
                                                this.view("cloneData").set("class", "popup-section")

                                            }
                                            if (isLinkMode && isDynamicLink) {
                                                this.view("dynamicLinkData").set("class", "popup-section")
                                                this.view("classNamePort").set("class", "linkhide")
                                                this.view("configData").set("class", "linkhide")
                                                this.view("templateData").set("class", "linkhide")
                                                this.view("editData").set("class", "linkhide")
                                                this.view("deleteComponent").set("class", "linkhide")
                                                this.view("cloneData").set("class", "linkhide")

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
                            },
                            'dynamicData': function() {
                                if (isDynamicSourceSelected)
                                    return "Destination";
                                else {
                                    return "Source";
                                }
                            }

                        },

                        // 'view' defines the appearance of the
                        // tooltip
                        view: {
                            content: {
                                content: [{
                                        tag: 'div',
                                        name: "cloneData",


                                        events: {
                                            'click': '{#cloneClickEvent}'
                                        },
                                        content: [{
                                                tag: "i",
                                                props: {
                                                    'class': "fa fa-clone",
                                                    'aria-hidden': "true"
                                                }
                                            }, {
                                                tag: "div",
                                                content: "Clone",
                                                props: {
                                                    'class': "label-data"
                                                }
                                            }

                                        ]
                                    }, {
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
                                    }, {
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
                                                        content: [{
                                                            tag: "span",
                                                            props: {
                                                                'class': "{clasName}"

                                                            },
                                                        }, {
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
                                    }, {
                                        tag: 'div',
                                        name: 'dynamicLinkData',
                                        content: [{
                                                tag: 'div',
                                                name: "linkData",
                                                props: {
                                                    'class': "tooltip-container",
                                                    content: [{
                                                        tag: "input",
                                                        props: {
                                                            'type': "radio",
                                                            'name': "sourceSelcted"
                                                        },
                                                        events: {
                                                            'click': '{#dynamicLinkEvent}'
                                                        },
                                                    }, {
                                                        tag: "div",
                                                        content: "{#dynamicData}",
                                                        props: {
                                                            'class': "label-data"
                                                        }
                                                    }]
                                                }

                                            }

                                        ]
                                    }

                                ],
                                // applies to the whole tooltip box
                                props: {

                                    'class': 'custom-tooltip'
                                }
                            }
                        },
                        methods: {
                            "cloneClickEvent": function() {
                                var self = this.node();
                                configurationEvents.cloneNode(self);

                            },
                            "findPortStatus": function() {

                            },
                            "dynamicLinkEvent": function() {
                                var source = $("input[name='sourceSelcted']:checked").next().text();
                                if (source == "Source") {
                                    isDynamicSourceSelected = true;
                                    configurationEvents.setSourceNodeDetails({
                                        node: this.node().get("label"),
                                        id: this.node().id(),
                                        iconType: this.node().get('iconType'),
                                        "data": $("input[name='sourceSelcted']:checked").next().text()
                                    });
                                } else if (source == "Destination") {
                                    isDynamicSourceSelected = false;
                                    debugger;
                                    var targetFBName = this.node().get("label");
                                    var self = this;
                                    dynamicLinkService.openDynamicLinkPopUp(configurationEvents, self, targetFBName);
                                }
                            },
                            "onClickEvent": function() {
                                var self = this.node();
                                $("#pageModal")
                                    .load(
                                        "templates/tab.html",
                                        function() {
                                            $('#pageModal ')
                                                .modal(
                                                    'show')

                                            var a = configurationEvents.init(self);
                                            debugger;
                                            configurationEvents.savingDetails(self, a);
                                            //configurationEvents.bridgeTable(self);
                                            configurationEvents.portTable(self);
                                            configurationEvents.controllerTable(self);
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
                                var sureDel = confirm("Please confirm to delete node")
                                if (!sureDel) {
                                    return;
                                }
                                var self = this.node();
                                var name = self.get("label");
                                var type = self.get("iconType");
                                var data = {
                                    "name": name,
                                    "type": type
                                }
                                switch (type) {
                                    case "optical-switch":
                                    case "bgp":
                                    case "host":

                                        $.ajax({
                                            url: properties.deleteNode,
                                            type: 'post',
                                            data: JSON.stringify(data),
                                            contentType: "application/json; charset=utf-8",
                                            success: function(returnData) {

                                                self.topology().removeNode(
                                                    self.node().id());
                                                $.ajax({
                                                    url: properties.saveNativeTopologyData,
                                                    type: 'post',
                                                    data: JSON.stringify(self.topology().getData()),
                                                    contentType: "application/json; charset=utf-8",
                                                    success: function(data) {
                                                        toastr.success("Deleted " + name + " successfully");
                                                        var logData = {
                                                            "configuration": "Delete Node",
                                                            "type": "success",
                                                            "message": "Deleted node successfully!",
                                                            "element": name
                                                        }
                                                        $.ajax({
                                                            url: properties.saveLog,
                                                            type: 'post',
                                                            data: JSON.stringify(logData),
                                                            contentType: "application/json; charset=utf-8",
                                                            success: function(dataReturn) {
                                                                console.log("Log saved");
                                                            },
                                                            error: function(dataReturn) {
                                                                console.log("Log not saved");
                                                            }
                                                        })

                                                    },
                                                    error: function(data) {
                                                        var logData = {
                                                            "configuration": "Delete Node",
                                                            "type": "Failure",
                                                            "message": "Could not delete node!",
                                                            "element": name
                                                        }
                                                        $.ajax({
                                                            url: properties.saveLog,
                                                            type: 'post',
                                                            data: JSON.stringify(logData),
                                                            contentType: "application/json; charset=utf-8",
                                                            success: function(dataReturn) {
                                                                console.log("Log saved");
                                                            },
                                                            error: function(dataReturn) {
                                                                console.log("Log not saved");
                                                            }
                                                        })
                                                        toastr.error("Could not delete  " + name);
                                                    }
                                                })


                                            }
                                        });

                                        break;

                                    case "fb-icon":
                                        $.ajax({
                                            url: properties.deleteNode,
                                            type: 'post',
                                            data: JSON.stringify(data),
                                            contentType: "application/json; charset=utf-8",
                                            success: function(returnData) {

                                                self.topology().removeNode(
                                                    self.node().id());
                                                $.ajax({
                                                    url: properties.saveNativeTopologyData,
                                                    type: 'post',
                                                    data: JSON.stringify(self.topology().getData()),
                                                    contentType: "application/json; charset=utf-8",
                                                    success: function(data) {
                                                        toastr.success("Deleted " + name + " successfully");
                                                        var logData = {
                                                            "configuration": "Delete Node",
                                                            "type": "success",
                                                            "message": "Deleted node successfully!",
                                                            "element": name
                                                        }
                                                        $.ajax({
                                                            url: properties.saveLog,
                                                            type: 'post',
                                                            data: JSON.stringify(logData),
                                                            contentType: "application/json; charset=utf-8",
                                                            success: function(dataReturn) {
                                                                console.log("Log saved");
                                                            },
                                                            error: function(dataReturn) {
                                                                console.log("Log not saved");
                                                            }
                                                        })

                                                    },
                                                    error: function(data) {
                                                        var logData = {
                                                            "configuration": "Delete Node",
                                                            "type": "Failure",
                                                            "message": "Could not delete node!",
                                                            "element": name
                                                        }
                                                        $.ajax({
                                                            url: properties.saveLog,
                                                            type: 'post',
                                                            data: JSON.stringify(logData),
                                                            contentType: "application/json; charset=utf-8",
                                                            success: function(dataReturn) {
                                                                console.log("Log saved");
                                                            },
                                                            error: function(dataReturn) {
                                                                console.log("Log not saved");
                                                            }
                                                        })
                                                        toastr.error("Could not delete  " + name);
                                                    }
                                                })


                                            }
                                        });

                                        break;


                                }



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
                                    var linkType = "";
                                    var templatedToLoad = "templates/tab1.html";
                                    var isFbTarget = this.node().get('iconType') == "fb-icon"
                                    var isFbSrc = configurationEvents.getSourceNodeDetails().iconType == "fb-icon"
                                    var isOpticalSwitchSrc = this.node().get('iconType') == "optical-switch"
                                    var isOpticalSwitchtarget = configurationEvents.getSourceNodeDetails().iconType == "optical-switch"
                                    var isFBTrgOrSrc = ((isFbTarget || isFbSrc) & !(isFbTarget & isFbSrc));
                                    var isOptTrgOrSrc = ((isOpticalSwitchSrc || isOpticalSwitchtarget) & !(isOpticalSwitchSrc & isOpticalSwitchtarget));

                                    if (isFBTrgOrSrc && isOptTrgOrSrc) {
                                        linkType = "FbtoOs";
                                    } else if (isFbTarget && isFbSrc) {
                                        linkType = "FbtoFb";
                                    } else if (isFBTrgOrSrc && !isOptTrgOrSrc) {
                                        linkType = "FbtoOther";
                                    }

                                    switch (linkType) {
                                        case "FbtoOs":
                                            configurationEvents.initFStoOB(self);
                                            break;
                                        case "FbtoFb":
                                            $("#pageModal").load(templatedToLoad,function() {
                                                        $('#pageModal ').modal('show')
                                                        var source = configurationEvents.getSourceNodeDetails().node;
                                                        var destination = self.node().get("label");
                                                        debugger;
                                                        $('#linkId').val(source+"-"+destination);
                                                        $('#linkGroupId').val(source+"-"+destination+"-G");
                                                        debugger;
                                                        $('#pageModal #saveLinkData').click(function() {
                                                            configurationEvents.initLinkEvents(self);
                                                        });
                                                    });
                                            break;
                                        case "FbtoOther":
                                            axios.get(properties.nodeIp + "/getList?key=vpnData").then(function(response) {
                                                linkService.openVirtualLinkPopUp(configurationEvents, self, response);
                                            })
                                            break;
                                        default:
                                    }
                                    //	linkMode.setFlag(false);
                                }
                            },
                            "editData": function() {
                                var self = this.node();

                                var uploadedData = {
                                    bootstrapTitle: "",
                                    submitMode: "Update",
                                    iconType: self.iconType(),
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
                                        uploadedData.formData["node-id"] = self.get("label");
                                    case "bgp":
                                        uploadedData.bootstrapTitle = "Editing Host";
                                        uploadedData.formData["node-id"] = self.get("label");

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
                            tag: 'div',
                            name: 'fromContent',
                            content: [{
                                tag: 'span',
                                content: 'From: ',
                                props: {
                                    'class': 'bold-text'
                                }
                            }, {
                                tag: 'span',
                                // we access link's model to show a source node's name
                                content: '{#link.model.source.label}'
                            }]
                        }, {
                            tag: 'div',
                            name: 'toContent',
                            content: [{
                                tag: 'span',
                                content: 'To: ',
                                props: {
                                    'class': 'bold-text'
                                }
                            }, {
                                tag: 'span',
                                // we access link's model to show a target node's name
                                content: '{#link.model.target.label}'
                            }]
                        }, {
                            tag: 'div',
                            name: "deleteComponent",
                            props: {
                                'class': "popup-section"
                            },
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
                        }, {
                            tag: 'div',
                            name: "editComponent",
                            props: {
                                'class': "popup-section"
                            },
                            events: {
                                'click': '{#editLink}'
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
                        }, ],
                        props: {
                            'class': 'custom-tooltip'
                        }



                    }
                },
                methods: {
                    deleteNode: function() {
                        var sureDel = confirm("Please confirm to delete link")
                        if (!sureDel) {
                            return;
                        }
                        var id = this._link._model._id;
                        var self = this;
                        debugger;
                        var promise = function(self, properties) {
                            $.ajax({
                                url: properties.saveNativeTopologyData,
                                type: 'post',
                                data: JSON.stringify(self.topology().getData()),
                                contentType: "application/json; charset=utf-8",
                                success: function(data) {}
                            })
                        }
                        if (this._link._color == "#82CEAC") {
                            var policyId = this._link._model._data.policyId;
                            var deleteURL = properties.orchestratorIp + "/deleteDynamicPolicy/" + policyId;
                            axios.delete(deleteURL).then(function(response) {
                                toastr.success("Successfully deleted the link.");
                                self.topology().removeLink(self._link._model._id);
                                promise(self, properties)
                                $(".n-topology-tooltip").hide()
                            })
                        } else {
                            debugger;
                            $.ajax({

                                url: properties.orchestratorIp + "/" + id + "/deleteLink",
                                type: 'DELETE',
                                success: function(result) {
                                    toastr.success("Link is deleted successfully")
                                    self.topology().removeLink(self._link._model._id);
                                    promise(self, properties)
                                    $(".n-topology-tooltip").hide()
                                        // Do something with the result
                                },
                                error: function(data) {
                                    toastr.error("Error in deleting link")
                                }
                            });
                        }
                    },
                    editLink: function() {
                        if (this._link._color == "#82CEAC") {
                            var policyId = this._link._model._data.policyId;
                            var getURL = properties.orchestratorIp + "/getAllDynamicPolicy";
                            axios.get(getURL).then(function(response) {
                                var policyData = response.data;
                                policyData.forEach(function(v, i) {
                                    if (v["policy-id"] == policyId) {
                                        dynamicLinkService.editDynamicLink(policyData[i]);
                                    }
                                })
                                debugger;
                            })
                        }
                        if(this._link._color == "#CBDA5C"){

                          var virtualID = this._link._model._data.id;
                          var getURLForId = properties.orchestratorIp+"/"+virtualID+"/getLink";
                          axios.get(getURLForId).then(function(response){
                            var virtualData = response.data;
                            linkService.editVirtualLink(virtualData);
                          })
                          debugger;
                        }
                    }
                }
            });
        })(nx);
    });
