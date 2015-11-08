var pg = require('pg');
var Hapi = require('hapi');
var Good = require('good');

var conString = "postgres://spotscore:notsecret@localhost/gis";

var server = new Hapi.Server();

server.connection({ port: 3000 });


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
        var lon = request.query.lon;
        var lat = request.query.lat;
        var address = request.query.address;
        var categories = request.query.categories;
        var bbox = request.query.bbox;
        var radius = request.query.radius;
        var nearest = request.query.nearest;


        var query = "SELECT * FROM planet_osm_polygon pop WHERE pop.building = 'yes' AND ST_DWithin(Geography(ST_Transform(pop.way,4326)),ST_GeographyFromText('SRID=4326;POINT(" + lon + " " + lat + ")')," + radius +");";

        
        //this initializes a connection pool
        //it will keep idle connections open for a (configurable) 30 seconds
        //and set a limit of 20 (also configurable)
         pg.connect(conString, function(err, client, done) {
           if(err) {
             return console.error('error fetching client from pool', err);
           }
           client.query(query, function(err, result) {
             //call `done()` to release the client back to the pool
             done();
         
             if(err) {
               return console.error('error running query', err);
             }
             reply(result).type('application/json');
           });
         });

    }
});


server.start(function () {
  console.log('Server running at:', server.info.uri);
});


exports.server = server;
