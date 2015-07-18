var should = require('chai').should(),
  expect = require('chai').expect;

var api = require('./setup');

function testNode(res, node_name) {
  expect(res.body).to.have.property('topics');
  expect(res.body.topics).to.be.a('array');
  var topics = res.body.topics;
  if (topics.length > 0) {
    for (var i = 0; i < topics.length; ++i) {
      expect(topics[i]).to.have.property('title');
      expect(topics[i]).to.have.property('content');
      expect(topics[i]).to.have.property('user_name');
      expect(topics[i]).to.have.property('user_email');
      expect(topics[i]).to.have.property('node_name');
      expect(topics[i].node_name).to.equal(node_name);
    }
  }
}

describe('Node API', function() {
  it("gets preparation node successfully", function(done) {
    api
      .get('/api/node/preparation')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        testNode(res, 'preparation');
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
        testNode(res, 'process');
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
        testNode(res, 'wait');
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
        testNode(res, 'experience');
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
        testNode(res, 'gossip');
        if (err) return done(err);
        return done();
      });
  });
});