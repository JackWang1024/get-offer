var sanitizeHtml = require('sanitize-html');

module.exports = function() {
  return function(req, res, next) {
    if (req.params.title) {
      req.params.title = sanitizeHtml(req.params.title, {
        allowedTags: [],
        allowedAttributes: {}
      });
      return next();
    } else {
      return next();
    }
  };
};