define(['axios', 'properties'], function(axios, properties) {
  var radioStatus = [];
  var postURL;
  var initialiseRowData = function(name,data){
    radioStatus[data] = {
      "name": name
    }
  };
    return {
      getRadioStatus: function(){
        return radioStatus;
      },
      setRadioStatus: function(data,rowData,status){
        if(!radioStatus[data]){
          initialiseRowData(rowData.name, data);
        }
        //rowData.is_dac = status;
        var name = rowData.name;
        radioStatus[data] = {
          "status": status,
          "name": name
        }
      },

      setToggleStatus: function(data,rowData,value){
        if(!radioStatus[data]){
        initialiseRowData(rowData.name, data);
        }
        var status = value;
        if(status == true){
          radioStatus[data].toggle = "activate";
        }
        else if(status == false) {
          radioStatus[data].toggle = "deactivate";
        }
        debugger;
      },

    }
})
