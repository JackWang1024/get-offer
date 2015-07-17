var express = require('express'),
    router = express.Router(),
    node = require('../controllers/node'),
    topic = require('../controllers/topic'),
    user = require('../controllers/user');

module.exports = function(app) {
  router.get('/user/me', user.get(app));

  router.get('/node/:id', node.get(app));
  router.post('/node', node.post(app));

  router.get('/topic/:id', topic.get(app));
  router.post('/topic', topic.post(app));

  return router;
}