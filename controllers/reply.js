var Topic = require('../models/topic'),
    Reply = require('../models/reply');

exports.get = function(app) {
  function get(req, res) {
    Reply
    .findOne({_id: req.params.id})
    .exec()
    .then(function(reply) {
      if (!reply) {
        var err = new Error("The reply doesn't exist!");
        err.status = 404;
        next(err);
      }

      res.json(reply);
    });
  }

  return get;
};

exports.post = function(app) {
  function post(req, res) {
    var newReply = {
      content: req.body.content,
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      topic_id: req.body.topic_id,
      post_date: new Date()
    };

    var reply = new Reply(newReply);

    reply
    .save(function(err) {
      if (err) {
        console.log('Error in saving replies');
        var err = new Error("Error in saving replies");
        next(err);
      }

      Topic
      .findOne({_id: reply.topic_id})
      .exec()
      .then(function(topic) {
        topic.update();
      });

      return res.json({
        success: true,
        reply: reply
      });
    });

  }

  return post;
};
