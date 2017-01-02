module.exports = {

    storeComponent: function(client, key, data) {


        client.set(key, JSON.stringify(data), function(err, reply) {

            return "Done";
        });
    },


    fetchComponent: function(client, key, callback) {

      client.get(key, function(err, object) {

            callback(object);
        });
    },


    setComponent: function(client, key, data) {

        client.set(key, JSON.stringify(data), function(err, reply) {

            return "Done";
        });

    },



};
