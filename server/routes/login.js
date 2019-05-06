var express = require('express');
var path = require('path');
var router = express.Router();
var logindb = require('../data/login.json');
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b:512});



router.post('/', function (req, res, next) {
    let id = req.body.id;
    let pw = req.body.pw;
    console.log(id)
    if(pw === logindb[id]){
        res.send({
            access : 'success',
            id : id
        })
    }else{
        res.send({
            access: 'failed'
        })
    }
});

module.exports = router;