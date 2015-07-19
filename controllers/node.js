var Node = require('../models/node'),
  Topic = require('../models/topic');

var TOPICS_PER_PAGE = 10;

exports.get = function(app) {
  function get(req, res, next) {
    Node
      .findOne({
        name: req.params.name
      })
      .exec()
      .then(function(node) {
        if (node === null) {
          var err = new Error("The node doesn't exists");
          err.status = 404;
          next(err);
        }

        var topicPage = req.params.topic_page || 1; // page index
        return Topic.paginate({
          node_name: node.name // query
        }, { // page
          page: topicPage,
          limit: TOPICS_PER_PAGE
        }, function(err, topics, currentPage) {
          if (err) {
            console.log('Error in paginating topics');
            var err = new Error("Error in paginating topics");
            next(err);
          }

          res.json({
            topics: topics,
            topic_page: currentPage,
            node: node
          });
        });
      });
  }

  return get;
};

exports.getHot = function(app) {
  function get(req, res, next) {
    var topicPage = req.params.topic_page || 1; // page index
    return Topic.paginate({}, { // page
      page: topicPage,
      limit: TOPICS_PER_PAGE,
      sortBy: {
        last_update: -1
      }
    }, function(err, topics, currentPage) {
      if (err) {
        console.log('Error in paginating topics');
        var err = new Error("Error in paginating topics");
        next(err);
      }

      res.json({
        topics: topics,
        topic_page: currentPage
      });
    });
  }

  return get;
};