var express = require('express');
var fs = require('fs')
var path = require('path');
var router = express.Router();
var chatdb = require('../data/chat.json');

router.get('/', function (req, res, next) {
  res.send(chatdb)
});
router.post('/', function(req,res,next){
  let param = {
    no: chatdb.Items.length+1,
    id: req.body.id,
    chat: req.body.msg
  }
  chatdb.Items.push(param)
  fs.writeFileSync(__dirname + '/../data/chat.json',JSON.stringify(chatdb),'utf-8',function(err){
    chatdb = require('../data/chat.json')
    console.log(chatdb)
    res.send(chatdb)
  })
})

module.exports = router;