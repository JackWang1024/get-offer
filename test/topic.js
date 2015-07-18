var should = require('chai').should(),
  expect = require('chai').expect,
  async = require('async');

var api = require('./setup');

describe('Topic API', function() {
  var topics = [];
  before(function(done) {
    api
    .get('/api/node/experience')
    .end(function(err, res) {
      if (err) return done(err);
      topics = res.body.topics;
      done();
    });
  });

  it("gets the topics sucessfully", function(done) {
    async.map(topics, function(topic, done) {
      api
        .get('/api/topic/' + topic._id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('replies');
          var replies = res.body.replies;
          expect(replies).to.be.a('array');

          if (replies.length > 0) {
            expect(res.body.replies[0]).to.have.property('_id');
            expect(res.body.replies[0]).to.have.property('content');
            expect(res.body.replies[0]).to.have.property('user_name');
            expect(res.body.replies[0]).to.have.property('user_email');
          }
          return done();
        });
    }, function(err) {
      if (err) return done(err);
      return done()
    });
  });

  it("saves a topic sucessfully", function(done) {
    var topic = {
      title: '嘿嘿，我也来讲一讲自己的经验',
      content: '哦',
      user_name: '小透明',
      user_email: '',
      node_name: 'experience'
    }
    api
      .post('/api/topic')
      .send(topic)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('content');
        if (err) return done(err);
        return done();
      });
  });
});