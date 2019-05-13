var express = require('express');
var path = require('path');
var router = express.Router();
var logindb = require('../data/login.json');
const crypto = require('crypto')

router.post('/', function (req, res, next) {
    const id = req.body.id;
    const pw = req.body.pw;
    const key = crypto.createHash('sha512').update(pw).digest('base64');
    console.log(id)
    if(key === logindb[id]){
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