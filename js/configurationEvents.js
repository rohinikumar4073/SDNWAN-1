/**
 *
 */
define(["properties", "toastr", 'jquery.spin'], function(properties, toastr) {
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
            $("div.alert-message-success").show().html("Succesfully Added");
            $("div.alert-message-error").hide();
        } else if (val == "failure") {
            $("div.alert-message-success").hide();
            $("div.alert-message-error").show().html(data.message);
        } else {
            $("div.alert-message-success").hide();
            $("div.alert-message-error").show().html(data.error.error);
        }
    }
    var handleError = function(data) {
        $('.spin').spin('hide');

        console
            .log("Error");
        $("div.alert-message-success").hide();
        $("div.alert-message-error").show().html(data.responseText);

    }
    return {
      onChangeFunction: function() {
        var selected = $("input[type='radio'][name='rate']:checked").val();
        alert(selected);
      },
        templateTable: function() {
              var getURL = properties.templateIp + "listAllTemplates";
              $.get(getURL, function(result) {
                var collection = result;
                var rows = [];
                for(i = 0;i<result.Instances.length;i++){
                  var tr = $('<tr>')
                  tr.append("<td> <input type='radio' name='instances' id="+result.Instances[i].name+" onChange={configurationEvents.onChangeFunction}> </td>");
                  tr.append($('<td>').append(result.Instances[i].name));
                  $("#viewInstance").find('tbody')
                      .append(tr);
                }
                for(i = 0;i<result.FS.length;i++){
                  var tr = $('<tr>')
                  tr.append("<td> <input type='radio' name='fs' onChange={configurationEvents.onChangeFunction}> </td>");
                  tr.append($('<td>').append(result.FS[i].name));
                  $("#viewFanTemplate").find('tbody')
                      .append(tr);
                }
                for(i = 0;i<result.OS.length;i++){
                  var tr = $('<tr>')
                  tr.append("<td> <input type='radio' name='os' onChange={configurationEvents.onChangeFunction}> </td>");
                  tr.append($('<td>').append(result.OS[i].name));
                  $("#viewOsTemplate").find('tbody')
                      .append(tr);
                }
                for(i = 0;i<result.PS.length;i++){
                  var tr = $('<tr>')
                  tr.append("<td> <input type='radio' name='ps' onChange={configurationEvents.onChangeFunction}> </td>");
                  tr.append($('<td>').append(result.PS[i].name));
                  $("#viewPowerSupplyTemplate").find('tbody')
                      .append(tr);
                }
                for(i = 0;i<result.Templates.length;i++){
                  var tr = $('<tr>')
                  tr.append("<td> <input type='radio' name='templates' onChange={configurationEvents.onChangeFunction}> </td>");
                  tr.append($('<td>').append(result.Templates[i].name));
                  $("#viewFbTemplate").find('tbody')
                      .append(tr);
                }
                for(i = 0;i<result.TS.length;i++){
                  var tr = $('<tr>')
                  tr.append("<td> <input type='radio' name='ts' onChange={configurationEvents.onChangeFunction}> </td>");
                  tr.append($('<td>').append(result.TS[i].name));
                  $("#viewTransceiverTemplate").find('tbody')
                      .append(tr);
                }

              })
        },
        bridgeTable: function() {
            var fbName = $('g.node-selected')
                .attr('data-id');
            var getURL = properties.rmsIp +
                fbName +
                "/listBridge";
            $.get(getURL, function(result) {
                var collection = result;
                var bridgeTable = $("#viewBridge");
                var rows = [];
                result.forEach(function(v, i) {
                    var tr = $('<tr>')
                    tr.append($('<td>').append(v.name));
                    tr.append($('<td>').append(v.datapath_type));
                    tr.append($('<td>').append(v.datapath_id));
                    tr.append($('<td>').append(v.protocols));
                    tr.append($('<td>').append(v.fb_ip));
                    $("#viewBridge").find('tbody')
                        .append(tr)
                })

            })
        },

        portTable: function() {
            var fbName = $('g.node-selected')
                .attr('data-id');
            var getURL = properties.rmsIp +
                fbName +
                "/list-ports";
            $.get(getURL, function(result) {
                var collection = result;
                var portTable = $("#viewPort");
                var rows = [];
                result.forEach(function(v, i) {
                    var tr = $('<tr>')
                    tr.append($('<td>').append(v.name));
                    tr.append($('<td>').append(v.vlan_mode));
                    tr.append($('<td>').append(v.fb_ip));
                    tr.append($('<td>').append(v.type));
                    tr.append($('<td>').append(v.speed));
                    tr.append($('<td>').append(v.is_dac));
                    $("#viewPort").find('tbody')
                        .append(tr)
                })

            })
        },
        savingDetails: function() {

            var fbName = $('g.node-selected')
                .attr('data-id');

            $('#pageModal button.saveBtn').click(
                function() {
                    var formID = $('#pageModal div.tab-content .tab-pane.active')
                        .attr(
                            'id');

                    switch (formID) {
                        case 'fbConfig':
                            console
                                .log('fbConfig');
                            var postURL = urlToSend +
                                fbName +
                                "/add-bridge";
                            var name = $('#' +
                                formID +
                                ' #name')[0].value;
                            var datapath_type = $('#' +
                                formID +
                                ' #datapath_type')[0].value;
                            var datapath_id = $('#' +
                                formID +
                                ' #datapath_id')[0].value;
                            var protocols = $('#' +
                                formID +
                                ' #protocols')[0].value;
                            var fb_ip = $('#' +
                                formID +
                                ' #fb_ip')[0].value;
                            var jsonData = {
                                name: name,
                                datapath_type: datapath_type,
                                datapath_id: datapath_id,
                                protocols: protocols,
                                fb_ip: fb_ip
                            };

                            $('.spin').spin();
                            $('.spin').spin('show');

                            $
                                .ajax({
                                    url: postURL,
                                    method: 'POST',
                                    data: JSON.stringify(jsonData),
                                    contentType: "application/json; charset=utf-8",
                                    success: function(data) {
                                        var tr = $('<tr>')
                                        tr.append($('<td>').append(jsonData.name));
                                        tr.append($('<td>').append(jsonData.datapath_type));
                                        tr.append($('<td>').append(jsonData.datapath_id));
                                        tr.append($('<td>').append(jsonData.protocols));
                                        tr.append($('<td>').append(jsonData.fb_ip));
                                        $("#viewBridge").find('tbody')
                                            .append(tr)
                                        handleSuccess(data);

                                    },
                                    error: function(data) {
                                        handleError(data)
                                    }
                                });
                            break;
                        case 'fbConfigLink':
                            console
                                .log('fbConfigLink');
                            var postURL = urlToSend +
                                fbName +
                                "/add-bridge";
                            var link_speed = $('#' +
                                formID +
                                ' #link_speed')[0].value;
                            var jsonData = {
                                link_speed: link_speed
                            };

                            $
                                .ajax({
                                    url: postURL,
                                    method: 'POST',
                                    data: jsonData,
                                    contentType: 'application/json',
                                    success: function() {
                                        console
                                            .log("Success");
                                    },
                                    error: function() {
                                        console
                                            .log("Error");
                                    }
                                });
                            break;
                        case 'addPort':
                            console
                                .log('addPort');
                            var postURL = urlToSend +
                                fbName +
                                "/port/add";
                            var name = $(
                                    '#' +
                                    formID)
                                .find(
                                    'input[data-id="name"]')[0].value;
                            var vlanMode = "access";
                            //  $('#'+formID).find('input[name="vlan_mode"]:checked').val();
                            //  var vlanMode = $(
                            //  		'#'
                            //  				+ formID)
                            //  		.find(
                            //  				'input[name="vlan_mode"]:checked')
                            //  		.attr(
                            // 				'data-id');
                            var fb_ip = $(
                                    '#' +
                                    formID)
                                .find(
                                    'input[data-id="fb_ip"]')[0].value;
                            var type = $(
                                    '#' +
                                    formID)
                                .find(
                                    'input[data-id="type"]')[0].value;
                            var speed = $(
                                    '#' +
                                    formID)
                                .find(
                                    'input[data-id="speed"]')[0].value;
                            var tag = $(
                                    '#' +
                                    formID)
                                .find(
                                    'input[data-id="tag"]')[0].value;
                            // var trunks = ""
                            // var
                            // isDac
                            // =
                            // $('#'+formID).find('input[name="is_dac"]:checked').val();
                            var isDac = $(
                                    '#' +
                                    formID)
                                .find(
                                    'input[name="is_dac"]:checked')
                                .attr(
                                    'data-id');
                            var idDacreturn = false;
                            if (isDac == "true") {
                                idDacreturn = true;
                            }
                            var jsonData = null
                            if (vlanMode.toLowerCase == "access")
                                jsonData = {
                                    "fb_ip": fb_ip,
                                    "is_dac": idDacreturn,
                                    "name": name,
                                    "speed": speed,
                                    "tag": parseInt(tag),
                                    "type": type,
                                    "vlan_mode": vlanMode.toLowerCase()
                                }
                            else
                                jsonData = {
                                    "fb_ip": fb_ip,
                                    "is_dac": idDacreturn,
                                    "name": name,
                                    "speed": speed,
                                    "trunks": [parseInt(trunks)],
                                    "type": type,
                                    "vlan_mode": vlanMode.toLowerCase()
                                }

                            $
                                .ajax({
                                    url: postURL,
                                    method: 'POST',
                                    data: JSON.stringify(jsonData),
                                    contentType: "application/json; charset=utf-8",
                                    success: function(data) {
                                        var tr = $('<tr>')
                                        tr.append($('<td>').append(jsonData.name));
                                        tr.append($('<td>').append(jsonData.vlan_mode));
                                        tr.append($('<td>').append(jsonData.fb_ip));
                                        tr.append($('<td>').append(jsonData.type));
                                        tr.append($('<td>').append(jsonData.speed));
                                        tr.append($('<td>').append(jsonData.is_dac));
                                        $("#viewPort").find('tbody')
                                            .append(tr)
                                        handleSuccess(data);
                                    },
                                    error: function(data) {
                                        handleError(data);
                                    }
                                });
                            break;
                        case 'fbConfigController':
                            console
                                .log('fbConfigController');
                            var postURL = urlToSend +
                                fbName +
                                "/set-controller";

                            var name = $('#' +
                                formID +
                                ' #name')[0].value;
                            var controller_ip = $('#' +
                                formID +
                                ' #controller_ip')[0].value;
                            var of_port = $('#' +
                                formID +
                                ' #of_port')[0].value;
                            var protocols = $('#' +
                                formID +
                                ' #protocols')[0].value;
                            var fb_ip = $('#' +
                                formID +
                                ' #fb_ip')[0].value;

                            var jsonData = {
                                name: name,
                                controller_ip: controller_ip,
                                of_port: of_port,
                                connect_protocol: protocols,
                                fb_ip: fb_ip
                            };

                            $
                                .ajax({
                                    url: postURL,
                                    method: 'POST',
                                    data: JSON.stringify(jsonData),
                                    contentType: "application/json; charset=utf-8",
                                    success: function(data) {
                                        console
                                            .log("Success");

                                        $("div.alert-message-success").show();
                                    },
                                    error: function(data) {
                                        console
                                            .log("Error");

                                        $("div.alert-message-error").show();
                                    }
                                });
                            break;
                        case 'lldpConfigIL':
                            console
                                .log('lldpConfigIL');
                            http: //localhost:50512/rms/test/set-lldp
                                var postURL = urlToSend +
                                    fbName +
                                    "/set-lldp";
                            var fb_br = $('#' +
                                formID +
                                ' #fb_br')[0].value;
                            var fb_ip = $('#' +
                                formID +
                                ' #fb_ip')[0].value;
                            var per_interface_settings = $('#' +
                                formID +
                                ' #per_interface_settings')[0].value;

                            var jsonData = {
                                fb_br: fb_br,
                                fb_ip: fb_ip,
                                per_interface_settings: per_interface_settings
                            };

                            $
                                .ajax({
                                    url: postURL,
                                    method: 'POST',
                                    data: JSON.stringify(jsonData),
                                    contentType: "application/json; charset=utf-8",
                                    success: function(data) {
                                        console
                                            .log("Success");
                                        $("div.alert-message-success").show();
                                    },
                                    error: function(data) {
                                        console
                                            .log("Error");
                                        $("div.alert-message-error").show();
                                    }
                                });
                            break;
                        case 'configArp':
                            console
                                .log('configArp');
                            var postURL = urlToSend +
                                fbName +
                                "/configure/neighbor-discovery";
                            var arp_subnet = $('#' +
                                formID +
                                ' #arp_subnet')[0].value;
                            var nd_subnet = $('#' +
                                formID +
                                ' #nd_subnet')[0].value;

                            var jsonData = {
                                arp_subnet: arp_subnet,
                                nd_subnet: nd_subnet
                            };

                            $
                                .ajax({
                                    url: postURL,
                                    method: 'POST',
                                    data: jsonData,
                                    contentType: 'application/json',
                                    success: function() {
                                        console
                                            .log("Success");
                                    },
                                    error: function() {
                                        console
                                            .log("Error");
                                    }
                                });
                            break;
                        case 'configTcam':
                            console
                                .log('configTcam');
                            var postURL = urlToSend +
                                fbName +
                                "/configure/tcam";
                            var match_mode_name = $('#' +
                                formID +
                                ' #match_mode_name')[0].value;
                            var priority_low = $('#' +
                                formID +
                                ' #priority_low')[0].value;
                            var priority_high = $('#' +
                                formID +
                                ' #priority_high')[0].value;

                            var jsonData = {
                                match_mode_name: match_mode_name,
                                priority_low: priority_low,
                                priority_high: priority_high
                            };

                            $
                                .ajax({
                                    url: postURL,
                                    method: 'POST',
                                    data: jsonData,
                                    contentType: 'application/json',
                                    success: function() {
                                        console
                                            .log("Success");
                                    },
                                    error: function() {
                                        console
                                            .log("Error");
                                    }
                                });
                            break;
                    }
                })


        },
        init: function(node) {
            portController();
            var iconType = node.iconType();
            if (iconType == "optical-fiber") {
                $("#pageModal .modal-title").html("Configure Optical Switch")
            } else if (iconType == "fb-icon") {
                $("#pageModal .modal-title").html("Configure Forwarding Box")

            }
        },
        initLinkEvents: function(self) {
            var saveLink = properties.createLink;
            var linkData = {
                "destination": {
                    "dest-node": self
		                        .node()
		                        .id(),
                    "dest-tp": $("input[name='portselcted']:checked").next().text()
                },
                "link-cost":	$("#linkcost").val(),
                "link-group-id": [
									$("#linkGroupId").val(),

                ],
                "link-id": $("#linkId").val(),
                "link-validate": $("#linkValid").val(),
                "max-bandwidth": {
                    "unit": "GBPS",
                    "value":$("#max-bandwidth").val()
                },
                "source": {
                    "source-node": self
                        .topology().srclink.node,
                    "source-tp": self
		                .topology().srclink.data
                }
            };
if(!$("#linkId").val()){
	toastr.error("Enter link id");
	return;

}
            self
                .topology()
                .addLink({
                    source: self
                        .topology().srclink.node,
                    target: self
                        .node()
                        .id()

                });
								$.ajax({
							url: properties.createLink,
							type: 'post',
							data: JSON.stringify(linkData),
							contentType: "application/json; charset=utf-8",
							success: function (data) {
										toastr.success("Link is added successfully")
                    properties.addLink($("#linkId").val())
							}

})
            var postURL1 = urlToSend +
                self
                .topology().srclink.node + "/" + self
                .topology().srclink.data +
                "/false";
            var postURL2 = urlToSend +
                self
                .node()
                .id() + "/" + $("input[name='portselcted']:checked").next().text() +
                "/false";
            if (self
                .topology().srclink.iconType == "patch-panel" || self
                .topology().srclink == "optical-switch") {
                var socket = properties.socket();

                var patchupdate2 = {
                    "name": self
                        .topology().srclink.node,
                    "type": self
                        .topology().srclink.iconType,
                    "portname": self
                        .topology().srclink.data,
                    "status": "true"
                };
                socket.emit('port-status-set', JSON.stringify(patchupdate2));
            } else {
                $
                    .ajax({
                        url: postURL1,
                        method: 'POST',

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
                        .id(),
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
                        method: 'POST',

                        contentType: "application/json; charset=utf-8",
                        success: function(data) {
                            handleSuccess(data);
                        },
                        error: function(data) {
                            handleError(data)
                        }
                    });
            }
            self.topology().srclink = null;

            $('#pageModal ')
                .modal(
                    'hide')
        }

    }

});
