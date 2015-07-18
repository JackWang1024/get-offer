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
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.equal(true);
        var topic = res.body.topic;
        expect(topic).to.have.property('title');
        expect(topic).to.have.property('content');
        if (err) return done(err);
        return done();
      });
  });

  it('converts the text from markdown', function(done) {
    var topic = {
      title: '嘿嘿，我也来讲一讲自己的经验',
      content: '### 关于我\n\n * 我是一个小透明~',
      user_name: '小透明',
      user_email: '',
      node_name: 'experience'
    }
    var html = '<h3>关于我</h3><ul><li>我是一个小透明~</li></ul>';
    api
      .post('/api/topic')
      .send(topic)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.equal(true);
        var topic = res.body.topic;
        expect(topic).to.have.property('title');
        expect(topic).to.have.property('content');
        var cleaned = topic.content.replace(/(\r\n|\n|\r)/gm, '');
        expect(cleaned).to.equal(html);
        if (err) return done(err);
        return done();
      });
  });

it('sanitizes the title', function(done) {
    var topic = {
      title: '<a></a><h1>嘿嘿，我也来讲一讲自己的经验</h1>',
      content: '### 关于我\n\n * 我是一个小透明~',
      user_name: '小透明',
      user_email: '',
      node_name: 'experience'
    }
    var sanitized = '嘿嘿，我也来讲一讲自己的经验';
    api
      .post('/api/topic')
      .send(topic)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.equal(true);
        var topic = res.body.topic;
        expect(topic).to.have.property('title');
        expect(topic).to.have.property('content');
        var cleaned = topic.title.replace(/(\r\n|\n|\r)/gm, '');
        expect(cleaned).to.equal(sanitized);
        if (err) return done(err);
        return done();
      });
  });
});