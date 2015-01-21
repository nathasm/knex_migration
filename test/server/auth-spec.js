var f = require('faker');
var bookshelf = require('../../server/config/bookshelf');

describe('Auth', function() {
  describe('API', function() {

    it('should pass', function(done) {
      supertest(app)
      .post(routes.apiBaseUrl + '/authentication/register')
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        res.status.should.equal(400);
        done();
      });
    });

  });
});
