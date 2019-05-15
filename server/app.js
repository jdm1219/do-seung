var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var chatRouter = require('./routes/chat');
var loginRouter = require('./routes/login');
var fs = require('fs');
var chatdb = require('./data/chat.json');
var socket_id = require('socket.io');

var app = express();

var io = socket_id();
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

app.use('/chat',chatRouter)
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
    let param = {
      no: chatdb.Items.length+1,
      id: data.id,
      msg: data.msg
    }
    chatdb.Items.push(param)
    fs.writeFile(__dirname + '/../da  ta/chat.json',JSON.stringify(chatdb),'utf-8',function(data){
      chatdb = require('../data/chat.json')
    })
    console.log(param,'submited')
    socket.broadcast.emit('chat',param)
  })
})


module.exports = app;
