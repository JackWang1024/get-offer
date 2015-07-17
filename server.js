var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var mark = require('./middlewares/mark');
var sanitize = require('./middlewares/sanitize')
var session = require('express-session');

var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);

var app = express();

var staticPath = {
  primary: path.join(__dirname, 'app'),
  secondary: path.join(__dirname, '.tmp'),
  production: path.join(__dirname , 'dist')
};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var MongoStore = require("connect-mongostore")(session);

var store = new MongoStore({
  db: "session"
});

// Cookies
app.use(cookieParser('get-offer'));
app.use(cookieSession({secret : 'get-offer'}));
app.use(session({
  secret : 'get-offer',
  store: store,
  cookie: { maxAge: 900 * 1000 },
  resave: true,
  saveUninitialized: false
}));

if (app.get('env') === 'development') {

  app.get('/', function(req, res){
      res.sendfile(path.join(staticPath.primary, 'index.html'));
  });
  app.use(favicon(path.join(staticPath.primary, 'favicon.ico')));
  app.use(serveStatic(staticPath.primary));
  app.use(serveStatic(staticPath.secondary));

} else {

  app.get('/', function(req, res){
      res.sendfile(path.join(staticPath.production, 'index.html'));
  });
  app.use(favicon(path.join(staticPath.production, 'favicon.ico')));
  app.use(serveStatic(staticPath.production));
}

app.use(mark());
app.use(sanitize());



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
    res.json({
      message: err.message,
      error: err
    });
  });
}

module.exports = app;