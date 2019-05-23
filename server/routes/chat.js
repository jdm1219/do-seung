var express = require('express');
var fs = require('fs');
var router = express.Router();
var mysql = require('mysql')
var db = require('../data/database.json');
let chatdb
var connection = mysql.createConnection(db);
connection.connect();


router.get('/', function (req, res, next) {
  connection.query("SELECT * FROM chat",function(err,rows){
    if(err) throw err
    chatdb = rows
    res.send(chatdb)
  })
});
router.post('/', function(req,res,next){
  let id = req.body.id
  let msg = req.body.msg
  connection.query("INSERT INTO chat (msg, id) values ('" + id +"', '" + msg + "')",function(err,rows){
    if(err) throw err
    console.log('data inserted',rows)
  })
})

module.exports = router;