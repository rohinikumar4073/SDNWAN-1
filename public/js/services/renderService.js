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
        var name = rowData.name;
        radioStatus[data] = {
          "status": status,
          "name": name
        }
      },

      setToggleStatus: function(data,rowData){
        if(!radioStatus[data]){
        initialiseRowData(rowData.name, data);
        }
        debugger;
        var status = event.target.checked;
        debugger;
        radioStatus[data].toggle = status;
      },
      pushData: function(fbname){

        radioStatus.forEach(function(v,i){
          if(v.toggle){
            postURL =  properties.rmsIp + fbname + "/port/edit/activate";
          }
          else {
            postURL =  properties.rmsIp + fbname + "/port/edit/deactivate";
          }
          var data = {
            "name": v.name,
            "is_dac": v.status? true: false
          }
          axios.post(postURL, data).then(function(response){
            console.log("Success");
          })
        })
      }

    }
})
