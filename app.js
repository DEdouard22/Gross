var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var setupAuth = require('./auth');

//auth Kamilah
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var transactionsRouter = require('./routes/transactions');
var calendarRouter = require('./routes/calendar');

var app = express();

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", true);

  next();

})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//auth
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token', 'authorization']
};
app.use(cors(corsOption));

// Make sure all request return CORS headers
app.use(function (req, res, next) {
    var origin = req.get('origin');
    if (!origin || origin === 'undefined' || origin.length == 0) {
        origin = req.get('host');
    }
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization, token');

    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

setupAuth(app);
app.use(express.static(path.join(__dirname, 'client/build')));


console.log("before")
app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/expenses', transactionsRouter);
app.use('/api/calendar', calendarRouter);
console.log("after")

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/App.js'));
});

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
