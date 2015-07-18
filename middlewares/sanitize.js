var sanitizeHtml = require('sanitize-html');

module.exports = function() {
  return function(req, res, next) {
    if (req.body.title) {
      req.body.title = sanitizeHtml(req.body.title, {
        allowedTags: [],
        allowedAttributes: {}
      });
      return next();
    } else {
      return next();
    }
  };
};