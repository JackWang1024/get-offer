var express = require('express'),
    router = express.Router(),
    node = require('../controllers/node'),
    topic = require('../controllers/topic'),
    reply = require('../controllers/reply'),
    user = require('../controllers/user');

module.exports = function(app) {
  router.get('/user/me', user.get(app));

  router.get('/node/:name', node.get(app));

  router.get('/topic/:id', topic.get(app));
  router.post('/topic', topic.post(app));

  router.get('/reply/:id', reply.get(app));
  router.post('/reply', reply.post(app));

  return router;
}