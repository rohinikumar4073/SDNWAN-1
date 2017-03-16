define([
    'react',
    'jquery',
    'properties',
    'toastr',
    'react-jsonschema-form',
    'axios'
], function(React, $, properties, toastr, Form, axios) {
    var DynamicBandwidth = Form.default;
    var Name = [];
    var switchA = [];
    var numOfPorts;
    var switchId = 0;
    var threshId = 0;
    var switchInfo;
    var thresholdInfo;
    var CreateDynamicBandwidth = React.createClass({
        getInitialState: function() {
            return {}
        },
        componentDidMount: function() {
          var that = this;
          var getSwitchURL = properties.orchestratorIp +"/getSwitches";
          var getThresholdURL = properties.orchestratorIp +"/getThreshold";
                  var getURL = properties.getNativeTopologyData;
                  axios.get(getURL).then(function(response) {
                      var switchData = response.data;
                      switchData.nodes.forEach(function(v, i) {
                          if (v.iconType == "optical-switch") {
                              Name.push(v.label);
                          }
                      })
                      var name = $("#switchName"+switchId);
                      name.append($("<option selected disabled>Choose here</option>"));
                      Name.forEach(function(v, i) {
                      name.append($("<option />").val(v).text(v));
                      axios.get(getSwitchURL).then(function(response){
                        switchInfo = response.data;
                        switchInfo.switch.forEach(function(v, i){
                          $("#switchName"+switchId).val(v["switch-id"]);
                          getPorts(v["switch-id"])
                        })
                      })
                      })
                  })

            $(".switchName").on('change', function(){
              var index = $( ".switchName" ).index( this );
              that.getPorts(this.value,index);
            })
        },
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },
        getPorts: function(value,property) {
          debugger;
            $(".portNames"+property).html('');
            var portName = [];
            var name = value+"_opticalData";
            var keyURL = properties.nodeIp + "/getKey?key=" + name;
            axios.get(keyURL).then(function(response) {
                var ports = response.data;
                ports.ports.forEach(function(v, i) {
                    portName.push(v.name);
                })
                switchA[value] = ports.ports.length;
                debugger;
                var portDiv = $(".portNames"+property);
                portName.forEach(function(v, i) {
                    $('<input />', {
                        type: 'checkbox',
                        id: value+ 'cb' + i,
                        class: 'form-control checkB',
                        value: v
                    }).appendTo(portDiv);
                    $('<label />', {
                        'for': 'cb' + i,
                        text: v
                    }).appendTo(portDiv);
                })
                portName = [];
            })

        },
        handleConfirm: function(data) {
            var linkArray = [];
            var addThreshArray = [];
            var dropThreshArray = [];
            var switches = [];
            for(var i = 0; i <= switchId; i++){
              var opticalSwitch = {};
              opticalSwitch.ports = [];
              opticalSwitch["switch-id"] = $("#switchName"+i).val();
              var switchNa = $("#switchName"+i).val();
              for (var j = 0; j < switchA[switchNa]; j++){
                if ($("#"+switchNa+"cb"+j).is(':checked')){
                  opticalSwitch.ports.push($("#"+switchNa+"cb"+j).val());
                }
              }
              switches.push(opticalSwitch);
            }
            var finalData = {
              "switch": switches
            };
            var allocationProperty = $("#allocationProperty").val();
            var thresholdSwitch = {};
            thresholdSwitch["allocation-priority"] = $("#allocationProperty").val();
            thresholdSwitch.threshold = [];
            for(var i = 0; i <= threshId; i++){
              var thresholdData = {
                "add-thresh": parseInt($("#addThresh"+i).val()),
                "drop-thresh": parseInt($("#dropThresh"+i).val()),
                "link-count": parseInt($("#linkCount"+i).val())
              };
              thresholdSwitch.threshold.push(thresholdData);
            }
            debugger;
            var urlForSwitch = properties.orchestratorIp+"/createSwitches";
            var urlForthreshold = properties.orchestratorIp+"/createThreshold";
            axios.all([
              axios.post(urlForSwitch, finalData),
              axios.post(urlForthreshold, thresholdSwitch)
            ])
            .then(axios.spread(function(response){
              toastr.success("Successfully completed the configuration");
            }))

        },
        handleCancel:function(){
          this.props.setHidden("dynamicBandwidthGlobal");
        },
        addDiv: function(e){
          var that = this;
          if(e.currentTarget.className == "btn btn-default btn-sm switchAdd"){
            switchId++;
            $(".switchData").append('<div class="form-group col-sm-10"><label for="switchName' +switchId+ '">Switch ID:</label><select name="switch" id="switchName' +switchId+ '"class="form-control switchName"><option selected disabled>Choose here</option></select></div><div class="form-group col-sm-10"><label for="portNames">Ports:</label><div class="portNames' +switchId+ '"></div></div>');
            var name = $("#switchName"+switchId);
            Name.forEach(function(v, i) {
                name.append($("<option />").val(v).text(v));
            })
            $(".switchName").on('change', function(){
              var index = $( ".switchName" ).index(this);
              that.getPorts(this.value,index);
            })
          }
          else if(e.currentTarget.className == "btn btn-default btn-sm threshAdd"){
            threshId++;
            $(".threshData").append('<div class="form-group col-sm-10"><label for="linkCount">Link Count:</label><input type="text" id="linkCount'+threshId+'" class="form-control"></input></div><div class="form-group col-sm-10"><label for="addThresh">Add Threshold:</label><input type="text" id="addThresh'+threshId+'" class="form-control"></input></div><div class="form-group col-sm-10"><label for="dropThresh">Drop Threshold:</label><input type="text" id="dropThresh'+threshId+'" class="form-control"></input></div>');
          }
        },
        render: function() {
            return (
                <div className={this.props.className}>
                  <div className="modal-header">
                      <h3>{this.props.header}<button type="button" className="close" onClick={this.handleCancel}>
                          &times;
                      </button></h3>

                  </div>
                    <div className="configuration">
                        <form className="globalConfig">
                            <div className="accordion">
                                <div className="panel-heading">
                                    <h4 className="panel-title col-sm-10">
                                        <a data-toggle="collapse" href="#switch" aria-expanded="true">Switches</a>
                                    </h4>
                                </div>
                                <div id="switch">
                                  <div className="form-group col-sm-10">
                                    <p className="plus">
                                      <button type="button" onClick={this.addDiv} className="btn btn-default btn-sm switchAdd">
                                          <span className="glyphicon glyphicon-plus"></span> Plus
                                      </button>
                                    </p>
                                  </div>
                                  <div className = "switchData">
                                    <div className="form-group col-sm-10">
                                        <label for="switchname">Switch ID:</label>
                                        <select name="switch" id={"switchName"+switchId} className="form-control switchName"></select>
                                    </div>
                                    <div className="form-group col-sm-10">
                                        <label for="portNames">Ports:</label>
                                        <div className={"portNames"+switchId}></div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                            <div className="accordion" id="settings">
                                <div className="panel-heading">
                                    <h4 className="panel-title col-sm-10">
                                        <a data-toggle="collapse" href="#threshold" aria-expanded="true">Threshold Settings</a>
                                    </h4>
                                </div>
                                <div id="threshold">
                                    <div className="form-group col-sm-10">
                                        <label for="allocationProperty">Allocation Priority:</label>
                                        <input type="text" id="allocationProperty" value="greedy" className="form-control"></input>
                                    </div>
                                    <div id="threshFields">
                                      <div className="form-group col-sm-10">
                                        <p className="plus">
                                          <button type="button" onClick={this.addDiv} className="btn btn-default btn-sm threshAdd">
                                              <span className="glyphicon glyphicon-plus"></span> Plus
                                          </button>
                                        </p>
                                      </div>
                                      <div className="threshData">
                                        <div className="form-group col-sm-10">
                                            <label for="linkCount">Link Count:</label>
                                            <input type="text" id={"linkCount"+threshId} className="form-control"></input>
                                        </div>
                                        <div className="form-group col-sm-10">
                                            <label for="addThresh">Add Threshold:</label>
                                            <input type="text" id={"addThresh"+threshId} className="form-control"></input>
                                        </div>
                                        <div className="form-group col-sm-10">
                                            <label for="dropThresh">Drop Threshold:</label>
                                            <input type="text" id={"dropThresh"+threshId} className="form-control"></input>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                            <div className = "form-group col-sm-10">
                              <button type="button" onClick={this.onSubmit} className="btn  btn-primary btn-sm" data="Save">Save</button>
                                <button onClick={this.handleCancel} type="button" className={"btn btn-sm btn-default"+this.props.buttonClassName}
                                data="Cancel">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>

            )
        }
    });
    return CreateDynamicBandwidth;
});
