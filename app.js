var createError = require('http-errors');
var express = require('express');
var session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const config = require('./config.json')
const hbs = require('hbs');
require('dotenv').config()

var app = express();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})

.then(connected => {
  if(connected) {
    console.log("mongodb CityKittyCat is connected")
  }
})
.catch(err => {
  console.log("error conncecting", err)
})

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true
}))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require("./routes/auth-routes");
var profileRouter = require("./routes/profile");
var catsRouter = require("./routes/cats")
var detailedRouter = require("./routes/detailed-cat")


app.use(bodyParser.urlencoded({ useNewUrlParser: true }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("some-secret", {signed: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/" , authRouter)
app.use('/', indexRouter);
app.use("/profile", profileRouter);
app.use("/", catsRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);
app.use('/', detailedRouter);

// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/upload', require("./routes/upload"));
// app.use('/gallery', require("./routes/gallery"));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
