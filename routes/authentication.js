'use strict';

var express   = require('express');
var router    = express.Router();
var authCtrl  = require('../controllers/authentication');

router.post('/login', authCtrl.login);
// router.get('/login', authCtrl.)

module.exports = router;
