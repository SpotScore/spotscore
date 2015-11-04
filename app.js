var pg = require('pg');
var Hapi = require('hapi');

var conString = "postgres://spotscore:notsecret@localhost/gis";



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

        var query = "SELECT * FROM planet_osm_polygon pop WHERE pop.building = 'yes' AND ST_DWithin(Geography(ST_Transform(pop.way,4326)),ST_GeographyFromText('SRID=4326;POINT(26.74010 58.39770)'),200);";

        // Make actual request to database
        
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
            reply(result.rows[0]);
          });
        });

    }
});
