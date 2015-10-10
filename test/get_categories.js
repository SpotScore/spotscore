var assert = require('assert');

describe('api', function() {
  describe('GET /categories/?query=bussijaam', function(req ,res) {
    it('Should respond with array of categories', function() {
	  assert.equal(True, res instanceof Array);
      expect(200) 
    });
  });
});
