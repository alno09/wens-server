var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
// const bodyParser = require('body-parser');
const productRoute = require('./app/product/routes');
const categoryRoute = require('./app/category/routes');
const tagRoute = require('./app/tag/routes');
const authRoute = require('./app/auth/routes');
const jwt = require('jsonwebtoken');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// Product API
app.get('/degass', async (req, res) => {
  let user = ({name: 'joey', favColor: 'blue', id: '123'})

  const signed = jwt.sign({user: 'user'}, 'TOP_SECRET_KEY')

  console.log('token : ', signed);

  res.send('lihat terminal')
})
app.use('/auth', authRoute);
app.use('/api', productRoute);
app.use('/api', categoryRoute);
app.use('/api', tagRoute);

// Home
app.use('/', function(req, res) {
    res.render('index', {
      title: 'Eduwork API Service'
    })
})

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
