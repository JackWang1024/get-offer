var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest');
 
var app = require('../server');
var api = supertest(app);

describe('Index Page', function() {
  it("renders successfully", function(done) {
    api.get('/').expect(200, done);    
  })
});