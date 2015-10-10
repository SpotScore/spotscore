var assert = require('assert');

describe('api', function() {
  describe('GET /object/123456', function(req ,res) {
    it('Should respond with information', function() {
	  assert.equal(true, res instanceof String);
      expect(200) 
    });
  });
});