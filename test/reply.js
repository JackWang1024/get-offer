var should = require('chai').should(),
  expect = require('chai').expect,
  async = require('async');

var api = require('./setup');

describe('Reply API', function() {
  var replies = [];
  var topicId = null;

  before(function(done) {
    api
    .get('/api/node/experience')
    .end(function(err, res) {
      if (err) return done(err);
      var topics = res.body.topics;
      for (var i = 0; i < topics.length; ++i) {
        (function(id){
          api
          .get('/api/topic/' + id)
          .end(function(err, res) {
            if (err) return done(err);
            if (res.body.replies.length > 0) {
              replies = res.body.replies;
              topicId = id;  // data race here?
              return done();
            }
          });
        })(topics[i]._id);
      }
    });
  });

  it("gets the replies sucessfully", function(done) {
    async.map(replies, function(reply, done) {
      api
        .get('/api/reply/' + reply._id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('content');
          expect(res.body).to.have.property('user_name');
          expect(res.body).to.have.property('user_email');
          expect(res.body).to.have.property('topic_id');
          expect(res.body.topic_id).to.equal(topicId);

          return done();
        });
    }, function(err) {
      if (err) return done(err);
      return done()
    });
  });

  it("saves a reply sucessfully", function(done) {
    var reply = {
      content: '楼主也是6得不行',
      user_name: '小透明',
      user_email: 'foo@163.com',
      topic_id: topicId
    }
    api
      .post('/api/reply')
      .send(reply)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.equal(true);
        expect(res.body).to.have.property('reply');
        var reply = res.body.reply;
        expect(reply).to.have.property('content');
          expect(reply).to.have.property('user_name');
          expect(reply).to.have.property('user_email');
          expect(reply).to.have.property('topic_id');
          expect(reply.topic_id).to.equal(topicId);
        if (err) return done(err);
        return done();
      });
  });
});