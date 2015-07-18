var should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest');

var app = require('../server');
var api = supertest(app);

describe('Reply API', function() {
  it("gets preparation node successfully", function(done) {
    api
      .get('/api/node/preparation')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('topics');
        expect(res.body.topics).to.be.a('array');
        if (err) return done(err);
        return done();
      });
  });

  it("gets process node successfully", function(done) {
    api
      .get('/api/node/process')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('topics');
        expect(res.body.topics).to.be.a('array');
        if (err) return done(err);
        return done();
      });
  });

  it("gets wait node successfully", function(done) {
    api
      .get('/api/node/wait')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('topics');
        expect(res.body.topics).to.be.a('array');
        if (err) return done(err);
        return done();
      });
  });

  it("gets experience node successfully", function(done) {
    api
      .get('/api/node/experience')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('topics');
        expect(res.body.topics).to.be.a('array');
        if (err) return done(err);
        return done();
      });
  });

  it("gets gossip node successfully", function(done) {
    api
      .get('/api/node/gossip')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('topics');
        expect(res.body.topics).to.be.a('array');
        if (err) return done(err);
        return done();
      });
  });
});