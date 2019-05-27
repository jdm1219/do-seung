var express = require('express');
var fs = require('fs');
var router = express.Router();
var mysql = require('mysql')
var db = require('../data/database.json');
let chatdb
var connection = mysql.createConnection(db);
var moment = require('moment')
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
  let time = moment().format("YYYY-MM-DD HH:mm:ss")
  connection.query("INSERT INTO chat (id, msg, datetime) values ('" + id +"', '" + msg + "', '" + time + "')",function(err,rows){
    if(err) throw err
    // console.log('data inserted',rows.insertId,rows)
    let param = {
      time : time,
      no : rows.insertId
    }
    res.status(200).send(param)
  })
})

module.exports = router;