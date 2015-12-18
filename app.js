"use strict";

let pg = require("pg");
let Hapi = require("hapi");

let conString = "postgres://spotscore:notsecret@localhost:5430/gis";

let server = new Hapi.Server();

server.connection({
    port: 3000
});

server.start(function() {
    console.log("Server running at:", server.info.uri);
});

module.exports.server = server;

server.route({
    method: "GET",
    path: "/",
    handler: function(request, reply) {
      
    }
});

server.route({
	method: "GET",
    path: "/categories",
    handler: function(request, reply) {
       var categories = request.query;
	   var categoriesLength = Object.keys(categories).length;
	   var categoriesKeys = Object.keys(categories);
	   var selectQuery = "SELECT * FROM planet_osm_polygon pop WHERE ";
	   	   
	   for(var key in categories) {
		  selectQuery += "pop." + key + " = '" + categories[key] + "' AND ";
	   }
	   
	   var lastIndexOfAnd = selectQuery.lastIndexOf("AND");
	   
	   selectQuery = selectQuery.substring(0, lastIndexOfAnd);
	   
	   var client = new pg.Client(conString);
	   client.connect();
	   
	   pg.connect(conString, function(err, client, done) {
		
			if(err) {
				return console.error('error fetching client from pool', err);
			}
			client.query(selectQuery, [], function(err, result) {
			done();

			if(err) {
			  return console.error('error running query', err);
			}
			reply(result.rows);
		  });
		});
	   
    }
});

server.route({
	method: "GET",
	path: "/object/{id}",
    handler: function(request, reply) {
        var objectId = encodeURIComponent(request.params.id);
			
		var client = new pg.Client(conString);
		client.connect();
		
		var query1 = "SELECT ST_AsGeoJSON(pop.way) FROM planet_osm_polygon pop WHERE pop.osm_id = $1"
		
		pg.connect(conString, function(err, client, done) {
		
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(query1, [objectId], function(err, result) {
		done();

		if(err) {
		  return console.error('error running query', err);
		}
		reply(result.rows[0].st_asgeojson);
		  });
		});
    }
});

server.route({
    method: 'GET',
    path: '/objects',
    handler: function (request, reply) {
        var radius = request.query.radius;
        var nearest = request.query.nearest;
		var limit = request.query.limit;
		var numOfNearest = request.query.numOfNearest;
		var categoriesCount = 0;

		var client = new pg.Client(conString);
		client.connect();
		
		var selectQuery = "SELECT pop.osm_id, ST_GeometryType(pop.way), ";
		
		if(request.query.categories !== undefined) {
			
			var categories = request.query.categories.split(',');
		
			for(var i = 0; i < categories.length; i++) {
				if(i % 2 == 0) {
					selectQuery += "pop." + categories[i] + ", "
				}
			}
			var lastIndexOfAnd = selectQuery.lastIndexOf(",");
			selectQuery = selectQuery.substring(0, lastIndexOfAnd);
			selectQuery += " "
			
			selectQuery += "FROM planet_osm_polygon pop WHERE ";
			
			for(var i = 0; i < categories.length; i++) {
				if(i % 2 == 0) {
					selectQuery += "pop." + categories[i] + " = ";
				}
				else {
					selectQuery += " '" + categories[i] + "' AND ";
				}
			}
			categoriesCount += 1;
			//reply(categoriesCount);
		}
		else {
			
			
			var lastIndexOfComma = selectQuery.lastIndexOf(",");
			
			selectQuery = selectQuery.substring(0, lastIndexOfComma);
			
			selectQuery += " FROM planet_osm_polygon pop ";
		}
		
		//reply(selectQuery);
		
		if(request.query.location === undefined) {
			
			if(query.bbox === undefined) {
				return false;
			}
			
			var bbox = request.query.bbox.split(',');
			
			var bboxArgument = "";
			
			for(var box in bbox) {
				bboxArgument += bbox[box] + ", "
			}
					
			var bboxQuery = " WHERE ST_Within(ST_Transform(pop.way,4326), ST_MakeEnvelope("+bboxArgument+" 4326)) LIMIT " + limit;
			
			//reply(selectQuery + bboxQuery);
			
			pg.connect(conString, function(err, client, done) {
				if(err) {
					return console.error('error fetching client from pool', err);
				}
				
					client.query(selectQuery + bboxQuery, [], function(err, result) {
					done();

					if(err) {
					  return console.error('error running query', err);
					}
					reply(result.rows);

					});
				});
		}
		else if(request.query.bbox === undefined) {
			var location = request.query.location.split(',');
			
			var query2 = "WHERE ST_DWithin(Geography(ST_Transform(pop.way,4326)),ST_GeographyFromText('SRID=4326;POINT(" + location[0] + " " + location[1] + ")')," +radius+ ") LIMIT " + limit;
			var query1 = "ORDER BY pop.way <-> st_setsrid(ST_Buffer(ST_MakePoint(" + location[0] + ", " + location[1] + "), " +radius+ "), 4326) LIMIT "  + limit;
			
			if(nearest == 'yes')  {
				
				pg.connect(conString, function(err, client, done) {
					if(err) {
						return console.error('error fetching client from pool', err);
					}
					if(categoriesCount == 1) {
						selectQuery = selectQuery.replace('AND', '');
					}
					
					//reply(selectQuery + query1);
					
					client.query(selectQuery + query1, [], function(err, result) {
					done();

					if(err) {
					  return console.error('error running query', err);
					}
					reply(result.rows);

					});
				});
				
			}
			else if(nearest == 'no') {
					
					pg.connect(conString, function(err, client, done) {
					if(err) {
						return console.error('error fetching client from pool', err);
					}
					
					if(categoriesCount == 1) {
						//reply(categoriesCount);
						query2 = query2.replace('WHERE', '');
					}
					//reply(selectQuery + query2);
					
					client.query(selectQuery + query2, [], function(err, result) {
					done();

					if(err) {
					  return console.error('error running query', err);
					}
					reply(result.rows);
					});
				});
			}
		}
	

	}
});