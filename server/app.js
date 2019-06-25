var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var loginRouter = require('./routes/login');
// var chatRouter = require('./routes/chat');
var fs = require('fs');
var socket_io = require('socket.io');
var app = express();
var mysql = require('mysql')
var db = require('./data/database.json');
let chatdb
var connection = mysql.createConnection(db);
var moment = require('moment')
connection.connect();

var io = socket_io();
app.io = io;

app.use(require('connect-history-api-fallback')());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/chat',function(req,res,next){
  connection.query("SELECT * FROM chat",function(err,rows){
    if(err) throw err
    chatdb = rows
    // console.log(chatdb)
    res.send(chatdb)
  })
})
app.use('/login', loginRouter)
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


app.io.on('connection',function(socket){
  console.log('connected')
  socket.on('chat',function(data){
    let id = data.id
    let msg = data.msg
    let time = moment().format("YYYY-MM-DD HH:mm:ss")
    connection.query("INSERT INTO chat (id, msg, datetime) values ('" + id +"', '" + msg + "', '" + time + "')",function(err,rows){
      if(err) throw err
      let param = {
        id : id,
        msg : msg,
        datetime : time,
        no : rows.insertId
      }
      console.log(param)
      io.emit('chat',param)
    })
  })
})


module.exports = app;
