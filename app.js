var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Sequelize = require('Sequelize');
var User = require('./model/user')
var Notice = require('./model/notice')
// var multer = require('multer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var noticeRouter = require('./routes/notice');

var app = express();

const sequelize = new Sequelize('lottery', 'root', 'as123123', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function (req, res, next) {
  req.sequelize = sequelize
  req.model = {
    User: sequelize.define('user', User),
    Notice: sequelize.define('notice', Notice),
  }
  
  next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(multer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  secret: 'secret',
  cookie:{ 
      maxAge: 1000*60*30
  }
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notice', noticeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
