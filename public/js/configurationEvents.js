/**
 *
 */
define(["properties", "toastr", 'react', 'react-dom', 'jsx!components/FBConfigurationForms/CreateBridge',
        'jsx!components/FBConfigurationForms/CreatePort', 'jsx!components/FBConfigurationForms/CreateController',
        'jsx!components/FBConfigurationForms/CreateLLDP', 'jsx!components/FBConfigurationForms/CreateARP',
        'jsx!components/FBConfigurationForms/CreatePollingFrequencies', 'jsx!components/FBConfigurationForms/CreateSSL',
        'jsx!components/FBConfigurationForms/createOperational','jsx!components/FBConfigurationForms/createConfigurational',
        'jsx!components/FBConfigurationForms/operationalPorts','jsx!components/FBConfigurationForms/configurationalPorts',
        'toastr', 'jsx!components/ComponentForms/CloneFb','linkMode','services/renderService', 'axios'
    ],
    function(properties, toastr, React, ReactDom, CreateBridge, CreatePort, CreateController, CreateLLDP, CreateARP, CreatePollingFrequencies, CreateSSL, CreateOperational, CreateConfigurational, OperationalPorts, ConfigurationalPorts, toastr, CloneFb,linkMode,renderService,axios) {
        var dom = null;
        var mode;
        var ref;
        var bridge;
        var port;
        var controller;
        var lldp;
        var arp;
        var pollingFrequencies;
        var ssl;
        var operational;
        var configurational;
        var operationalPorts;
        var configurationalPorts;
        var portController = function() {
            $("input[name=vlan_mode]").click(function() {
                if ($("input[name=vlan_mode]:checked").val() == "Trunk") {
                    $("input[data-id=trunks]").parent().show()
                    $("input[data-id=tag]").parent().hide()
                } else {
                    $("input[data-id=tag]").parent().show()
                    $("input[data-id=trunks]").parent().hide()

                }
            })

        }
        var urlToSend = properties.rmsIp;

        var handleSuccess = function(data) {
            $('.spin').spin('hide');
            var val = data.type;
            if ((!data.error) && (val != "failure")) {
                //  $("div.alert-message-success").show().html("Succesfully Added");
                //  $("div.alert-message-error").hide();
                toastr.success("Succesfully Added");
                return true;
            } else if (val == "failure") {
                //    $("div.alert-message-success").hide();
                //  $("div.alert-message-error").show().html(data.message);
                toastr.error(data.message);
                return false;
            } else {
                //  $("div.alert-message-success").hide();
                //  $("div.alert-message-error").show().html(data.error.error);
                toastr.error(data.error.error)

            }
        }
        var handleError = function(data) {
            $('.spin').spin('hide');

            //    console
            //        .log("Error");
            //    $("div.alert-message-success").hide();
            //    $("div.alert-message-error").show().html(data.responseText);
            toastr.error(data.responseText)


        }
        var srcDataNode = null;
        var srcSelected = false;
        var bodyElement = null;

        return {
            handleSuccess: handleSuccess,
            handleError: handleError,
            setBodyReference: function(data) {
                bodyElement = data;

            },
            getBodyReference: function() {
                return bodyElement;
            },
            getDom: function() {
                return dom;
            },
            setDom: function(data) {
                dom = data;
            },
            // getDetails: function(node){
            //   var fbName = node.get("label")
            //   var getURL = properties.templateIp + fbName +"/get-templates";
            //   $.get(getURL, function(result){
            //     var collection = result;
            //     var rows = [];
            //     let elem = document.querySelector("#root_counter_query_interval");
            //     let event = new Event('input', { bubbles: true });
            //     elem.value="bob@example.com";
            //     elem.dispatchEvent(event);
            //
            //   })
            // },

            templateTable: function(node) {
                var getURL = properties.templateIp + "listAllTemplates";
                $.get(getURL, function(result) {
                    var collection = result;
                    var rows = [];
                    for (i = 0; i < result.OS.length; i++) {
                        var tr = $('<tr>')
                        tr.append("<td> <input type='radio' name='os' value='"+ result.OS[i].name +"'></input> </td>");
                        tr.append($('<td>').append(result.OS[i].name));
                        $("#viewOsTemplate").find('tbody')
                            .append(tr);
                    }
                    for (i = 0; i < result.TS.length; i++) {
                        var tr = $('<tr>')
                        tr.append("<td> <input type='radio' name='ts' value='"+ result.TS[i].name +"'></input> </td>");
                        tr.append($('<td>').append(result.TS[i].name));
                        $("#viewTransceiverHardwareTemplate").find('tbody')
                            .append(tr);
                    }
                    for (i = 0; i < result.HW.length; i++) {
                        var tr = $('<tr>')
                        tr.append("<td> <input type='radio' name='hw' value='"+ result.HW[i].name +"'></input> </td>");
                        tr.append($('<td>').append(result.HW[i].name));
                        $("#viewHardwareTemplate").find('tbody')
                            .append(tr);
                    }
                })
                var fb_device_name = node.get("label");
                var URLForAssignedTemplates = properties.templateIp + "/"+ fb_device_name + "/getAssignTemplates";
                axios.get(URLForAssignedTemplates).then(function(response){
                  if(response){
                    var data = response.data;
                    debugger;
                    $('input[name="os"][value="'+data.fbOS+'"]').prop('checked', true);
                    $('input[name="ts"][value="'+data.fbTS+'"]').prop('checked', true);
                    $('input[name="hw"][value="'+data.fbHW+'"]').prop('checked', true);
                  }
                })

                $("#assigningTemplates").click(function() {
                    var fb_device_name = node.get("label")
                    var postURL = properties.templateIp + "assignTemplates?fb_device_name=" + fb_device_name;
                    var fbOS = $('input[name="os"]:checked').val();
                    var fbTS = $('input[name="ts"]:checked').val();
                    var fbHW = $('input[name="hw"]:checked').val();
                    var jsonData = {
                        fb_device_name: fb_device_name,
                        fbOS: fbOS,
                        fbTS: fbTS,
                        fbHW: fbHW
                    };
                    $
                        .ajax({
                            url: postURL,
                            method: 'POST',
                            data: JSON.stringify(jsonData),
                            contentType: "application/json; charset=utf-8",
                            success: function(data) {
                                toastr.success("Templates assigned to node successfully")
                            },
                            error: function(data) {
                                toastr.error("Could not assign templates")
                            }
                        })
                })
            },

            bridgeTable: function(node) {
                var fbName = node.get("label")
                var getURL = properties.rmsIp +
                    fbName +
                    "/listBridge";
                var collection;
                $.get(getURL, function(result) {
                    collection = result;
                    var bridgeTable = $("#viewBridge");
                    var rows = [];
                    result.forEach(function(v, i) {
                        var tr = $('<tr>')
                        tr.append($('<td class=bridgeName>').append(v.name));
                        tr.append($('<td>').append(v.datapath_type));
                        tr.append($('<td>').append(v["bridge_other_config"]["datapath-id"]));
                        tr.append($('<td>').append(v.protocol));
                        tr.append($('<td>').append(v.fb_ip));
                        tr.append($('<td>').append("<div class = 'popup-section'><i class= 'fa fa-pencil editBridge' aria-hidden='true'><div class='label-data'>Edit</div></i></div>"))
                        tr.append($('<td>').append("<div class = 'popup-section'><i class='fa fa-trash deleteBridge' aria-hidden='true'><div class='label-data'>Delete</div></i></div>"))
                        $("#viewBridge").find('tbody')
                            .append(tr)
                    })
                    $('.deleteBridge').unbind('click').click(function(event) {
                        var sureDel = confirm("Please confirm to delete bridge")
                        if (!sureDel) {
                            return;
                        } else {
                            var name_bridge = $(this).closest("tr").find('.bridgeName').text();
                            var trToRemove = $(this).closest("tr");
                            var deleteURL = properties.rmsIp + fbName + "/delete-bridge/";
                            debugger;
                            $.ajax({
                                url: deleteURL,
                                method: 'delete',
                                data: "",
                                contentType: "application/json; charset=utf-8",
                                success: function(data) {
                                    trToRemove.remove();
                                    toastr.success("Deleted " + name_bridge + " successfully");
                                },
                                error: function(data) {
                                    toastr.error("Could not delete " + name_bridge);
                                }
                            });
                        }

                    })
                    var configRef = this;
                    $('.editBridge').unbind('click').click(function(event) {
                        var name_bridge = $(this).closest("tr").find('.bridgeName').text();
                        var tr = $(this).closest("tr");
                        var dataBridge;
                        collection.forEach(function(v, i) {
                            if (v.name == name_bridge) {
                                dataBridge = collection[i];
                            }
                        })
                        bridge = React.createFactory(CreateBridge);
                        ReactDom.render(
                            bridge({
                                formData: dataBridge,
                                tr: tr,
                                submitMode: "Update",
                                "configurationEvents": configRef,
                                fbName: node.get("label")
                            }),
                            document.getElementById('createBridgeForm'));
                    })
                })

            },

            portTable: function(node) {
                var fbName = node.get("label")
                var getURL = properties.rmsIp +
                    fbName +
                    "/list-ports";
                var collection;
                $.get(getURL, function(result) {
                    collection = result;
                    var result = $("#viewPort");
                    var rows = [];
                    collection.forEach(function(v, i) {
                        var tr = $('<tr>')
                        tr.append($('<td class=portName>').append(v.name));
                        tr.append($('<td>').append(""));
                        tr.append($('<td>').append(v.tag));
                        tr.append($('<td>').append(v.fb_ip));
                        tr.append($('<td>').append(v.type));
                        tr.append($('<td>').append(v.speed));
                        tr.append($('<td>').append(v.is_dac));
                        tr.append($('<td>').append(v.vlan_mode));
                        tr.append($('<td>').append("<div class = 'popup-section'><i class= 'fa fa-pencil editPort' aria-hidden='true'><div class='label-data'>Edit</div></i></div>"))
                        tr.append($('<td>').append("<div class = 'popup-section'><i class='fa fa-trash deletePort' aria-hidden='true'><div class='label-data'>Delete</div></i></div>"))
                        $("#viewPort").find('tbody')
                            .append(tr)
                    })
                    $('.deletePort').unbind('click').click(function(event) {
                        var sureDel = confirm("Please confirm to delete port")
                        if (!sureDel) {
                            return;
                        } else {
                            var name_port = $(this).closest("tr").find('.portName').text();
                            var trToRemove = $(this).closest("tr");
                            var deleteURL = properties.rmsIp + fbName + "/" + name_port + "/delete";
                            debugger;
                            $.ajax({
                                url: deleteURL,
                                method: 'delete',
                                data: "",
                                contentType: "application/json; charset=utf-8",
                                success: function(data) {
                                    trToRemove.remove();
                                    toastr.success("Deleted " + name_port + " successfully");
                                },
                                error: function(data) {
                                    toastr.error("Could not delete " + name_port);
                                }
                            });
                        }
                    })
                    var configRef = this;
                    $('.editPort').unbind('click').click(function(event) {
                        var name_port = $(this).closest("tr").find('.portName').text();
                        var tr = $(this).closest("tr");
                        var dataPort;
                        collection.forEach(function(v, i) {
                            if (v.name == name_port) {
                                dataPort = collection[i];
                            }
                        })
                        port = React.createFactory(CreatePort);
                        ReactDom.render(
                            port({
                                formData: dataPort,
                                submitMode: "Update",
                                tr: tr,
                                "configurationEvents": configRef,
                                fbName: node.get("label")
                            }),
                            document.getElementById('createPortForm'));
                    })
                })

            },

            controllerTable: function(node) {
                var fbName = node.get("label")
                var getURL = properties.rmsIp +
                    fbName +
                    "/get-controller";
                var collection;
                $.get(getURL, function(result) {
                    collection = result;
                    var controllerTable = $("#viewController");
                    var rows = [];
                    result.forEach(function(v, i) {
                        var tr = $('<tr>')
                        tr.append($('<td class=controllerName>').append(v.name));
                        tr.append($('<td>').append(v.controller_ip));
                        tr.append($('<td>').append(v.of_port));
                        tr.append($('<td>').append(v.connect_protocol));
                        tr.append($('<td>').append(v.fb_ip));
                        tr.append($('<td>').append("<div class = 'popup-section'><i class= 'fa fa-pencil editController' aria-hidden='true'><div class='label-data'>Edit</div></i></div>"))
                        tr.append($('<td>').append("<div class = 'popup-section'><i class='fa fa-trash deleteController' aria-hidden='true'><div class='label-data'>Delete</div></i></div>"))
                        $("#viewController").find('tbody')
                            .append(tr)
                    })
                    $('.deleteController').unbind('click').click(function(event) {
                        var sureDel = confirm("Please confirm to delete Controller")
                        if (!sureDel) {
                            return;
                        } else {
                            var name_controller = $(this).closest("tr").find('.controllerName').text();
                            var trToRemove = $(this).closest("tr");
                            var deleteURL = properties.rmsIp + fbName + "/delete/" + name_controller;
                            debugger;
                            $.ajax({
                                url: deleteURL,
                                method: 'delete',
                                data: "",
                                contentType: "application/json; charset=utf-8",
                                success: function(data) {
                                    trToRemove.remove();
                                    toastr.success("Deleted " + name_controller + " successfully");
                                },
                                error: function(data) {
                                    toastr.error("Could not delete " + name_controller);
                                }
                            });
                        }
                    })

                    var configRef = this;
                    $('.editController').unbind('click').click(function(event) {
                        var name_controller = $(this).closest("tr").find('.controllerName').text();
                        var tr = $(this).closest("tr");
                        var dataController;
                        collection.forEach(function(v, i) {
                            if (v.name == name_controller) {
                                dataController = collection[i];
                            }
                        })
                        controller = React.createFactory(CreateController);
                        ReactDom.render(
                            controller({
                                formData: dataController,
                                submitMode: "Update",
                                tr: tr,
                                "configurationEvents": configRef,
                                fbName: node.get("label")
                            }),
                            document.getElementById('createControllerFrom'));
                    })
                })



            },

            savingDetails: function(node, self) {
                var fbName = node.get("label")
                var postURL = properties.rmsIp +
                    fbName +
                    "/composite";
                    $('.slider').click(function(){
                      debugger;
                    })
                $('#pageModal button.deployBtn').click(function() {
                  debugger;
                  var formID = $('#pageModal div.tab-content .tab-pane.active')
                      .attr(
                          'id');
                  switch (formID) {
                      // case 'fbOperational':
                      //     self[0].props.mode = "deploy";
                      //     console.log('fbOperational');
                      //     debugger;
                      //     $(".FormOperational button").click();
                      //     var row = self[2].refs.grid.gridOptions.rowData;
                      //     debugger;
                      //     break;

                      case 'fbConfigurational':
                          self[1].props.mode = "deploy";
                          console.log('fbConfigurational');
                          $(".FormConfigurational button").click();
                          break;
                      }
                }.bind(self))

                $('#pageModal button.saveBtn').click(
                    function() {
                        var formID = $('#pageModal div.tab-content .tab-pane.active')
                            .attr(
                                'id');
                        switch (formID) {
                            // case 'fbOperational':
                            //     self[0].props.mode = "save";
                            //     console.log('fbOperational');
                            //     debugger;
                            //     $(".FormOperational button").click();
                            //     renderService.pushData(fbName);
                            //     debugger;
                            //     break;

                            case 'fbConfigurational':
                                self[1].props.mode = "save";
                                console.log('fbConfigurational');
                                $(".FormConfigurational button").click();
                                break;

                            // case 'fbConfigController':
                            //     console
                            //         .log('fbConfigController');
                            //     $(".FormCreateController button").click();
                            //     break;
                            //
                            // case 'lldpConfigIL':
                            //     console
                            //         .log('lldpConfigIL');
                            //     $(".FormCreateLLDP button").click();
                            //     break;
                            //
                            // case 'configArp':
                            //     console
                            //         .log('configArp');
                            //     $(".FormCreateARP button").click();
                            //     break;
                            // case 'configTcam':
                            //     console
                            //         .log('configTcam');
                            //     var postURL = urlToSend +
                            //         fbName +
                            //         "/configure/tcam";
                            //     var match_mode_name = $('#' +
                            //         formID +
                            //         ' #match_mode_name')[0].value;
                            //     var priority_low = $('#' +
                            //         formID +
                            //         ' #priority_low')[0].value;
                            //     var priority_high = $('#' +
                            //         formID +
                            //         ' #priority_high')[0].value;
                            //
                            //     var jsonData = {
                            //         match_mode_name: match_mode_name,
                            //         priority_low: priority_low,
                            //         priority_high: priority_high
                            //     };
                            //
                            //     $
                            //         .ajax({
                            //             url: postURL,
                            //             method: 'POST',
                            //             data: jsonData,
                            //             contentType: 'application/json',
                            //             success: function() {
                            //                 console
                            //                     .log("Success");
                            //             },
                            //             error: function() {
                            //                 console
                            //                     .log("Error");
                            //             }
                            //         });
                            //     break;
                            //
                            // case 'addPortInterval':
                            //     console
                            //         .log('addPortInterval');
                            //     $(".FormCreatePollingFrequencies button").click();
                            //     break;
                            //
                            // case 'sslConfigService':
                            //     console
                            //         .log('sslConfigService');
                            //     $(".FormCreateSSL button").click();
                            //     break;
                        }
                    })


            },
            isInt: function(value) {
                var x = parseFloat(value);
                return !isNaN(value) && (x | 0) === x;
            },
            init: function(node) {
                var a = [];
                portController();
                operational = React.createFactory(CreateOperational);
                configurational = React.createFactory(CreateConfigurational);
                operationalPorts = React.createFactory(OperationalPorts);
                configurationalPorts = React.createFactory(ConfigurationalPorts);
                bridge = React.createFactory(CreateBridge);
                port = React.createFactory(CreatePort);
                controller = React.createFactory(CreateController);
                var lldp = React.createFactory(CreateLLDP);
                var arp = React.createFactory(CreateARP);
                var pollingFrequencies = React.createFactory(CreatePollingFrequencies);
                var ssl = React.createFactory(CreateSSL);

                var portgridOp = ReactDom.render(
                  operationalPorts({
                    "configurationEvents": this,
                    fbName: node.get("label")

                  }),
                document.getElementById('portListOp'));

                ReactDom.render(
                  configurationalPorts({
                    "configurationEvents": this,
                    fbName: node.get("label")
                  }),
                document.getElementById('portListCo'));

                  var op = ReactDom.render(
                  operational({
                    "configurationEvents": this,
                    fbName: node.get("label"),
                    mode: mode
                  }),
                  document.getElementById('operationalForm'));
                  debugger;

                 var co = ReactDom.render(
                  configurational({
                    "configurationEvents": this,
                    fbName: node.get("label"),
                    mode: mode
                  }),
                  document.getElementById('configurationalForm'));
                  a.push(op);
                  a.push(co);
                  a.push(portgridOp);
                // ReactDom.render(
                //     ssl({
                //         "configurationEvents": this,
                //         fbName: node.get("label")
                //     }),
                //     document.getElementById('createSSLForm'));
                // ReactDom.render(
                //     pollingFrequencies({
                //         "configurationEvents": this,
                //         fbName: node.get("label")
                //     }),
                //     document.getElementById('createPollingFrequenciesForm'));
                // ReactDom.render(
                //     arp({
                //         "configurationEvents": this,
                //         fbName: node.get("label")
                //     }),
                //     document.getElementById('createARPForm'));
                // ReactDom.render(
                //     lldp({
                //         "configurationEvents": this,
                //         fbName: node.get("label")
                //     }),
                //     document.getElementById('createLLDPForm'));
                // ReactDom.render(
                //     controller({
                //         "configurationEvents": this,
                //         fbName: node.get("label")
                //     }),
                //     document.getElementById('createControllerFrom'));
                // ReactDom.render(
                //     port({
                //         "configurationEvents": this,
                //         fbName: node.get("label")
                //     }),
                //     document.getElementById('createPortForm'));
                // debugger;
                // ReactDom.render(
                //     bridge({
                //         "configurationEvents": this,
                //         fbName: node.get("label")
                //     }),
                //     document.getElementById('createBridgeForm'));
                var iconType = node.iconType();
                if (iconType == "optical-fiber") {
                    $("#pageModal .modal-title").html("Configure Optical Switch")
                } else if (iconType == "fb-icon") {
                    $("#pageModal .modal-title").html("Configure Forwarding Box")

                }
                return a;
            },
            getOperational: function(){
              return operational;
            },
            cloneNode: function(node) {
              var data={
                  "configurationEvents": this,
                  submitMode: "Create",
                  formData: {},
                  className: "test",
                  topologyModel:this.getBodyReference().topologyModel,
                  "node":node
              };
              switch (node.get("iconType")) {
                  case "fb-icon":
                  data.header= "Clone FB Box";
                  break;
                  case "host":
                  data.header= "Clone Host";

                  break;
                  case "optical-switch":
                    data.header= "Clone Optical Switch";
                  break;
                default:

              }
                var cloneFB = React.createFactory(CloneFb);
                $("#pageModal").empty()
                ReactDom.render(
                    cloneFB(data),
                    document.getElementById('pageModal'));
                $('#pageModal ')
                    .modal(
                        'show')
            },
            saveNativeTopology: function(data) {

                var topologyData = data;
                //  localStorage.setItem("topologyData", JSON.stringify(topologyData))
                $.ajax({
                    url: properties.saveNativeTopologyData,
                    type: 'post',
                    data: JSON.stringify(topologyData),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {

                    }
                })
            },
            initLinkEvents: function(self) {
                var saveLink = properties.createLink;
                var linkData = {
                    "lid": "",
                    "link": {
                        "destination": {
                            "dest-node": self
                                .node()
                                .get("label"),
                            "dest-tp": $("input[name='portselcted']:checked").next().text()
                        },
                        "link-cost": $("#linkcost").val(),
                        "link-group-id": [
                            $("#linkGroupId").val(),

                        ],
                        "link-id": $("#linkId").val(),
                        "link-validate": $("#linkValid").val(),
                        "max-bandwidth": {
                            "unit": "GBPS",
                            "value": $("#max-bandwidth").val()
                        },
                        "source": {
                            "source-node": this.getSourceNodeDetails().node,
                            "source-tp": this.getSourceNodeDetails().data
                        },
                    },

                    "reverseLink": {
                        "linkId": $("#linkIdReverse").val(),
                        "linkGroupId": [
                            $("#linkGroupIdReverse").val(),
                        ]
                    }
                };

                if (!this.isInt($("#max-bandwidth").val())) {
                    toastr.error("Max Bandwidth should be integer");
                    return;

                }
                if (!this.isInt($("#linkcost").val())) {
                    toastr.error("Link Cost should be integer");
                    return;

                }
                var that = this;
                properties.getMaxNode({
                    source: this.getSourceNodeDetails().id,
                    target: self
                        .node()
                        .id()
                }, function(dataObj, length) {
                    dataObj.id = length;


                    linkData["lid"] = length;
                    console.log(linkData);
                    $.ajax({
                        url: properties.createLink,
                        type: 'post',
                        data: JSON.stringify(linkData),
                        contentType: "application/json; charset=utf-8",
                        success: function(data) {
                            self
                                .topology()
                                .addLink(dataObj);
                            toastr.success("Link is added successfully")

                        }

                    })
                    properties.saveMaxNode(++length, "linkCounter");
                    that.saveNativeTopology(self
                        .topology().getData())

                }, "linkCounter");

                var port1=this.getSourceNodeDetails().data.replace(/\//g, "@")
                var port2=$("input[name='portselcted']:checked").next().text().replace(/\//g, "@")

                var postURL1 = urlToSend +
                    this.getSourceNodeDetails().node + "/" + port1 +
                    "/false";
                var postURL2 = urlToSend +
                    self
                    .node()
                    .get("label") + "/" + port2 +
                    "/false";
                    console.log(port1 +" -------- "+port2)
                if (this.getSourceNodeDetails().iconType == "patch-panel" || this.getSourceNodeDetails().iconType == "optical-switch" || this.getSourceNodeDetails().iconType == "host") {
                    var socket = properties.socket();

                    var patchupdate2 = {
                        "name": this.getSourceNodeDetails().node,
                        "type": this.getSourceNodeDetails().iconType,
                        "portname": this.getSourceNodeDetails().data,
                        "status": "true"
                    };
                    socket.emit('port-status-set', JSON.stringify(patchupdate2));
                } else {
                    $
                        .ajax({
                            url: postURL1,
                            method: 'GET',

                            contentType: "application/json; charset=utf-8",
                            success: function(data) {
                                handleSuccess(data);
                            },
                            error: function(data) {
                                handleError(data)
                            }
                        });
                }
                if (self
                    .node().get("iconType") == "patch-panel" || self
                    .node().get("iconType") == "optical-switch" || self
                    .node().get("iconType") == "host") {
                    var socket = properties.socket();

                    var patchupdate2 = {
                        "name": self
                            .node()
                            .get("label"),
                        "type": self
                            .node()
                            .get("iconType"),
                        "portname": $("input[name='portselcted']:checked").next().text(),
                        "status": "true"
                    };
                    socket.emit('port-status-set', JSON.stringify(patchupdate2));

                } else {
                    $
                        .ajax({
                            url: postURL2,
                            method: 'GET',

                            contentType: "application/json; charset=utf-8",
                            success: function(data) {
                                handleSuccess(data);
                            },
                            error: function(data) {
                                handleError(data)
                            }
                        });
                }
                this.setSourceSelected(false)
                $('#pageModal ')
                    .modal(
                        'hide')
            },

            initFStoOB: function(self) {
                this.setSourceSelected(false)
                var saveLink = properties.createLink;
                var port1=this.getSourceNodeDetails().data.replace(/\//g, "@")
var port2=$("input[name='portselcted']:checked").next().text().replace(/\//g, "@")
console.log(port1 +" -------- "+port2)
                var postURL1 = urlToSend +
                    this.getSourceNodeDetails().node + "/" +port1 +
                    "/false";
                var postURL2 = urlToSend +
                    self
                    .node()
                    .get("label") + "/" + port2 +
                    "/false";

                var socket = properties.socket();
                var that = this;
                properties.getMaxNode({
                    source: this.getSourceNodeDetails().id,
                    target: self
                        .node()
                        .id()
                }, function(dataObj, length) {
                    dataObj.id = length;
                    self
                        .topology()
                        .addLink(dataObj);
                    properties.saveMaxNode(++length, "linkCounter");
                    that.saveNativeTopology(self
                        .topology().getData());
                }, "linkCounter");


                srcData = {};
                if (this.getSourceNodeDetails().iconType == "fb-icon") {
                    srcData.name = this.getSourceNodeDetails().node;
                    srcData.link = {
                    							"fbPort": this.getSourceNodeDetails().data,
                    							"l1SwitchNode": self.node().get("label"),
                    							"l1SwitchPort": $("input[name='portselcted']:checked").next().text(),
                    							"maxBandwidth": {
                    								"unit": "Gbps",
                    								"value": 10
                    							}
                      //  "l1-switch-port": $("input[name='portselcted']:checked").next().text(),
                      //  "fb-port": this.getSourceNodeDetails().data
                    }
                } else if (self
                    .node()
                    .iconType() == "fb-icon") {
                    srcData.name = self.node().get("label");
                    srcData.link = {
                                  "fbPort": $("input[name='portselcted']:checked").next().text(),
                                  "l1SwitchNode": this.getSourceNodeDetails().node,
                                  "l1SwitchPort":  this.getSourceNodeDetails().data,
                                  "maxBandwidth": {
                                    "unit": "Gbps",
                                    "value": 10
                                  }
                      //  "l1-switch-port": this.getSourceNodeDetails().data,
                      //  "fb-port": $("input[name='portselcted']:checked").next().text()
                    }
                }
                socket.emit('fbtooptical', srcData);

                if (this.getSourceNodeDetails().iconType == "patch-panel" || this.getSourceNodeDetails().iconType == "optical-switch") {


                    var patchupdate2 = {
                        "name": this.getSourceNodeDetails().node,
                        "type": this.getSourceNodeDetails().iconType,
                        "portname": this.getSourceNodeDetails().data,
                        "status": "true"
                    };

                    socket.emit('port-status-set', JSON.stringify(patchupdate2));
                } else {
                    $
                        .ajax({
                            url: postURL1,
                            method: 'GET',

                            contentType: "application/json; charset=utf-8",
                            success: function(data) {
                                handleSuccess(data);
                            },
                            error: function(data) {
                                handleError(data)
                            }
                        });
                }
                if (self
                    .node().get("iconType") == "patch-panel" || self
                    .node().get("iconType") == "optical-switch") {
                    var socket = properties.socket();

                    var patchupdate2 = {
                        "name": self
                            .node()
                            .get("label"),
                        "type": self
                            .node()
                            .get("iconType"),
                        "portname": $("input[name='portselcted']:checked").next().text(),
                        "status": "true"
                    };
                    //  socket.emit('port-status-set', JSON.stringify(patchupdate2));

                } else {
                    $
                        .ajax({
                            url: postURL2,
                            method: 'GET',

                            contentType: "application/json; charset=utf-8",
                            success: function(data) {
                                handleSuccess(data);
                            },
                            error: function(data) {
                                handleError(data)
                            }
                        });
                }
                this.setSourceSelected(false)

                $('#pageModal ')
                    .modal(
                        'hide')
            },
            setSourceNodeDetails: function(data) {
                var rightMenu = this.getDom();
                rightMenu.state.sourceData.sourceName = data.node;
                rightMenu.state.sourceData.sourceType = data.iconType;
                rightMenu.state.sourceData.portData = data.data;
                rightMenu.setState(rightMenu.state);


                srcSelected = true;
                srcDataNode = data;
            },
            isSourceSelected: function() {
                return srcSelected;
            },
            getSourceNodeDetails: function() {
                return srcDataNode;
            },
            setSourceSelected: function(value) {
                srcSelected = value;
            },
            isValidLink: function(dest, src) {
                var isValid = false;
                switch (src) {
                    case "patch-panel":
                        if (dest == "host") {
                            isValid = true;
                        } else if (dest == "fb-icon") {
                            isValid = true;
                        }
                        break;
                    case "fb-icon":
                        isValid = true;
                        break;
                    case "optical-switch":
                        if (dest == "fb-icon") {
                            isValid = true;
                        }
                        break;
                    case "host":
                        if (dest == "fb-icon") {
                            isValid = true;
                        } else if (dest == "patch-panel") {
                            isValid = true;
                        }
                        break;
                    default:
                }
                return isValid
            }
        }

    });
