var pg = require('pg');
var Hapi = require('hapi');

var server = new Hapi.Server();


server.connection({ port: 3000 });

server.start(function () {
      console.log('Server running at:', server.info.uri);
});


server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply('Hello from SpotScore API!');
        }
});


server.route({
    method: 'GET',
    path: '/objects',
    handler: function (request, reply) {
        var location = request.params.location;
        var address = request.params.address;
        var categories = request.params.categories;
        var bbox = request.params.bbox;
        var radius = request.params.radius;
        var nearest = request.params.nearest;

        // Make actual request to database

        // Compile the JSON response

        reply();
    }
});
