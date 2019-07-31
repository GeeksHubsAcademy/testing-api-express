var express = require('express');
// var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');

require('dotenv').config();


var app = express();

require('./config/mongoose.js');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// app.use('/public',  express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', usersRouter);
app.use('/movies', moviesRouter);
app.use('/fizzbuzz',require('./routes/fizzbuzz.js'));

app.use((req,res) => {
    res.status(404).send('not found');
});


module.exports = app;
