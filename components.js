module.exports = {

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

    setComponent: function(client, key, data, callback) {

        client.set(key, JSON.stringify(data), function(err, reply) {

            callback(err, reply);
        });

    },



};
