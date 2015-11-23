'use strict';

var express                 = require('express');
var passport               = require('passport');
var passportLocal     = require('passport-local').Strategy;
var cookieParser       = require('cookie-parser');
var expressSession  = require('express-session');
var app                       = express();


module.exports.login = login;

 function login(req, res, next) {

  res.render('login', {
    isAuthenticated: req.isAuthenticated(),
    user: req.user
  });
}
