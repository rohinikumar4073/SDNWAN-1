var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(9090);

var redis = require('redis');
//var client = redis.createClient();
var client = redis.createClient(6379,"localhost");

var rdb = require('./DBinfo');
var comp = require('./components');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


io.on('connection', function(clientws) {

    clientws.on('fbtooptical', function(dat) {
      console.log(dat)
        rdb.fetchFromDbHash(client, dat.name + '_optical', function(data) {
            var links = "";



             if(data == "null" || data=="" || data==null){
              links = [];
              links.push(dat.link);
            } else {
              var dt = JSON.parse(data);

              console.log("data "+dt);
                var out = dt;
                links = out;
                links.push(dat.link);
            }
            rdb.storeInDbHash( dat.name + '_optical', links, function(err, data) {
                if (err) {
                    console.log(err);
                }

            });
        });

    });


    clientws.on('component-save', function(data) {
        var dat = JSON.parse(data);
        var portdetails;
        var type;

        if (dat.type == "patch-panel") {
            var portinfo = [];
            for (var i = 0; i < parseInt(dat.portsno); i++) {
                portinfo[i] = '{"name":"' + (i + 1) + '","status":"false"}';
            }
            portdetails = portinfo;
            type = "_patch";

        } else {
            type = "_optical";
            portdetails = '[{"name":"ALPHA-FB1:Shelf: 1   Slot: 1   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 2   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 3   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 4   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 5   Subslot: 1   Port: 1","status":"false"},{"name":"ALPHA-FB1:Shelf: 1   Slot: 6   Subslot: 1   Port: 1","status":"false"}]';
        }
        comp.storeComponent(client, dat.name + type, portdetails, function(data) {
            io.emit("component-status", "success");

        });
    });



    clientws.on('port-status-fetch', function(data) {

        var dat = JSON.parse(data);
        var type = "";
        if (dat.type == "patch-panel") {
            type = "_patch"
        } else {
            type = "_optical"
        }

        comp.fetchComponent(client, dat.name + type, function(data) {

            io.emit("port-status", data);

        });
    });


    clientws.on('port-status-set', function(data) {

        var dat = JSON.parse(data);
        var type = "";
        if (dat.type == "patch-panel") {
            type = "_patch"
        } else {
            type = "_optical"
        }

        comp.fetchComponent(client, dat.name + type, function(portinfo) {

            var ports = JSON.parse(portinfo);

            var j = 0;
            var newports = [];


            for (var k = 0; k < ports.length; k++) {
                //  console.log("portname is :"+dat.portname+"  objstatus is :"+ports[k]+"  datstatus is :"+dat.status);

                if (dat.portname == JSON.parse(ports[k]).name) {
                    newports[k] = '{"name":"' + dat.portname + '","status":"' + dat.status + '"}';
                } else {
                    newports[k] = '{"name":"' + JSON.parse(ports[k]).name + '","status":"' + JSON.parse(ports[k]).status + '"}';
                }

            }

            console.log("updated : " + newports);



            comp.setComponent(client, dat.name + type, newports, function(status) {

                console.log("status");

            });

        });
    });

});


module.exports = app;
