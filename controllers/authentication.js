'use strict';

var express         = require('express');
var passport        = require('passport');
var passportLocal   = require('passport-local');

module.exports.login = function(req, res, next) {
  res.render('login', {
    isAuthenticated: req.isAuthenticated(),
    user: req.user
  });

}
