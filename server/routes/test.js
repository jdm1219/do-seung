var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../data/database.json');

router.get('/', function (req, res, next) {
  res.send(db)
});

module.exports = router;