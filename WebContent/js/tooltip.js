define(
		[ 'linkMode', 'bootstrap' ],
		function(linkMode) {
			(function(nx) {
				// node tooltip class
				// see nx.graphic.Topology.Node reference to learn what node's
				// properties you're able to use
				nx
						.define(
								'TooltipNode',
								nx.ui.Component,
								{
									properties : {
										'node' : {}, // NeXt automatically
														// provides you the
														// access to the
														// selected
														// nx.graphic.Topology.Node
														// instance
										'topology' : {}, // NeXt also
															// provides you the
															// access to the
															// topology object
										'newNodeName' : '',
										'classNameConfig' : function() {
											if (linkMode.getFlag())
												return "popup-section linkhide ";
											else {
												return "popup-section "
											}
										},
										'classNamePort' : function() {
											if (linkMode.getFlag())
												return "popup-section  ";
											else {
												return "popup-section linkhide "
											}
										},
									},

									// 'view' defines the appearance of the
									// tooltip
									view : {
										content : {
											content : [
													{
														tag : 'div',
														props : {
															'class' : '{#classNameConfig}'
														},
														events : {
															'click' : '{#onClickEvent}'
														},
														content : [
																{
																	tag : "i",
																	props : {
																		'class' : "fa fa-cog",
																		'aria-hidden' : "true"
																	}
																},
																{
																	tag : "div",
																	content : "Config",
																	props : {
																		'class' : "label-data"
																	}
																}

														]
													},
													{
														tag : 'div',
														props : {
															'class' : '{#classNamePort}'
														},
														content : [ {
															tag : 'div',

															content : [
																	{
																		tag : "input",
																		props : {
																			'type' : "radio",
																			'name' : "portselcted"
																		},
																		events : {
																			'click' : '{#onClickEvent2}'
																		},
																	},
																	{
																		tag : "div",
																		content : "12345",
																		props : {
																			'class' : "label-data"
																		}
																	} ]

														}

														]
													}

											],
											// applies to the whole tooltip box
											props : {
												// css class; see
												// ./css/custom.css
												'class' : 'custom-tooltip'
											}
										}
									},
									methods : {

										"onClickEvent" : function() {

											var fbName = $('g.node-selected')
													.attr('data-id');
											$("#pageModal")
													.load(
															"templates/tab.html",
															function() {
																$('#pageModal ')
																		.modal(
																				'show')
																		.on(
																				'click',
																				'button.saveBtn',
																				function() {
																					var formID = $(
																							$('div.tabs-left div.tab-content .tab-pane.active'))
																							.attr(
																									'id');

																					switch (formID) {
																					case 'fbConfig':
																						console
																								.log('fbConfig');
																						var postURL = "http://114.8.11.251:50513/rms/"
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
																						var postURL = "http://114.8.11.251:50513/rms/"
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
																					case 'fbConfigController':
																						console
																								.log('fbConfigController');
																						var postURL = "http://114.8.11.251:50513/rms/"
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
																							protocols : protocols,
																							fb_ip : fb_ip
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
																					case 'lldpConfigIL':
																						console
																								.log('lldpConfigIL');
																						var postURL = "http://114.8.11.251:50513/rms/"
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
															});
										},
										"onClickEvent2" : function() {
											if (!this.topology().srclink) {
												this.topology().srclink = this
														.node().id();
											} else {
												this
														.topology()
														.addLink(
																{
																	source : this
																			.topology().srclink,
																	target : this
																			.node()
																			.id()
																});
												this.topology().srclink = "";
												linkMode.setFlag(false);

											}

										},
										"modalEvent" : function() {

											$('#myModal').modal('show');

										},
										//
										'onRemoveNode' : function() {
											// get a selected node's id and pass it to removeNode() of topology instance
											this.topology().removeNode(
													this.node().id());
										},
										// what happens when you hit 'Save' button
										'onSaveName' : function() {
											// get current node's instance and access its label value. when pass something inside, NeXt consider
											// you set new value
											this.node().label(
													this.newNodeName());
										}
									}
								});
				// link tooltip class
				// see nx.graphic.Topology.Link reference to learn what link's properties you're able to use
				nx.define('TooltipLink', nx.ui.Component, {
					properties : {
						link : {},
						topology : {}
					},
					view : {
						content : {
							content : [ {
								tag : 'h1',
								content : [ {
									tag : 'span',
									content : 'Link #'
								}, {
									tag : 'span',
									content : '{#link.id}'
								} ]
							}, {
								tag : 'div',
								content : [ {
									tag : 'span',
									content : 'From: ',
									props : {
										'class' : 'bold-text'
									}
								}, {
									tag : 'span',
									// we access link's model to show a source node's name
									content : '{#link.model.source.name}'
								} ]
							}, {
								tag : 'div',
								content : [ {
									tag : 'span',
									content : 'To: ',
									props : {
										'class' : 'bold-text'
									}
								}, {
									tag : 'span',
									// we access link's model to show a target node's name
									content : '{#link.model.target.name}'
								} ]
							} ],
							props : {
								'class' : 'custom-tooltip'
							}
						}
					}
				});
			})(nx);
		});