define(['axios', 'properties'], function(axios, properties) {
    return {
        saveLog: function(data) {
            axios.post(properties.saveLog, data).then(function(response) {
                    console.log("Log saved");
                })
                .catch(function(error) {
                    console.log("Log not saved");
                });
        },
        convertHostDatatoPorts: function(data) {
            var portData = {
                name: data["host_name"],
                ports: [],
                type: "host"
            };
            data["interfaces"].forEach(function(v, i) {
                portData.ports.push({
                    name: v["host_port_name"],
                    status: "false"
                })
            })
            return portData;
        },
        convertOpticalPorttoStrings: function(listOfPorts, name) {
            var portsStringArr = [];
            if (listOfPorts) {
                listOfPorts.forEach(function(v, i) {
                    var portData = name + ":" + "Shelf: " + v.shelf + " Slot: " + v.slot + " Subslot: " + v.subSlot + " Port: " + v.port;
                    if (portsStringArr.indexOf(portData) == -1) {
                        portsStringArr.push({
                            name: portData,
                            status: "false"
                        })
                    }
                })
            }
            return portsStringArr;
        }

    }
})
