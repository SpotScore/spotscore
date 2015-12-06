var server = require("../app.js").server,
    should = require('chai').should(),
    Lab = require('lab'),
    lab = exports.lab = Lab.script();


lab.experiment('GET /objects', { timeout: 3000 }, function () {
  lab.test('response status code should equal 200 and contain utf-8 JSON', function (done) {
      server.inject({ method: 'GET', url: '/objects?lat=58.377787&lon=26.7251047&radius=10'}, function (res) {
		  res.statusCode.should.equal(200);
          res.headers['content-type'].should.equal('application/json; charset=utf-8');
		  res.raw['length'].should.not.equal(0);
          done();
        });
  });
});
