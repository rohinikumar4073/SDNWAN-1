module.exports = {
    storeInDb: function(key, data) {
        var redis = require('redis');
        var client = redis.createClient();
        client.set(key, data, function(err, reply) {
            return "Done";
        });
    },

    fetchFromDb: function(cll, key, callback) {

        var redis = require('redis');
        var client = redis.createClient();
        var dat = "";
        client.get(key, function(err, object) {
            dat = "" + object;
            console.log("dat is " + dat);
            callback(object);
        });


    },


    storeInDbHash: function(key, data) {

        var redis = require('redis');
        var client = redis.createClient();


var data = JSON.stringify(data);
        console.log('key is ' + key);
        console.log('data is ' + data);
        client.hset("mappings",key, data, function(err, reply) {

            return "Done";
        });



    },

    storeasDbList:function(key,data,callback){
      var redis = require('redis'),
      client = redis.createClient();
    client.rpush(key,data, function(err, object) {
        callback(object);
    });

    },
    fetchFromDbHash: function(cll, key, callback) {

        var redis = require('redis');
        var client = redis.createClient();

        var dat = "";
        client.hget("mappings",key, function(err, object) {


            dat = "" + object;
            console.log("dat is " + dat);

            callback(object);
        });


    }






};
