var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var loginRouter = require('./routes/login');
var fs = require('fs');
var chatdb = require('./data/chat.json');
var socket_id = require('socket.io');
var mysql = require('mysql')
var db = require('./data/database.json')
var connection = mysql.createConnection({
  host : db.host,
  user : db.user,
  password : db.password,
  port : db.port,
  database : db.database
});
var app = express();
connection.connect();

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

var testdb
connection.query(
  "SELECT * FROM CHAT",
  (err, rows, fields) => {
    testdb = rows
  }
)
console.log(testdb)
app.get('/chat',(req,res) => {
  res.send(testdb)
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
    let param = {
      no: chatdb.Items.length+1,
      id: data.id,
      msg: data.msg
    }
    console.log(testdb)
    socket.emit('chat',param)
  })
})


module.exports = app;
