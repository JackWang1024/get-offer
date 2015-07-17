var marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

module.exports = function() {
  return function(req, res, next) {
    if (req.params.content) {
      marked(req.params.content, function(err, content) {
        if (err) {
          req.params.content = content;
          console.log('error when trying to convert markdown');
          return next(err);
        }
        return next();
      });
    } else {
      return next();
    }
  };

};