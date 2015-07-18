var Node = require('../models/node'),
    Topic = require('../models/topic');

var TOPICS_PER_PAGE = 10;

exports.get = function(app) {
  function get(req, res) {
    Node
    .findOne({name: req.params.name})
    .exec()
    .then(function(node) {
      if (!node) {
        throw Error("The node doesn't exist!");
      }

      var topicPage = req.params.topic_page || 1;  // page index
      return Topic.paginate({
        node_name: node.name  // query
      }, {  // page
        page: topicPage,
        limit: TOPICS_PER_PAGE
      }, function(err, topics, currentPage) {
        if (err) {
          console.log('Error in paginating topics');
          throw err;
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