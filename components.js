module.exports = {

storeasDbList: function(client, key, data, callback) {

  client.rpush(key,JSON.stringify(data), function(err, object) {
      callback(object);
  });
},
    storeComponent: function(client, key, data, callback) {


        client.set(key, JSON.stringify(data), function(err, reply) {

            callback(err, reply);
        });
    },

    deleteComponent: function(client, key,callback) {

        client.del(key, function(err, reply) {

            callback(err, reply);

        })
    },
    fetchComponent: function(client, key, callback) {

        client.get(key, function(err, object) {

            callback(object);
        });
    },

    getList: function(client, key, callback) {

        client.lrange(key, -100 ,100,function(err, object) {

            callback(object);
        });
    },
    setComponent: function(client, key, data, callback) {

        client.set(key, JSON.stringify(data), function(err, reply) {

            callback(err, reply);
        });

    },



};
