var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var session = require('express-session');
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var cerealesRouter = require('./routes/cereales'); //cereales.js
var barritasRouter = require('./routes/barritas'); 
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/consejos');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'kjskjsbfkasbfkbawkjfsdbns',
  resave: false,
  saveUninitialized: true
}));

secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    } else {
      req.redirect('/admin/login');
    }

  }catch (error){
    console.log(error);
  }
}

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp'
}));

app.use('/', indexRouter);
app.use('/cereales', cerealesRouter);
app.use('/barritas', barritasRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/consejos', secured, adminRouter);


//RENDER DE PRODUCTOS
app.get('/cereales', function (req, res) {
  res.render ('cereales')

})

app.get('/aceites', function (req, res) {
  res.render ('aceites')

})

app.get('/bebidas-veg', function (req, res) {
  res.render ('bebidas-veg')

})

app.get('/especias', function (req, res) {
  res.render ('especias')

})

app.get('/frutos-secos', function (req, res) {
  res.render ('frutos-secos')

})

app.get('/harinas', function (req, res) {
  res.render ('harinas')

})

app.get('/legumbres', function (req, res) {
  res.render ('legumbres')

})

app.get('/organicos', function (req, res) {
  res.render ('organicos')

})

app.get('/semillas', function (req, res) {
  res.render ('semillas')

})
//RENDER DE RECETAS
app.get('/barritas', function (req, res) {
  res.render ('barritas')

})

app.get('/fajitas', function (req, res) {
  res.render ('fajitas')

})

app.get('/hummus', function (req, res) {
  res.render ('hummus')

})

app.get('/tepache', function (req, res) {
  res.render ('tepache')

})

app.get('/bebidas', function (req, res) {
  res.render ('bebidas')

})

app.get('/pan', function (req, res) {
  res.render ('pan')

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
