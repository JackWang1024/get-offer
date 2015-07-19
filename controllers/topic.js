var Topic = require('../models/topic'),
    Reply = require('../models/reply');

var REPLIES_PER_PAGE = 50;

exports.get = function(app) {
  function get(req, res) {
    Topic
    .findOne({_id: req.params.id})
    .exec()
    .then(function(topic) {
      if (!topic) {
        throw Error("The topic doesn't exist!");
      }

      var replyPage = req.params.reply_page || 1;  // page index
      return Reply.paginate({
        topic_id: topic._id  // query
      }, {  // page
        page: replyPage,
        limit: REPLIES_PER_PAGE,
        sortBy: {
          post_date: 1
        }
      }, function(err, replies, currentPage) {
        if (err) {
          console.log('Error in paginating replies');
          throw err;
        }

        res.json({
          replies: replies,
          reply_page: currentPage,
          topic: topic
        });
      });
    });
  }

  return get;
};

exports.post = function(app) {
  function post(req, res) {
    
    var newTopic = {
      title: req.body.title,
      content: req.body.content,
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      node_name: req.body.node_name,
      post_date: new Date(),
      last_update: new Date(),
      reply_count: 0
    };

    var topic = new Topic(newTopic);

    topic
    .save(function(err, topic) {
      if (err) {
        console.log('Error in Saving topic: ' + err);
        throw err;
      }
      res.json({
        success: true,
        topic: topic
      });
    });
  }

  return post;
};
