var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var driverAPI = require('./routes/driverAPI');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var httpProxy = require('http-proxy');

var app = express();
// globals
var sessionSecret = 'verysecret$571';
var dataBaseUrl = 'mongodb://localhost/test';
app.set('sessionExpirationIntervalMillis', 5000);

setupDBConnection();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// proxying the geocode-suggests
var proxy = httpProxy.createProxyServer({});
proxy.on('error', console.log);
app.get('/fulltext/search', function(req, res){
  proxy.web(req, res, { target: 'http://services.gisgraphy.com' });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    autoRemove: 'disabled'
  }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true
}));
app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/driver', driverAPI);

function setupDBConnection() {
  mongoose.Promise = global.Promise;

  mongoose.connect(dataBaseUrl);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(callback) {
    console.log('connected to mongo: ' + dataBaseUrl);
  });
}

if (app.get('env') === 'development') {
  function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
