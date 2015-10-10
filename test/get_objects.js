var assert = require('assert');

describe('api', function() {
  describe('GET /objects/?location=(58.3776730,26.7305030)&?categories=A&?bbox=(26.7100950,58.3744820,26.7518250,58.3812240)', function(req ,res) {
    it('Should respond with array of objects', function() {
	  assert.equal(true, res instanceof Array);
      expect(200) 
    });
  });
});
