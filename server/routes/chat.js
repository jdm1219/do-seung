var express = require('express');
var path = require('path');
var router = express.Router();
var chatdb = require('../data/chat.json');

router.get('/', function (req, res, next) {
  
  res.send(chatdb)
});

module.exports = router;