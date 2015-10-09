var assert = require('assert');

describe('api', function() {
  describe('GET /information/123456', function(req ,res) {
    it('respond with a information', function() {
	  assert.equal(-1, res instanceof String);
      expect(200) 
    });
  });
});