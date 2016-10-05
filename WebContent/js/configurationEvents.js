/**
 * 
 */
define(['jquery.spin'], function(){
	var portController=function(){
		$("input[name=vlan_mode]").click(function(){
			if($("input[name=vlan_mode]:checked").val()=="Trunk"){
				$("input[data-id=trunks]").parent().show()
				$("input[data-id=tag]").parent().hide()
			}else{
				$("input[data-id=tag]").parent().show()
				$("input[data-id=trunks]").parent().hide()

			}
		})
		
		
	}
	 return {
		 savingDetails:function(){


				var fbName = $('g.node-selected')
						.attr('data-id');

				$('#pageModal ')
						
						.on(
								'click',
								'button.saveBtn',
								function() {
									var formID =$('#pageModal div.tab-content .tab-pane.active')
									.attr(
									'id');

									switch (formID) {
									case 'fbConfig':
										console
												.log('fbConfig');
										var postURL = "http://localhost:50512/rms/"
												+ fbName
												+ "/add-bridge";
										var name = $('#'
												+ formID
												+ ' #name')[0].value;
										var datapath_type = $('#'
												+ formID
												+ ' #datapath_type')[0].value;
										var datapath_id = $('#'
												+ formID
												+ ' #datapath_id')[0].value;
										var protocols = $('#'
												+ formID
												+ ' #protocols')[0].value;
										var fb_ip = $('#'
												+ formID
												+ ' #fb_ip')[0].value;
										var jsonData = {
											name : name,
											datapath_type : datapath_type,
											datapath_id : datapath_id,
											protocols : protocols,
											fb_ip : fb_ip
										};

										var tableRowData = '<tr><td>'+name+'</td>'+
										'<td>'+datapath_type+'</td>'+
										'<td>'+datapath_id+'</td>'+
										'<td>'+protocols+'</td>'+
										'<td>'+fb_ip+'</td><tr>';

										$('#fbConfig #viewBridge table tbody').append(tableRowData);
									
										$('.spin').spin();
										$('.spin').spin('show');
										$
												.ajax({
													url : postURL,
													method : 'POST',
													data : JSON.stringify(jsonData),
										            contentType: "application/json; charset=utf-8",
													success : function(data) {
														console
																.log("Success");
														 $("div.alert-message-success").show();
															$('.spin').spin("hide");
													},
													error : function(data) {
														$('.spin').spin('hide');

														console
																.log("Error");
														$("div.alert-message-error").show();
														
													}
												});
										break;
									case 'fbConfigLink':
										console
												.log('fbConfigLink');
										var postURL = "http://114.8.11.251:50513/rms/"
												+ fbName
												+ "/add-bridge";
										var link_speed = $('#'
												+ formID
												+ ' #link_speed')[0].value;
										var jsonData = {
											link_speed : link_speed
										};

										$
												.ajax({
													url : postURL,
													method : 'POST',
													data : jsonData,
													contentType : 'application/json',
													success : function() {
														console
																.log("Success");
													},
													error : function() {
														console
																.log("Error");
													}
												});
										break;
									case 'addPort':
										console
												.log('addPort');
										var postURL = "http://localhost:50512/rms/"
												+ fbName
												+ "/port/add";
										var name = $(
												'#'
														+ formID)
												.find(
														'input[data-id="name"]')[0].value;
										// var
										// vlanMode
										// =
										// $('#'+formID).find('input[name="vlan_mode"]:checked').val();
										var vlanMode = $(
												'#'
														+ formID)
												.find(
														'input[name="vlan_mode"]:checked')
												.attr(
														'data-id');
										var fb_ip = $(
												'#'
														+ formID)
												.find(
														'input[data-id="fb_ip"]')[0].value;
										var type = $(
												'#'
														+ formID)
												.find(
														'input[data-id="type"]')[0].value;
										var speed = $(
												'#'
														+ formID)
												.find(
														'input[data-id="speed"]')[0].value;
										// var
										// isDac
										// =
										// $('#'+formID).find('input[name="is_dac"]:checked').val();
										var isDac = $(
												'#'
														+ formID)
												.find(
														'input[name="is_dac"]:checked')
												.attr(
														'data-id');

										var jsonData = {
											name : name,
											vlanMode : vlanMode,
											fb_ip : fb_ip,
											type : type,
											speed : speed,
											isDac : isDac
										};

										var tableRowData = '<tr><td>'+name+'</td>'+
										'<td>'+vlanMode+'</td>'+
										'<td>'+fb_ip+'</td>'+
										'<td>'+type+'</td>'+
										'<td>'+speed+'</td>'+
										'<td>'+isDac+'</td><tr>';

										$('#addPort #viewPort table tbody').append(tableRowData);

										$
												.ajax({
													url : postURL,
													method : 'POST',
													data : JSON.stringify(jsonData),
													contentType : "application/json; charset=utf-8",
													success : function(data) {
														console
																.log("Success");
														$("div.alert-message-success").show();
													},
													error : function(data) {
														console
																.log("Error");
														$("div.alert-message-error").show();
													}
												});
										break;
									case 'fbConfigController':
										console
												.log('fbConfigController');
										var postURL = "http://localhost:50512/rms/"
												+ fbName
												+ "/set-controller";
										
										var name = $('#'
												+ formID
												+ ' #name')[0].value;
										var controller_ip = $('#'
												+ formID
												+ ' #controller_ip')[0].value;
										var of_port = $('#'
												+ formID
												+ ' #of_port')[0].value;
										var protocols = $('#'
												+ formID
												+ ' #protocols')[0].value;
										var fb_ip = $('#'
												+ formID
												+ ' #fb_ip')[0].value;

										var jsonData = {
											name : name,
											controller_ip : controller_ip,
											of_port : of_port,
											connect_protocol : protocols,
											fb_ip : fb_ip
										};

										$
												.ajax({
													url : postURL,
													method : 'POST',
													data : JSON.stringify(jsonData),
													contentType : "application/json; charset=utf-8",
													success : function(data) {
														console
																.log("Success");
														
														$("div.alert-message-success").show();
													},
													error : function(data) {
														console
																.log("Error");
														
														$("div.alert-message-error").show();
													}
												});
										break;
									case 'lldpConfigIL':
										console
												.log('lldpConfigIL');
										http://localhost:50512/rms/test/set-lldp
										var postURL = "http://localhost:50512/rms/"
												+ fbName
												+ "/set-lldp";
										var fb_br = $('#'
												+ formID
												+ ' #fb_br')[0].value;
										var fb_ip = $('#'
												+ formID
												+ ' #fb_ip')[0].value;
										var per_interface_settings = $('#'
												+ formID
												+ ' #per_interface_settings')[0].value;

										var jsonData = {
											fb_br : fb_br,
											fb_ip : fb_ip,
											per_interface_settings : per_interface_settings
										};

										$
												.ajax({
													url : postURL,
													method : 'POST',
													data : JSON.stringify(jsonData),
													contentType : "application/json; charset=utf-8",
													success : function(data) {
														console
																.log("Success");
														$("div.alert-message-success").show();
													},
													error : function(data) {
														console
																.log("Error");
														$("div.alert-message-error").show();
													}
												});
										break;
									case 'configArp':
										console
												.log('configArp');
										var postURL = "http://114.8.11.251:50513/rms/"
												+ fbName
												+ "/configure/neighbor-discovery";
										var arp_subnet = $('#'
												+ formID
												+ ' #arp_subnet')[0].value;
										var nd_subnet = $('#'
												+ formID
												+ ' #nd_subnet')[0].value;

										var jsonData = {
											arp_subnet : arp_subnet,
											nd_subnet : nd_subnet
										};

										$
												.ajax({
													url : postURL,
													method : 'POST',
													data : jsonData,
													contentType : 'application/json',
													success : function() {
														console
																.log("Success");
													},
													error : function() {
														console
																.log("Error");
													}
												});
										break;
									case 'configTcam':
										console
												.log('configTcam');
										var postURL = "http://114.8.11.251:50513/rms/"
												+ fbName
												+ "/configure/tcam";
										var match_mode_name = $('#'
												+ formID
												+ ' #match_mode_name')[0].value;
										var priority_low = $('#'
												+ formID
												+ ' #priority_low')[0].value;
										var priority_high = $('#'
												+ formID
												+ ' #priority_high')[0].value;

										var jsonData = {
											match_mode_name : match_mode_name,
											priority_low : priority_low,
											priority_high : priority_high
										};

										$
												.ajax({
													url : postURL,
													method : 'POST',
													data : jsonData,
													contentType : 'application/json',
													success : function() {
														console
																.log("Success");
													},
													error : function() {
														console
																.log("Error");
													}
												});
										break;
									}
								})
			
			
		 },
		 init:function(node){
	        	portController();
				var iconType=node.iconType();
				if(iconType=="optical-fiber"){
					$("#pageModal .modal-title").html("Configure Optical Switch")
				}else if(iconType=="fb-icon"){
					$("#pageModal .modal-title").html("Configure Forwarding Box")

				}
	        }
	     
	 }
	
});