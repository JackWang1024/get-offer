var should = require('chai').should(),
    expect = require('chai').expect;

var app = require('./setup');

describe('Index Page', function() {
  it("renders successfully", function(done) {
    app.get('/').expect(200, done);    
  })
});