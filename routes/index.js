var express = require('express');
var router = express.Router();
/* GET home page. */


router.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

/* GET home page. */
router.post('/getPortStatus', function(req, res, next) {

    var dat = req.body;
    var type = "";
    if (dat.type == "patch-panel") {
        type = "_patchPorts"
    } else if (dat.type == "optical-switch") {
        type = "_opticalPorts"
    } else if (dat.type == "host") {
        type = "_hostPorts"
    }else if (dat.type == "bgp") {
        type = "_bgpPorts";
        //portdetails = '[{"name":"ALPHA-FB1:Shelf: 1   Slot: 1   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 2   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 3   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 4   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 5   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 6   Subslot: 1   Port: 1","status":"false"}]';
    }

    router.comp.fetchComponent(router.client, dat.name + type, function(data) {
        console.log("response")
        res.send(data);

    });
});
/* GET home page. */
router.post('/saveList', function(req, res, next) {

    var data = req.body;

    router.comp.storeasDbList(router.client, data.key, data.value, function(data) {
        res.send("success");

    });
});

router.get('/getList', function(req, res, next) {

      if (!req.query.key) {
          res.type('text/plain');
          res.status(404);
          res.send('404 Not Found');
          return;
      }
    router.comp.getList(router.client, req.query.key,  function(data) {
      if (data){
          var dataToBeSend = data.map(function(x) {
             return JSON.parse(x)
          });
          res.send(dataToBeSend);
      }else {
          res.send([])
      }
    });
});
router.post('/saveComponent', function(req, res, next) {

    var dat = req.body;
    var portdetails;
    var type;
    if (dat.type == "patch-panel") {
        var portinfo = [];
        for (var i = 0; i < parseInt(dat.portsno); i++) {
            portinfo[i] = '{"name":"' + (i + 1) + '","status":"false"}';
        }
        portdetails = portinfo;
        type = "_patchPorts";

    } else if (dat.type == "host") {
        type = "_hostPorts";
        //portdetails = '[{"name":"ALPHA-FB1:Shelf: 1   Slot: 1   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 2   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 3   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 4   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 5   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 6   Subslot: 1   Port: 1","status":"false"}]';
        portdetails = JSON.stringify(dat.ports);
    } else if (dat.type == "optical-switch") {
        type = "_opticalPorts";
        //portdetails = '[{"name":"ALPHA-FB1:Shelf: 1   Slot: 1   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 2   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 3   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 4   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 5   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 6   Subslot: 1   Port: 1","status":"false"}]';
        portdetails = JSON.stringify(dat.ports);
    } else if (dat.type == "bgp") {
        type = "_bgpPorts";
        //portdetails = '[{"name":"ALPHA-FB1:Shelf: 1   Slot: 1   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 2   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 3   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 4   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 5   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 6   Subslot: 1   Port: 1","status":"false"}]';
        portdetails = JSON.stringify(dat.ports);
    }
    router.comp.storeComponent(router.client, dat.name + type, portdetails, function(data) {
        res.send("success");

    });
});

router.post('/deleteNode', function(req, res, next){
  var body = req.body;
  if(body.type == 'optical-switch'){
    key = body.name + "_opticalData";
  }
  else if (body.type == 'fb-icon') {
    key = body.name + "_forwardingData";
  }
  else if (body.type == 'host')  {
    key = body.name + "_host";
  }else if (body.type == 'host')  {
    key = body.name + "_bgp";
  }

  router.comp.deleteComponent(router.client, key, function(data){
    res.send("success")
  });
})
router.post('/saveTopology', function(req, res, next) {

    var dat = req.body;

    router.comp.storeComponent(router.client, "topologyData", dat, function(data) {
        res.send("success");

    });
    //var dat = JSON.parse(req.data);
});
router.post('/saveKey', function(req, res, next) {
    var body = req.body;

    router.comp.storeComponent(router.client, body.key, body.value, function(data) {
        res.send("success");

    });
    //var dat = JSON.parse(req.data);
});
router.get('/getTopology', function(req, res, next) {
    router.comp.fetchComponent(router.client, "topologyData", function(data) {
      debugger;
        //console.log("data"+data)
        if(data)
        res.send(data);
        else {
          res.send('{"nodes":[],"links":[]}')
        }
    });
});

router.get('/getKey', function(req, res, next) {

    if (!req.query.key) {
        res.type('text/plain');
        res.status(404);
        res.send('404 Not Found');
        return;
    }
    router.comp.fetchComponent(router.client, req.query.key, function(data) {
        //console.log("data"+data)
        if (data)
            res.send(data);
        else {
            res.send("0")
        }
    });
});
module.exports = router;
