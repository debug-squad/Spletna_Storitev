var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// vključimo mongoose in ga povežemo z MongoDB
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Passport init
require('./auth');

var indexRouter = require('./routes/index');
var eventRouter = require('./routes/eventRoutes');
var infrastructureRouter = require('./routes/infrastructureRoutes');
var clientRouter = require('./routes/clientRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/event', eventRouter);
app.use('/infrastructure', infrastructureRouter);
app.use('/client', clientRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: true,
    message: err.message,
    description: req.app.get('env') === 'development' ? err : {},
  })
});
 
module.exports = app;
