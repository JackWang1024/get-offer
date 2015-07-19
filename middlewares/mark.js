var showdown  = require('showdown'),
    converter = new showdown.Converter(),
    sanitizeHtml = require('sanitize-html');

module.exports = function() {
  return function(req, res, next) {
    if (req.body.content) {
      var html = converter.makeHtml(req.body.content)
      req.body.content = sanitizeHtml(html);
      return next();
    } else {
      return next();
    }
  };

};