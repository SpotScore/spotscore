var request = require('supertest')
  , hapi = require('hapi');

var app = new hapi.Server();
app.connection({ port: 80});

describe('GET /objects', function(){
  it('should return an array of objects inside the bbox"', function(done){
    request(app)
      .get('objects/?location=58.377787,26.7251047&?radius=30')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});