var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var exphbs  = require('express-handlebars');
var mark = require('./middlewares/mark');
var santize = require('./middlewares/santize')

var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);

var app = express();

var staticPath = {
  primary: __dirname + 'app',
  secondary: __dirname + '.tmp',
  production: __dirname + 'dist'
};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

if (app.get('env') === 'development') {
  app.use(favicon(path.join(staticPath.primary, 'favicon.ico')));
  app.use(serveStatic(path.join(__dirname, staticPath.primary)));
  app.use(serveStatic(path.join(__dirname, staticPath.secondary)));
} else {
  app.use(favicon(path.join(staticPath.production, 'favicon.ico')));
  app.use(serveStatic(path.join(__dirname, staticPath.production)));
}

app.use(mark());
app.use(santize());

var apis = require('./routes/api')(app);
app.use('/api', apis);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      title: err.status,
      message: err.message,
      error: err
    });
  });
}

module.exports = app;