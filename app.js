"use strict";

let pg = require('pg');
let Hapi = require('hapi');

let conString = "postgres://spotscore:notsecret@localhost/gis";

let server = new Hapi.Server();

server.connection({
    port: 3000
});

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply('Hello from SpotScore API!');
    }
});

server.route({
    method: 'GET',
    path: '/objects',
    handler: function(request, reply) {

        let lon = request.query.lon;
        let lat = request.query.lat;
        let address = request.query.address;
        let categories = request.query.categories;
        let bbox = request.query.bbox;
        let radius = request.query.radius;
        let nearest = request.query.nearest;

        let template_query_1 =
            `SELECT
              *
            FROM planet_osm_polygon pop
            WHERE pop.building = 'yes'
            AND
            ST_DWithin(Geography(ST_Transform(pop.way,4326)),
            ST_GeographyFromText('SRID=4326;POINT(${lon} ${lat})'), $1);`

        //this initializes a connection pool
        //it will keep idle connections open for a (configurable) 30 seconds
        //and set a limit of 20 (also configurable)
        pg.connect(conString, function(err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
            client.query({name:"prepared_1", text:template_query_1, values:[radius]},
                function(err, result) {
                    //call `done()` to release the client back to the pool
                    done();

                    if (err) {
                        return console.error('error running query', err);
                    }
                    reply(result).type('application/json');
                });
        });

    }
});


server.start(function() {
    console.log('Server running at:', server.info.uri);
});

module.exports.server = server;
