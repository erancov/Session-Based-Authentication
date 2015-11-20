'use strict';

var express   = require('express');
var passport        = require('passport');
var passportLocal   = require('passport-local');
var router    = express.Router();
var authCtrl  = require('../controllers/authentication');

router.get('/login', authCtrl.login);
router.post('/login', passport.authenticate('local'), function(req, res){
  res.redirect('/');
});

module.exports = router;
